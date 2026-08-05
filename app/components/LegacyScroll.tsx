"use client";

import { useEffect, useRef } from "react";

export function LegacyScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const distance = section.offsetHeight - window.innerHeight;
      const travelled = Math.min(Math.max(-section.getBoundingClientRect().top, 0), distance);
      const progress = distance > 0 ? travelled / distance : 0;
      const viewport = track.parentElement?.clientWidth ?? window.innerWidth;
      const shift = Math.max(track.scrollWidth - viewport, 0);
      track.style.transform = `translate3d(${-progress * shift}px,0,0)`;
      if (cueRef.current) cueRef.current.classList.toggle("at-end", progress > 0.98);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="legacy-horizontal" id="legacy" aria-labelledby="legacy-heading" ref={sectionRef}>
      <h2 className="sr-only" id="legacy-heading">The KH Wood legacy and Iraq&apos;s wood-trading tradition</h2>
      <div className="legacy-sticky">
        <div className="legacy-track" ref={trackRef}>
          <article className="legacy-panel legacy-origins" id="legacy-origins">
            <img className="cover-image" src="/assets/iraq-wood-trade-legacy-14409cdf.jpg" alt="Illustrated historical wood trade in an Iraqi market" fetchPriority="high" />
            <div className="legacy-panel-shade" />
            <div className="legacy-chapter"><span>01</span><small>Iraq · Material history</small></div>
            <div className="legacy-panel-copy">
              <p className="eyebrow">Before modern supply chains</p>
              <h2>An ancient<br /><em>trade.</em></h2>
            </div>
            <p className="legacy-panel-note">Across river routes, markets, workshops, and building sites, timber has supported Iraqi trade, craft, construction, and daily life for generations.</p>
          </article>

          <article className="legacy-panel legacy-present" id="legacy-present">
            <img className="cover-image" src="/assets/iraq-market.jpg" alt="Contemporary Iraqi city and commercial district at sunset" loading="lazy" decoding="async" />
            <div className="legacy-panel-shade" />
            <div className="legacy-chapter"><span>02</span><small>KH Wood · Today</small></div>
            <div className="legacy-panel-copy">
              <p className="eyebrow">A name in motion</p>
              <h2>A living<br /><em>legacy.</em></h2>
            </div>
            <p className="legacy-panel-note">From the carpentry roots of Khodeer Abbas Turki to operations across three countries, KH Wood supplies Iraq&apos;s markets directly while connecting international manufacturers to the region. The same standard, carried further: know the material, keep your word, build for the long term.</p>
          </article>
        </div>
        <div className="legacy-scroll-cue" aria-hidden="true" ref={cueRef}><span>Keep scrolling</span><i /><b>01 — 02</b></div>
      </div>
    </section>
  );
}
