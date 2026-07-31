"use client";

import Link from "next/link";
import { useEffect } from "react";

const STORAGE_KEY = "kh-product-scroll";
const SECTION_IDS = ["overview", "brief"];

export function ProductRangeNav({ ranges, current }: { ranges: { slug: string; n: string; shortTitle: string }[]; current: string }) {
  useEffect(() => {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    sessionStorage.removeItem(STORAGE_KEY);
    try {
      const { sectionId, offset } = JSON.parse(raw);
      if (!sectionId) return;
      const el = document.getElementById(sectionId);
      if (!el) return;
      requestAnimationFrame(() => window.scrollTo({ top: el.offsetTop + offset, behavior: "instant" }));
    } catch {
      // ignore malformed session data
    }
  }, []);

  function captureScrollContext() {
    let sectionId: string | null = null;
    let offset = 0;
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (!el) continue;
      const top = el.offsetTop;
      const bottom = top + el.offsetHeight;
      if (window.scrollY >= top - 120 && window.scrollY < bottom) {
        sectionId = id;
        offset = window.scrollY - top;
        break;
      }
    }
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ sectionId, offset }));
  }

  return (
    <nav className="product-range-rail" aria-label="Browse product ranges">
      <span>Browse the range</span>
      {ranges.map((item) => (
        <Link key={item.slug} href={`/products/${item.slug}`} scroll={false} onClick={captureScrollContext} aria-current={item.slug === current ? "page" : undefined}>
          <small>{item.n}</small>{item.shortTitle}
        </Link>
      ))}
    </nav>
  );
}
