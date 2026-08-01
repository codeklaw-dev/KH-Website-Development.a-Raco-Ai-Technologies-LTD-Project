"""Normalize supplied raster partner marks into transparent SVG containers."""

from __future__ import annotations

import base64
import io
from pathlib import Path

from PIL import Image


SOURCE = Path("/Users/sazinsmac/Downloads/raco clients/kh and stuff/KH-Partner logos")
OUTPUT = Path(__file__).resolve().parents[1] / "public" / "assets" / "partners"


def raster_to_svg(source: str, destination: str, remove_white: bool = False) -> None:
    image = Image.open(SOURCE / source).convert("RGBA")

    if remove_white:
        pixels = []
        for red, green, blue, alpha in image.getdata():
            distance = max(255 - red, 255 - green, 255 - blue)
            softened_alpha = max(0, min(255, (distance - 4) * 5))
            pixels.append((red, green, blue, min(alpha, softened_alpha)))
        image.putdata(pixels)

    alpha_box = image.getchannel("A").getbbox()
    if alpha_box:
        image = image.crop(alpha_box)

    buffer = io.BytesIO()
    image.save(buffer, "PNG", optimize=True)
    encoded = base64.b64encode(buffer.getvalue()).decode("ascii")
    width, height = image.size
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" '
        f'viewBox="0 0 {width} {height}" role="img">'
        f'<image width="{width}" height="{height}" href="data:image/png;base64,{encoded}"/>'
        "</svg>"
    )
    (OUTPUT / destination).write_text(svg, encoding="utf-8")


OUTPUT.mkdir(parents=True, exist_ok=True)
raster_to_svg("PEFC_Logo.svg.webp", "partner-pefc.svg")
raster_to_svg("rs=w_600,h_600.webp", "partner-kastamonu.svg")
raster_to_svg("images (1).png", "partner-sawmill25.svg", remove_white=True)
raster_to_svg("SPFLogo.gif", "partner-spf.svg")
