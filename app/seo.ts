import type { Metadata } from "next";

export const SITE_URL = "https://khodeer.com";

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, type: "website", images: [{ url: "/og-v2.png", width: 1731, height: 909, alt: "KH Wood — Iraq's trusted wood supply partner" }] },
    twitter: { title, description, card: "summary_large_image", images: ["/og-v2.png"] },
  };
}
