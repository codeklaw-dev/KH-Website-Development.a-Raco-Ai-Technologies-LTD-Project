/**
 * Scroll-driven build of the KH Wood yard for the home hero.
 *
 * Six keyframes (survey lines -> foundations -> steel -> enclosure -> fit-out ->
 * aerial photo) are blended in one WebGL pass. Each pixel reads a painted build
 * order map, so the back sheds rise first and the city turns to photo last.
 * The camera never moves: the photo always covers the stage.
 *
 * Traffic is drawn on a 2D canvas as small 3D models seen through a pinhole
 * camera fitted to the photo (a parked lorry in the yard sets the scale). While
 * the site is still a drawing they are outlines; each turns solid as the photo
 * wipe reaches it.
 */

type Vec3 = [number, number, number];
type Pt = [number, number];

export type HeroBuildElements = {
  track: HTMLElement;
  stage: HTMLElement;
  gl: HTMLCanvasElement;
  sky: HTMLCanvasElement;
  traffic: HTMLCanvasElement;
};

const IW = 1672;
const IH = 941;
const STAGES = 5;
const SPREAD = 0.45;
const ASSET = (name: string) => `/assets/hero-build-${name}`;
const FRAMES = ["00.jpg", "01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"].map(ASSET);
const ORDER_MAP = ASSET("order.png");

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

// ---------- vector helpers ----------
const add = (a: Vec3, b: Vec3): Vec3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const sub = (a: Vec3, b: Vec3): Vec3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const mul = (a: Vec3, s: number): Vec3 => [a[0] * s, a[1] * s, a[2] * s];
const dot = (a: Vec3, b: Vec3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a: Vec3, b: Vec3): Vec3 => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const norm = (a: Vec3): Vec3 => {
  const l = Math.hypot(a[0], a[1], a[2]) || 1;
  return [a[0] / l, a[1] / l, a[2] / l];
};
const length = (a: Vec3) => Math.hypot(a[0], a[1], a[2]);

// ---------- camera matched to the photo (pinhole, pitched down, no roll) ----------
const F = 2200;
const CX = 836;
const CY = 470;
const HORIZON = -400;
const CAM_H = 96;
const PITCH = Math.atan((CY - HORIZON) / F);
const UP: Vec3 = [0, -Math.cos(PITCH), -Math.sin(PITCH)];

const toGround = (px: number, py: number): Vec3 => {
  const r: Vec3 = [(px - CX) / F, (py - CY) / F, 1];
  return mul(r, -CAM_H / dot(UP, r));
};
const project = (X: Vec3): Pt => [CX + (F * X[0]) / X[2], CY + (F * X[1]) / X[2]];
const flat = (d: Vec3) => norm(sub(d, mul(UP, dot(UP, d))));
const heightOf = (X: Vec3) => dot(X, UP) + CAM_H;

const E1 = flat(sub(toGround(1000, 885), toGround(0, 458))); // along the main road
const E2 = cross(UP, E1);
const SUN = norm(add(add(mul(E1, -0.3), mul(E2, 0.42)), mul(UP, 0.85)));

// ---------- vehicle models ----------
// A part is a frustum: bottom rectangle (x0..x1, ±w at z0) and top rectangle
// (tx0..tx1, ±tw at z1), in metres. x points forward, y left, z up.
type Part = {
  x0: number; x1: number; w: number; z0: number; z1: number;
  tx0: number; tx1: number; tw: number;
  c: string; side?: string; front?: string; back?: string;
  lines?: number; noShadow?: boolean;
};
type PartOpts = Partial<Pick<Part, "tx0" | "tx1" | "tw" | "side" | "front" | "back" | "lines" | "noShadow">>;

const part = (x0: number, x1: number, w: number, z0: number, z1: number, c: string, o: PartOpts = {}): Part => ({
  x0, x1, w, z0, z1, c,
  tx0: o.tx0 ?? x0, tx1: o.tx1 ?? x1, tw: o.tw ?? w,
  side: o.side, front: o.front, back: o.back, lines: o.lines, noShadow: o.noShadow,
});

const GLASS = "#1b242b";
const TYRE = "#121212";
const DARK = "#2a2b2d";
const KH_RED = "#942020";
const HEADLIGHT = "#f1eedb";
const TAILLIGHT = "#8f1d1d";

const wheels = (xs: number[], w: number, r: number) => xs.map((x) => part(x - r, x + r, w, 0, r * 1.9, TYRE, { noShadow: true }));

type CarKind = "sedan" | "suv" | "van";

function car(body: string, kind: CarKind): Part[] {
  if (kind === "van") {
    return [
      ...wheels([1.45, -1.5], 0.93, 0.34),
      part(-2.45, 2.45, 0.95, 0.3, 1.05, body),
      part(-2.45, 1.7, 0.95, 1.05, 2.0, body, { tx0: -2.45, tx1: 1.15, tw: 0.9, front: GLASS }),
      part(2.44, 2.47, 0.8, 0.6, 0.78, HEADLIGHT, { noShadow: true }),
      part(-2.47, -2.44, 0.8, 0.7, 0.9, TAILLIGHT, { noShadow: true }),
    ];
  }
  const suv = kind === "suv";
  const zb = suv ? 0.34 : 0.28;
  const zm = suv ? 1.0 : 0.82;
  const zt = suv ? 1.78 : 1.44;
  return [
    ...wheels([1.35, -1.35], 0.93, suv ? 0.37 : 0.32),
    part(-2.25, 2.25, 0.9, zb, zm, body, { tx0: -2.2, tx1: 2.18, tw: 0.88 }),
    part(suv ? -2.05 : -1.5, 1.05, 0.85, zm, zt, body, {
      tx0: suv ? -2.0 : -1.08, tx1: suv ? 0.5 : 0.38, tw: 0.7, side: GLASS, front: GLASS, back: GLASS,
    }),
    part(2.24, 2.27, 0.78, 0.55, 0.7, HEADLIGHT, { noShadow: true }),
    part(-2.27, -2.24, 0.8, 0.6, 0.75, TAILLIGHT, { noShadow: true }),
  ];
}

function lorry(kind: "box" | "flatbed"): Part[] {
  const cab = [
    ...wheels([3.3, -2.35, -3.5], 1.22, 0.5),
    part(-4.6, 4.3, 1.0, 0.55, 1.0, DARK),
    part(2.7, 4.8, 1.18, 1.0, 3.0, "#ecebe6", { tx0: 2.7, tx1: 4.55, tw: 1.1 }),
    part(4.62, 4.7, 1.02, 1.95, 2.8, GLASS, { tx0: 4.5, tx1: 4.58, noShadow: true }),
    part(4.78, 4.95, 1.16, 0.5, 0.95, DARK),
    part(4.94, 4.97, 0.98, 0.98, 1.12, HEADLIGHT, { noShadow: true }),
  ];
  if (kind === "box") {
    return [
      ...cab,
      part(-4.75, 2.6, 1.26, 1.05, 3.6, "#f4f4f1", { lines: 6 }),
      part(-4.76, 2.61, 1.27, 1.2, 1.5, KH_RED, { noShadow: true }),
    ];
  }
  const endGrain = { front: "#e2b67c", back: "#e2b67c" };
  return [
    ...cab,
    part(-4.75, 2.6, 1.25, 1.0, 1.22, "#3a3a3c"),
    part(2.4, 2.6, 1.2, 1.22, 2.7, "#3a3a3c"),
    part(-4.65, -2.3, 1.15, 1.22, 2.32, "#c8965a", { lines: 5, ...endGrain }),
    part(-2.2, 0.05, 1.15, 1.22, 2.32, "#bd8b52", { lines: 5, ...endGrain }),
    part(0.15, 2.35, 1.15, 1.22, 2.18, "#cc9b60", { lines: 4, ...endGrain }),
    part(-3.5, -3.38, 1.17, 1.22, 2.34, "#3b2a18", { noShadow: true }),
    part(-1.1, -0.98, 1.17, 1.22, 2.34, "#3b2a18", { noShadow: true }),
    part(1.2, 1.32, 1.17, 1.22, 2.2, "#3b2a18", { noShadow: true }),
  ];
}

const FORKLIFT: Part[] = [
  ...wheels([0.7, -0.75], 0.62, 0.3),
  part(-1.25, 0.9, 0.6, 0.18, 1.05, "#e0a91b"),
  part(-1.25, -0.7, 0.58, 1.05, 1.35, DARK),
  part(-0.75, 0.55, 0.56, 2.0, 2.08, DARK),
  part(-0.72, -0.64, 0.55, 1.05, 2.0, DARK, { noShadow: true }),
  part(0.47, 0.55, 0.55, 1.05, 2.0, DARK, { noShadow: true }),
  part(0.92, 1.05, 0.45, 0.1, 2.3, DARK),
  part(1.05, 2.1, 0.38, 0.1, 0.17, "#3a3a3a"),
  part(1.1, 2.0, 0.42, 0.17, 0.9, "#c8965a", { lines: 3 }),
];

const shadeHex = (hex: string, k: number) => {
  const n = parseInt(hex.slice(1), 16);
  const f = (v: number) => Math.min(255, Math.round(v * k));
  return `rgb(${f((n >> 16) & 255)},${f((n >> 8) & 255)},${f(n & 255)})`;
};

function hull(input: Pt[]): Pt[] {
  const pts = input.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const turn = (o: Pt, a: Pt, b: Pt) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lo: Pt[] = [];
  const hi: Pt[] = [];
  for (const p of pts) {
    while (lo.length > 1 && turn(lo[lo.length - 2], lo[lo.length - 1], p) <= 0) lo.pop();
    lo.push(p);
  }
  for (let i = pts.length - 1; i >= 0; i--) {
    const p = pts[i];
    while (hi.length > 1 && turn(hi[hi.length - 2], hi[hi.length - 1], p) <= 0) hi.pop();
    hi.push(p);
  }
  return lo.slice(0, -1).concat(hi.slice(0, -1));
}

// ---------- routes: authored in photo pixels, driven on the ground in metres ----------
type RoutePoint = { X: Vec3; v: number; i: number; d: number };
type Route = { seg: RoutePoint[]; len: number; stop: number | null; hide: [number, number] | null };

function route(pts: [number, number, number][], opt: { straight?: boolean; stop?: number; hide?: [number, number] } = {}): Route {
  const G = pts.map(([x, y, v]) => ({ X: toGround(x, y), v }));
  const catmull = (a: Vec3, b: Vec3, c: Vec3, d: Vec3, t: number): Vec3 =>
    mul(
      add(
        add(mul(b, 2), mul(sub(c, a), t)),
        add(mul(add(sub(mul(a, 2), mul(b, 5)), sub(mul(c, 4), d)), t * t), mul(add(sub(mul(b, 3), a), sub(d, mul(c, 3))), t * t * t)),
      ),
      0.5,
    );
  const steps = opt.straight ? 1 : 16;
  const seg: RoutePoint[] = [];
  for (let i = 0; i < G.length - 1; i++) {
    const a = G[Math.max(0, i - 1)].X, b = G[i].X, c = G[i + 1].X, d = G[Math.min(G.length - 1, i + 2)].X;
    for (let j = 0; j < steps; j++) {
      const t = j / steps;
      seg.push({ X: opt.straight ? add(b, mul(sub(c, b), t)) : catmull(a, b, c, d, t), v: G[i].v + (G[i + 1].v - G[i].v) * t, i, d: 0 });
    }
  }
  const last = G[G.length - 1];
  seg.push({ X: last.X, v: last.v, i: G.length - 1, d: 0 });
  for (let k = 1; k < seg.length; k++) seg[k].d = seg[k - 1].d + length(sub(seg[k].X, seg[k - 1].X));
  const dAt = (idx: number) => (seg.find((s) => s.i === idx) ?? seg[0]).d;
  return {
    seg,
    len: seg[seg.length - 1].d,
    stop: opt.stop == null ? null : dAt(opt.stop),
    hide: opt.hide ? [dAt(opt.hide[0]), dAt(opt.hide[1])] : null,
  };
}

function sample(R: Route, dist: number) {
  const s = R.seg;
  const d = clamp(dist, 0, R.len);
  let lo = 0, hi = s.length - 1;
  while (hi - lo > 1) {
    const m = (lo + hi) >> 1;
    if (s[m].d < d) lo = m; else hi = m;
  }
  const a = s[lo], b = s[hi];
  const t = clamp((d - a.d) / Math.max(1e-6, b.d - a.d));
  return { X: add(a.X, mul(sub(b.X, a.X), t)), v: a.v + (b.v - a.v) * t };
}
const headingAt = (R: Route, d: number) => flat(sub(sample(R, d + 1.2).X, sample(R, d - 1.2).X));

// Main-road lanes run straight between the two measured road edges.
const mainLane = (f: number) => (x: number): [number, number] => [x, 458 + 78 * f + (0.427 + 0.039 * f) * x];
const westLane = mainLane(0.3);
const eastLane = mainLane(0.7);

function buildRoutes() {
  const lanes = {
    west: route([[...westLane(1150), 12], [...westLane(-170), 12]], { straight: true }),
    east: route([[...eastLane(-170), 12], [...eastLane(1050), 12]], { straight: true }),
    south: route([[1700, 493, 9], [1261, 990, 9]], { straight: true }),
    north: route([[1341, 990, 8], [1455, 845, 8], [1545, 718, 7], [1600, 630, 6], [1640, 560, 6], [1700, 500, 6]]),
  };
  // Main road (westbound) -> gate -> lane between the nurseries -> yard stop ->
  // through the warehouse row (hidden) -> lane behind the office -> out.
  const truck = route(
    [
      [...westLane(1150), 11], [...westLane(900), 11], [...westLane(790), 7], [735, 802, 4], [694, 776, 3.5], [672, 742, 3.5],
      [669, 706, 4], [684, 672, 4.5], [712, 645, 5], [752, 616, 5], [797, 584, 5], [845, 550, 4.5], [880, 520, 4],
      [906, 492, 3], [935, 467, 2.5], [990, 455, 3.5], [1050, 445, 4.5], [1330, 490, 7], [1600, 535, 6], [1652, 540, 5],
      [1560, 650, 7], [1426, 800, 9], [1300, 945, 10], [1261, 990, 10],
    ],
    { stop: 14, hide: [16, 19] },
  );
  const yard = route([[612, 417, 2], [650, 423, 2], [700, 432, 2]]);
  return { lanes, truck, yard };
}

type Vehicle = {
  R: Route; parts: Part[]; d: number; wait: number; speed: number;
  dwell?: number; stopped?: boolean; loop?: boolean; truck?: boolean; yard?: boolean; pingpong?: number;
};

// ---------- shader ----------
const VERTEX = "attribute vec2 a; varying vec2 v; void main(){ v = a * .5 + .5; gl_Position = vec4(a, 0., 1.); }";
const FRAGMENT = `precision highp float;
  varying vec2 v;
  uniform sampler2D T0, T1, T2, T3, T4, T5, ORD;
  uniform float p, time, spread, k;
  uniform vec2 res, img;
  float h(vec2 q){ return fract(sin(dot(q, vec2(127.1, 311.7))) * 43758.5453); }
  float vn(vec2 q){ vec2 i = floor(q), f = fract(q); f = f*f*(3.-2.*f);
    return mix(mix(h(i), h(i+vec2(1,0)), f.x), mix(h(i+vec2(0,1)), h(i+vec2(1,1)), f.x), f.y); }
  float fbm(vec2 q){ float s = 0., a = .5; for (int i = 0; i < 5; i++){ s += a * vn(q); q *= 2.03; a *= .5; } return s; }
  vec3 tex(float n, vec2 uv){
    if (n < .5) return texture2D(T0, uv).rgb;
    if (n < 1.5) return texture2D(T1, uv).rgb;
    if (n < 2.5) return texture2D(T2, uv).rgb;
    if (n < 3.5) return texture2D(T3, uv).rgb;
    if (n < 4.5) return texture2D(T4, uv).rgb;
    return texture2D(T5, uv).rgb;
  }
  void main(){
    vec2 sp = vec2(v.x, 1. - v.y) * res;
    vec2 uv = (.5 * img + (sp - .5 * res) / k) / img;
    float n = fbm(uv * vec2(9., 5.));
    float o = texture2D(ORD, uv).r + (n - .5) * .12 - (uv.y - .5) * .1;
    float L = clamp((p * (1. + spread) - spread * o) * 5., 0., 5.);
    float f = min(floor(L), 4.);
    float t = L - f;
    bool photo = f > 3.5;
    float w = photo ? .3 : .1;
    float na = photo ? .38 : .5;
    float n2 = fbm(uv * vec2(22., 13.) + f * 3.1);
    float m = smoothstep(.5 - w, .5 + w, t + (n2 - .5) * na);
    vec3 A = tex(f, uv), B = tex(f + 1., uv);
    float band = 1. - abs(m * 2. - 1.);
    vec3 col = mix(A, B, m);
    if (photo) col += vec3(1., .78, .5) * band * .08;
    else col += B * band * .35;
    vec2 c = v - .5;
    col *= 1. - .34 * pow(clamp(length(c * vec2(1.1, 1.25)), 0., 1.), 2.4);
    col += (h(sp + fract(time) * 91.7) - .5) * .03;
    gl_FragColor = vec4(col, 1.);
  }`;

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const im = new Image();
    im.decoding = "async";
    im.onload = () => resolve(im);
    im.onerror = reject;
    im.src = src;
  });
}

type GLRenderer = { draw: (p: number, time: number, k: number) => void; ready: () => boolean };

function createRenderer(canvas: HTMLCanvasElement, onReady: () => void): GLRenderer | null {
  const gl = canvas.getContext("webgl", { antialias: false, premultipliedAlpha: false });
  if (!gl || gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS) < 7) return null;
  const compile = (type: number, src: string) => {
    const s = gl.createShader(type);
    if (!s) return null;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return s;
  };
  const vs = compile(gl.VERTEX_SHADER, VERTEX);
  const fs = compile(gl.FRAGMENT_SHADER, FRAGMENT);
  const prog = gl.createProgram();
  if (!vs || !fs || !prog) return null;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
  gl.useProgram(prog);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, "a");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const U = (n: string) => gl.getUniformLocation(prog, n);
  ["T0", "T1", "T2", "T3", "T4", "T5", "ORD"].forEach((n, i) => gl.uniform1i(U(n), i));
  const uP = U("p"), uTime = U("time"), uRes = U("res"), uK = U("k");
  gl.uniform1f(U("spread"), SPREAD);
  gl.uniform2f(U("img"), IW, IH);

  let loaded = false;
  Promise.all([...FRAMES, ORDER_MAP].map(loadImage))
    .then((images) => {
      images.forEach((im, i) => {
        gl.activeTexture(gl.TEXTURE0 + i);
        gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, im);
      });
      loaded = true;
      onReady();
    })
    .catch(() => {});

  return {
    ready: () => loaded,
    draw: (p, time, k) => {
      if (!loaded) return;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(uP, p);
      gl.uniform1f(uTime, time);
      gl.uniform1f(uK, k);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    },
  };
}

function makeCloudTexture() {
  const w = 320, h = 180, gx = 10, gy = 6;
  const grid = Array.from({ length: 4 }, (_, o) => {
    const nx = gx << o, ny = gy << o;
    return { nx, ny, v: Array.from({ length: nx * ny }, Math.random) };
  });
  const sm = (t: number) => t * t * (3 - 2 * t);
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d");
  if (!ctx) return c;
  const id = ctx.createImageData(w, h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let v = 0, amp = 0.5;
      for (const g of grid) {
        const fx = (x / w) * g.nx, fy = (y / h) * g.ny, ix = Math.floor(fx), iy = Math.floor(fy), ax = sm(fx - ix), ay = sm(fy - iy);
        const at = (a: number, b: number) => g.v[(b % g.ny) * g.nx + (a % g.nx)];
        const top = at(ix, iy) + (at(ix + 1, iy) - at(ix, iy)) * ax;
        const bot = at(ix, iy + 1) + (at(ix + 1, iy + 1) - at(ix, iy + 1)) * ax;
        v += amp * (top + (bot - top) * ay);
        amp *= 0.5;
      }
      const s = clamp((v - 0.5) / 0.22), g = 255 - Math.round(s * s * 64), q = (y * w + x) * 4;
      id.data[q] = g - 6;
      id.data[q + 1] = g - 3;
      id.data[q + 2] = g;
      id.data[q + 3] = 255;
    }
  }
  ctx.putImageData(id, 0, 0);
  return c;
}

/** Starts the hero build. Returns a cleanup function. */
export function startHeroBuild(el: HeroBuildElements): () => void {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const trafficCtx = el.traffic.getContext("2d");
  const skyCtx = el.sky.getContext("2d");
  if (!trafficCtx || !skyCtx) return () => {};
  const tx: CanvasRenderingContext2D = trafficCtx;
  const sctx: CanvasRenderingContext2D = skyCtx;

  const view = { W: 1, H: 1, k: 1 };
  let dpr = 1;

  // Build order, copied to the CPU so vehicles switch style exactly as the wipe passes.
  let ord: { w: number; h: number; d: Uint8ClampedArray } | null = null;
  loadImage(ORDER_MAP)
    .then((im) => {
      const c = document.createElement("canvas");
      c.width = im.width;
      c.height = im.height;
      const x = c.getContext("2d");
      if (!x) return;
      x.drawImage(im, 0, 0);
      ord = { w: c.width, h: c.height, d: x.getImageData(0, 0, c.width, c.height).data };
    })
    .catch(() => {});
  const stageAt = (p: number, x: number, y: number) => {
    let o = 0.7;
    if (ord) {
      const i = clamp(Math.round((x / IW) * (ord.w - 1)), 0, ord.w - 1);
      const j = clamp(Math.round((y / IH) * (ord.h - 1)), 0, ord.h - 1);
      o = ord.d[(j * ord.w + i) * 4] / 255;
    }
    o -= (y / IH - 0.5) * 0.1;
    return clamp((p * (1 + SPREAD) - SPREAD * o) * STAGES, 0, STAGES);
  };

  const renderer = createRenderer(el.gl, () => el.stage.classList.add("gl-on"));
  if (!renderer) {
    // No WebGL: show the finished photo; traffic still runs on top.
    const poster = el.stage.querySelector("img");
    if (poster) poster.src = FRAMES[5];
  }

  // ---------- traffic ----------
  const { lanes, truck, yard } = buildRoutes();
  const palette = ["#e9e9e6", "#d8d9db", "#b9bcc0", "#202326", "#e6b52c", "#e9e9e6", "#7d2621", "#5d6770"];
  const kinds: CarKind[] = ["sedan", "sedan", "sedan", "suv", "sedan", "van", "suv", "sedan"];
  let seed = 7;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const vehicles: Vehicle[] = [];
  const addCar = (lane: keyof typeof lanes, d: number) =>
    vehicles.push({
      R: lanes[lane],
      parts: car(palette[Math.floor(rnd() * palette.length)], kinds[Math.floor(rnd() * kinds.length)]),
      d, wait: 0, speed: 0.85 + rnd() * 0.3, loop: true,
    });
  [0, 38, 90, 150].forEach((d) => addCar("west", d));
  [10, 70, 125].forEach((d) => addCar("east", d));
  [5, 60].forEach((d) => addCar("south", d));
  addCar("north", 20);
  vehicles.push({ R: truck, parts: lorry("flatbed"), d: 0, wait: 0, truck: true, speed: 1 });
  vehicles.push({ R: truck, parts: lorry("box"), d: 0, wait: 24, truck: true, speed: 1 });
  vehicles.push({ R: yard, parts: FORKLIFT, d: 0, wait: 0, pingpong: 1, speed: 1, yard: true });
  if (reduced) {
    vehicles.forEach((v) => {
      if (v.truck) v.d = v.wait ? 40 : truck.stop ?? 0;
      v.wait = 0;
    });
  }

  const step = (o: Vehicle, dt: number) => {
    const R = o.R;
    if (o.wait > 0) { o.wait -= dt; return false; }
    if ((o.dwell ?? 0) > 0) { o.dwell = (o.dwell ?? 0) - dt; return true; }
    let v = sample(R, o.d).v * o.speed;
    if (o.pingpong) {
      o.d += o.pingpong * v * dt;
      if (o.d >= R.len || o.d <= 0) { o.d = clamp(o.d, 0, R.len); o.pingpong *= -1; o.dwell = 2.5; }
      return true;
    }
    if (R.stop != null && !o.stopped) {
      const toStop = R.stop - o.d;
      if (toStop >= 0) v = Math.max(0.5, Math.min(v, toStop * 0.8));
      if (toStop >= 0 && toStop <= 0.05) { o.stopped = true; o.dwell = 3.6; o.d = R.stop; }
    }
    o.d += v * dt;
    if (o.d >= R.len) {
      o.d = 0;
      o.stopped = false;
      o.wait = o.loop ? 1 + rnd() * 5 : 6 + rnd() * 8;
      return false;
    }
    return true;
  };

  const poly = (pts: Pt[]) => {
    tx.beginPath();
    pts.forEach((q, i) => (i ? tx.lineTo(q[0], q[1]) : tx.moveTo(q[0], q[1])));
    tx.closePath();
  };

  function drawModel(parts: Part[], G: Vec3, d: Vec3, alpha: number, pm: number) {
    const s = cross(UP, d);
    const at = (x: number, y: number, z: number) => add(add(add(G, mul(d, x)), mul(s, y)), mul(UP, z));
    const lw = 1 / view.k;
    if (pm > 0) {
      const shadow: Pt[] = [];
      const k = 1 / dot(SUN, UP);
      for (const p of parts) {
        if (p.noShadow) continue;
        const corners: Vec3[] = [
          [p.x0, -p.w, p.z0], [p.x1, p.w, p.z0], [p.x0, p.w, p.z0], [p.x1, -p.w, p.z0],
          [p.tx0, -p.tw, p.z1], [p.tx1, p.tw, p.z1], [p.tx0, p.tw, p.z1], [p.tx1, -p.tw, p.z1],
        ];
        for (const [x, y, z] of corners) {
          const X = at(x, y, z);
          shadow.push(project(sub(X, mul(SUN, heightOf(X) * k))));
        }
      }
      if (shadow.length > 2) {
        tx.globalAlpha = alpha * pm * 0.32;
        tx.fillStyle = "#000";
        poly(hull(shadow));
        tx.fill();
      }
    }
    type Face = { v: Vec3[]; c: string; top: boolean; n: Vec3; depth: number; p: Part };
    const faces: Face[] = [];
    for (const p of parts) {
      const b = [at(p.x0, -p.w, p.z0), at(p.x1, -p.w, p.z0), at(p.x1, p.w, p.z0), at(p.x0, p.w, p.z0)];
      const t = [at(p.tx0, -p.tw, p.z1), at(p.tx1, -p.tw, p.z1), at(p.tx1, p.tw, p.z1), at(p.tx0, p.tw, p.z1)];
      const mid = mul(add(add(b[0], b[2]), add(t[0], t[2])), 0.25);
      const quads: { v: Vec3[]; c: string; top: boolean }[] = [
        { v: [t[0], t[1], t[2], t[3]], c: p.c, top: true },
        { v: [b[1], b[2], t[2], t[1]], c: p.front ?? p.c, top: false },
        { v: [b[3], b[0], t[0], t[3]], c: p.back ?? p.c, top: false },
        { v: [b[0], b[1], t[1], t[0]], c: p.side ?? p.c, top: false },
        { v: [b[2], b[3], t[3], t[2]], c: p.side ?? p.c, top: false },
      ];
      for (const q of quads) {
        const cen = mul(add(add(q.v[0], q.v[1]), add(q.v[2], q.v[3])), 0.25);
        let n = norm(cross(sub(q.v[1], q.v[0]), sub(q.v[3], q.v[0])));
        if (dot(n, sub(cen, mid)) < 0) n = mul(n, -1);
        if (dot(n, cen) >= 0) continue; // facing away from the camera
        faces.push({ ...q, n, depth: length(cen), p });
      }
    }
    faces.sort((a, b) => b.depth - a.depth);
    for (const f of faces) {
      const pts = f.v.map(project);
      const light = 0.74 + 0.3 * Math.max(0, dot(f.n, SUN)) + (f.top ? 0.04 : 0);
      poly(pts);
      if (pm < 1) { tx.globalAlpha = alpha * (1 - pm) * 0.92; tx.fillStyle = "#050505"; tx.fill(); }
      if (pm > 0) { tx.globalAlpha = alpha * pm; tx.fillStyle = shadeHex(f.c, light); tx.fill(); }
      if (f.p.lines && !f.top) {
        const [a, b, c, d2] = f.v;
        tx.lineWidth = lw * 0.8;
        tx.globalAlpha = alpha * (pm * 0.35 + (1 - pm) * 0.55);
        tx.strokeStyle = pm > 0.5 ? "#4a3218" : "#fff";
        tx.beginPath();
        for (let i = 1; i < f.p.lines; i++) {
          const u = i / f.p.lines;
          const q0 = project(add(a, mul(sub(d2, a), u)));
          const q1 = project(add(b, mul(sub(c, b), u)));
          tx.moveTo(q0[0], q0[1]);
          tx.lineTo(q1[0], q1[1]);
        }
        tx.stroke();
      }
      poly(pts);
      tx.lineWidth = lw;
      if (pm < 1) { tx.globalAlpha = alpha * (1 - pm); tx.strokeStyle = "#f4f4f4"; tx.stroke(); }
      if (pm > 0) { tx.globalAlpha = alpha * pm * 0.3; tx.strokeStyle = "#000"; tx.stroke(); }
    }
    tx.globalAlpha = 1;
  }

  function drawVehicles(dt: number, p: number) {
    const truckGate = clamp((p - 0.3) / 0.08);
    const yardGate = clamp((p - 0.55) / 0.08);
    const list: { o: Vehicle; G: Vec3; h: Vec3; alpha: number; pm: number }[] = [];
    for (const o of vehicles) {
      const live = reduced ? o.wait <= 0 : step(o, dt);
      if (!live) continue;
      const R = o.R;
      let alpha = o.pingpong ? 1 : clamp(o.d / 5) * clamp((R.len - o.d) / 5);
      if (R.hide) alpha *= 1 - clamp((o.d - R.hide[0]) / 5) * clamp((R.hide[1] - o.d) / 5);
      if (o.truck) alpha *= truckGate;
      if (o.yard) alpha *= yardGate;
      if (alpha <= 0.01) continue;
      const G = sample(R, o.d).X;
      const px = project(G);
      list.push({ o, G, h: headingAt(R, o.d), alpha, pm: clamp(stageAt(p, px[0], px[1]) - 4) });
    }
    list.sort((a, b) => b.G[2] - a.G[2]).forEach((e) => drawModel(e.o.parts, e.G, e.h, e.alpha, e.pm));
  }

  // ---------- drifting cloud shadows over the finished photo ----------
  const cloudTex = makeCloudTexture();
  let cloudX = 0;
  const drawSky = (dt: number, a: number) => {
    el.sky.style.opacity = String(a);
    if (a <= 0) return;
    const W = el.sky.width, H = el.sky.height, tw = W * 1.6, th = H * 1.3;
    if (!reduced) cloudX = (cloudX + dt * 6) % tw;
    sctx.drawImage(cloudTex, -cloudX, -H * 0.15, tw, th);
    sctx.drawImage(cloudTex, tw - cloudX, -H * 0.15, tw, th);
    const g = sctx.createLinearGradient(0, 0, 0, H * 0.38);
    g.addColorStop(0, "#fff");
    g.addColorStop(0.3, "#fff");
    g.addColorStop(1, "rgba(255,255,255,0)");
    sctx.fillStyle = g;
    sctx.fillRect(0, 0, W, H * 0.38);
  };

  // ---------- scroll progress, smoothed ----------
  const scrollTarget = () => {
    const r = el.track.getBoundingClientRect();
    const span = r.height - window.innerHeight;
    return span > 0 ? clamp(-r.top / span) : 0;
  };
  let p = scrollTarget();
  let copyOn = false;

  const updateUI = () => {
    const copy = clamp((p - 0.8) / 0.14);
    el.stage.style.setProperty("--copy", copy.toFixed(3));
    el.stage.style.setProperty("--shade", clamp((p - 0.74) / 0.2).toFixed(3));
    el.stage.style.setProperty("--cue", clamp(1 - p / 0.06).toFixed(3));
    if (copy > 0.5 !== copyOn) {
      copyOn = copy > 0.5;
      el.stage.toggleAttribute("data-copy", copyOn);
    }
  };

  const resize = () => {
    const r = el.stage.getBoundingClientRect();
    dpr = Math.min(1.75, window.devicePixelRatio || 1);
    view.W = r.width;
    view.H = r.height;
    view.k = Math.max(view.W / IW, view.H / IH);
    el.gl.width = el.traffic.width = Math.round(r.width * dpr);
    el.gl.height = el.traffic.height = Math.round(r.height * dpr);
    el.sky.width = 480;
    el.sky.height = 270;
  };
  resize();
  window.addEventListener("resize", resize);

  let visible = true;
  const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { rootMargin: "100px" });
  io.observe(el.track);

  let clock = 0;
  let last = performance.now();
  let raf = 0;
  const frame = (now: number) => {
    raf = requestAnimationFrame(frame);
    const elapsed = Math.min(0.5, (now - last) / 1000);
    const dt = Math.min(0.05, elapsed); // vehicles never jump more than one short step
    last = now;
    if (!visible) return;
    clock += dt;
    const target = scrollTarget();
    // Smoothing uses real elapsed time so it settles at the same speed on slow devices.
    p = reduced ? target : p + (target - p) * (1 - Math.exp(-elapsed / 0.32));
    if (Math.abs(target - p) < 1e-4) p = target;
    updateUI();
    renderer?.draw(p, clock, view.k * dpr);
    tx.setTransform(1, 0, 0, 1, 0, 0);
    tx.clearRect(0, 0, el.traffic.width, el.traffic.height);
    const k = view.k * dpr;
    tx.setTransform(k, 0, 0, k, (view.W / 2 - (IW / 2) * view.k) * dpr, (view.H / 2 - (IH / 2) * view.k) * dpr);
    drawVehicles(dt, p);
    drawSky(dt, clamp((p - 0.86) / 0.14) * 0.9);
  };
  raf = requestAnimationFrame(frame);

  return () => {
    cancelAnimationFrame(raf);
    io.disconnect();
    window.removeEventListener("resize", resize);
  };
}
