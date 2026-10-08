import type { MetadataRoute } from "next";
import { productRanges } from "./products/productData";
import { absoluteUrl } from "./seo";

const staticRoutes = ["/", "/company", "/products", "/partners", "/franchise", "/operations", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [...staticRoutes, ...productRanges.map(({ slug }) => `/products/${slug}`)].map((path) => ({
    url: absoluteUrl(path),
  }));
}
