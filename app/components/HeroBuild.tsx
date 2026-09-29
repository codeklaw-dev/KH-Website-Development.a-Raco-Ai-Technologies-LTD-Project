"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { startHeroBuild } from "./heroBuildEngine";

/**
 * Pinned home hero: the yard builds itself from survey lines to the aerial
 * photo as the visitor scrolls. The hero copy (children) fades in at the end.
 */
export function HeroBuild({ children }: { children: ReactNode }) {
  const trackRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const glRef = useRef<HTMLCanvasElement>(null);
  const skyRef = useRef<HTMLCanvasElement>(null);
  const trafficRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const track = trackRef.current, stage = stageRef.current, gl = glRef.current, sky = skyRef.current, traffic = trafficRef.current;
    if (!track || !stage || !gl || !sky || !traffic) return;
    return startHeroBuild({ track, stage, gl, sky, traffic });
  }, []);

  return (
    <section className="home-hero" ref={trackRef} aria-label="The KH Wood yard, built as you scroll">
      <div className="home-hero-stage" ref={stageRef}>
        <img src="/assets/hero-build-00.jpg" alt="Surveyed plot for the KH Wood yard beside the main road, drawn as white lines" fetchPriority="high" />
        <canvas ref={glRef} aria-hidden="true" />
        <canvas ref={skyRef} className="hero-build-sky" aria-hidden="true" />
        <canvas ref={trafficRef} className="hero-build-traffic" aria-hidden="true" />
        <div className="home-hero-shade" />
        {children}
        <div className="hero-build-cue" aria-hidden="true">Scroll to build<i /></div>
      </div>
    </section>
  );
}
