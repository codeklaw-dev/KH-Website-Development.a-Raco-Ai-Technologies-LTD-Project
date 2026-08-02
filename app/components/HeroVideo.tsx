"use client";

import { useRef, useState } from "react";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

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
      <video ref={videoRef} autoPlay muted loop playsInline preload="auto" poster="/assets/kh-yard-poster.jpg" aria-hidden="true">
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
