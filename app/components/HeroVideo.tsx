"use client";

import { useEffect, useRef, useState } from "react";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  // iOS refuses to autoplay while Low Power Mode is on, even for a muted inline
  // video, and then paints the poster with a play button. Autoplay is allowed
  // again once the user has interacted, so retry on the first gesture rather
  // than leaving a still frame on the page.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const events = ["touchstart", "pointerdown", "keydown", "scroll"] as const;
    const stop = () => events.forEach((name) => window.removeEventListener(name, retry));

    function retry() {
      const target = videoRef.current;
      if (!target) return stop();
      target.play().then(stop, () => {});
    }

    video.play().catch(() => {
      events.forEach((name) => window.addEventListener(name, retry, { passive: true, once: false }));
    });

    return stop;
  }, []);

  const toggleSound = async () => {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !muted;
    video.muted = nextMuted;
    setMuted(nextMuted);

    if (!nextMuted) {
      try {
        await video.play();
      } catch {
        video.muted = true;
        setMuted(true);
      }
    }
  };

  return (
    <>
      <video ref={videoRef} autoPlay muted loop playsInline preload="auto" poster="/assets/home-hero-poster-bdad5a85.jpg" aria-hidden="true">
        <source src="/assets/home-hero-video.mp4" type="video/mp4" />
      </video>
      <button
        className={`hero-sound-toggle${muted ? "" : " is-active"}`}
        type="button"
        onClick={toggleSound}
        aria-label={muted ? "Turn hero video sound on" : "Turn hero video sound off"}
        aria-pressed={!muted}
      >
        <span className="hero-sound-icon" aria-hidden="true"><i /><i /><i /></span>
        <span>{muted ? "Sound on" : "Sound off"}</span>
      </button>
    </>
  );
}
