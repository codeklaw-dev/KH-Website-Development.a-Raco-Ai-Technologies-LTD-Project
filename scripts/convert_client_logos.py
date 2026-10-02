"""Normalize supplied client marks into trimmed, transparent PNGs for the logo rail."""

from __future__ import annotations

import subprocess
import tempfile
from pathlib import Path

from PIL import Image, ImageDraw, ImageStat

SOURCE = Path(__file__).resolve().parent / "source-logos"
OUTPUT = Path(__file__).resolve().parents[1] / "public" / "assets" / "partners"
MAX_HEIGHT = 300


def render_pdf(source: Path) -> Image.Image:
    with tempfile.TemporaryDirectory() as tmp:
        stem = Path(tmp) / "page"
        subprocess.run(
            ["pdftocairo", "-png", "-r", "300", "-singlefile", "-transp", str(source), str(stem)],
            check=True,
        )
        return Image.open(stem.with_suffix(".png")).convert("RGBA")


def key_background(image: Image.Image, tolerance: int = 18) -> Image.Image:
    """Flood-fill the edge-connected background to transparent, keeping interior whites."""
    width, height = image.size
    seeds = [
        (0, 0), (width - 1, 0), (0, height - 1), (width - 1, height - 1),
        (width // 2, 0), (width // 2, height - 1), (0, height // 2), (width - 1, height // 2),
    ]
    for seed in seeds:
        if image.getpixel(seed)[3] == 0:
            continue
        ImageDraw.floodfill(image, seed, (255, 255, 255, 0), thresh=tolerance)
    return image


def soften_halo(image: Image.Image) -> Image.Image:
    """Ramp alpha down on residual near-white fringe left by JPEG-blurred edges."""
    pixels = []
    for red, green, blue, alpha in image.getdata():
        distance = max(255 - red, 255 - green, 255 - blue)
        softened_alpha = max(0, min(255, (distance - 4) * 5))
        pixels.append((red, green, blue, min(alpha, softened_alpha)))
    image.putdata(pixels)
    return image


def trim(image: Image.Image, alpha_floor: int = 0) -> Image.Image:
    mask = image.getchannel("A")
    if alpha_floor:
        mask = mask.point(lambda value: 255 if value > alpha_floor else 0)
    box = mask.getbbox()
    return image.crop(box) if box else image


def downscale(image: Image.Image) -> Image.Image:
    width, height = image.size
    if height <= MAX_HEIGHT:
        return image
    return image.resize((round(width * MAX_HEIGHT / height), MAX_HEIGHT), Image.LANCZOS)


def rounded_corners(image: Image.Image, radius: int) -> Image.Image:
    mask = Image.new("L", image.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle([(0, 0), (image.size[0] - 1, image.size[1] - 1)], radius, fill=255)
    image.putalpha(mask)
    return image


def dark_bbox(image: Image.Image, threshold: int = 100) -> tuple[int, int, int, int]:
    luma = image.convert("L").point(lambda value: 255 if value < threshold else 0)
    return luma.getbbox()


def save(image: Image.Image, destination: str) -> None:
    image.save(OUTPUT / destination, "PNG", optimize=True)
    print(f"{destination}: {image.size[0]}x{image.size[1]}")


def convert_pdf(source: str, destination: str, halo: bool) -> None:
    image = key_background(render_pdf(SOURCE / source))
    if halo:
        image = soften_halo(image)
    save(downscale(trim(image)), destination)


def convert_png(source: str, destination: str, alpha_floor: int = 0) -> None:
    image = Image.open(SOURCE / source).convert("RGBA")
    save(downscale(trim(image, alpha_floor)), destination)


def flatten_two_tone(tile: Image.Image, split: int = 150, ramp: int = 60) -> Image.Image:
    """Re-lay a photographed sign as its two sampled brand colours.

    The doka source is a photograph: uneven lighting and JPEG noise across a
    large flat area, which compresses badly and reads soft next to the other
    marks. Sampling the background and ink, then re-compositing through a
    coverage ramp, keeps the brand intact, sharpens the glyphs, and cuts the
    file to a fraction of the size.
    """
    luma = tile.convert("L")
    ground = tuple(round(c) for c in ImageStat.Stat(tile.convert("RGB"), luma.point(lambda v: 255 if v > split else 0)).mean)
    ink = tuple(round(c) for c in ImageStat.Stat(tile.convert("RGB"), luma.point(lambda v: 255 if v < split - ramp else 0)).mean)
    coverage = luma.point(lambda v: max(0, min(255, round((split - v) * 255 / ramp))))
    flat = Image.composite(Image.new("RGB", tile.size, ink), Image.new("RGB", tile.size, ground), coverage)
    flat = flat.convert("RGBA")
    flat.putalpha(tile.getchannel("A") if tile.mode == "RGBA" else 255)
    return flat


def convert_doka(source: str, destination: str) -> None:
    image = Image.open(SOURCE / source).convert("RGBA")
    left, top, right, bottom = dark_bbox(image)
    pad = round((bottom - top) * 0.12)
    box = (
        max(0, left - pad), max(0, top - pad),
        min(image.size[0], right + pad), min(image.size[1], bottom + pad),
    )
    tile = downscale(flatten_two_tone(image.crop(box)))
    save(rounded_corners(tile, round(tile.size[1] * 0.06)), destination)


OUTPUT.mkdir(parents=True, exist_ok=True)
convert_pdf("client1.pdf", "client-lkh.png", halo=True)
convert_pdf("client2.pdf", "client-arrow.png", halo=True)
convert_pdf("client3.pdf", "client-abu-al-taj.png", halo=True)
convert_pdf("client4.pdf", "client-kh-parma.png", halo=False)
convert_png("client5.png", "client-5tb.png", alpha_floor=25)
convert_png("client6.png", "client-tb.png")
convert_doka("client7.jpeg", "client-doka.png")
