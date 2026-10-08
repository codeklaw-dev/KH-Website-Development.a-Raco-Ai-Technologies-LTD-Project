import assert from "node:assert/strict";
import { readdir } from "node:fs/promises";
import test from "node:test";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

function request(path, host = "khodeer.com") {
  return worker.fetch(
    new Request(`https://${host}${path}`),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("public routes render unique canonical URLs and page headings", async () => {
  const routes = [
    "/", "/company", "/products", "/products/wood-timber", "/products/panels-boards",
    "/products/project-materials", "/products/bulk-requirements", "/products/agency-representation",
    "/partners", "/franchise", "/operations", "/contact",
  ];

  for (const path of routes) {
    const response = await request(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.match(html, /<title>[^<]+<\/title>/, path);
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1, path);
    assert.match(html, new RegExp(`<link rel="canonical" href="https://khodeer\\.com${path}"\\/>`), path);
    assert.doesNotMatch(html, /<meta[^>]+name="robots"[^>]+content="noindex"/, path);
  }
});

test("product gallery images exist and use descriptive alternative text", async () => {
  const html = await (await request("/products")).text();
  const images = [...html.matchAll(/<img[^>]+src="\/assets\/product-gallery\/([^"]+)"[^>]*>/g)];
  assert.equal(images.length, 12);
  assert.ok(images.every(([tag]) => /alt="[^"]+"/.test(tag) && /loading="lazy"/.test(tag)));
  const files = await readdir(new URL("../public/assets/product-gallery/", import.meta.url));
  assert.ok(images.every(([, name]) => files.includes(name)));
});

test("robots, sitemap, structured data, and preferred host are ready for crawling", async () => {
  const robots = await request("/robots.txt");
  assert.equal(robots.status, 200);
  assert.match(robots.headers.get("content-type") ?? "", /^text\/plain/);
  assert.match(await robots.text(), /Sitemap: https:\/\/khodeer\.com\/sitemap\.xml/);

  const sitemap = await request("/sitemap.xml");
  assert.equal(sitemap.status, 200);
  assert.match(sitemap.headers.get("content-type") ?? "", /^application\/xml/);
  const xml = await sitemap.text();
  assert.equal((xml.match(/<loc>/g) ?? []).length, 12);
  assert.doesNotMatch(xml, /www\.khodeer\.com|localhost|404/);

  const home = await (await request("/")).text();
  assert.match(home, /"@type":"Organization"/);
  const product = await (await request("/products/wood-timber")).text();
  assert.match(product, /"@type":"BreadcrumbList"/);

  const redirect = await request("/products?source=test", "www.khodeer.com");
  assert.equal(redirect.status, 308);
  assert.equal(redirect.headers.get("location"), "https://khodeer.com/products?source=test");
});
