"use client";

import { useEffect } from "react";

/**
 * Keeps every background video playing on a loop.
 *
 * A muted inline video is allowed to autoplay, but browsers still refuse or drop
 * playback in ways that leave a frozen frame for the whole visit: iOS blocks
 * autoplay outright in Low Power Mode, a play() issued before enough data has
 * buffered can be rejected, and a backgrounded tab or stalled connection pauses
 * the element unasked.
 *
 * Two things matter for recovery. First, every event that marks a possible
 * recovery point retries play(). Second — and this is what previously left the
 * hero needing its play button pressed — the first-interaction retry is armed
 * unconditionally, not only when play() rejects. iOS commonly *resolves* a
 * blocked play() and fires `pause` immediately afterwards, so a catch-based
 * arm never ran and no tap or scroll could start the video.
 */
export function VideoAutoplay() {
  useEffect(() => {
    const tracked = new WeakSet<HTMLVideoElement>();
    const everPlayed = new WeakSet<HTMLVideoElement>();
    const GESTURES = ["touchstart", "touchend", "pointerdown", "click", "keydown", "scroll"] as const;

    const play = (video: HTMLVideoElement) => {
      if (!video.isConnected || !video.paused) return;
      const attempt = video.play();
      if (attempt) attempt.catch(() => {});
    };

    const playAll = () => document.querySelectorAll("video").forEach((v) => {
      const video = v as HTMLVideoElement;
      if (video.dataset.offscreen !== "true") play(video);
    });

    const adopt = (video: HTMLVideoElement) => {
      if (tracked.has(video)) return;
      tracked.add(video);

      // Safari only honours inline autoplay with both of these set on the element.
      video.muted = true;
      video.playsInline = true;
      video.loop = true;

      video.addEventListener("playing", () => everPlayed.add(video));
      (["loadeddata", "canplay", "stalled", "suspend", "pause"] as const).forEach((name) =>
        video.addEventListener(name, () => {
          if (video.dataset.offscreen !== "true") play(video);
        }),
      );

      visibility.observe(video);
      play(video);
    };

    // Offscreen videos are paused to save decoding, but only once they have
    // actually played. Pausing one that has never started would fight the
    // autoplay recovery above rather than save anything.
    const visibility = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        const video = entry.target as HTMLVideoElement;
        if (entry.isIntersecting) {
          video.dataset.offscreen = "false";
          play(video);
        } else if (everPlayed.has(video)) {
          video.dataset.offscreen = "true";
          if (!video.paused) video.pause();
        }
      }),
      { rootMargin: "300px 0px" },
    );

    const scan = () => document.querySelectorAll("video").forEach((v) => adopt(v as HTMLVideoElement));
    scan();

    // Armed immediately: the first interaction of any kind starts anything the
    // autoplay policy held back, whether or not play() reported a failure.
    GESTURES.forEach((name) => window.addEventListener(name, playAll, { passive: true }));
    document.addEventListener("visibilitychange", playAll);

    // Covers a first play() that lost the race with the network.
    const timers = [300, 1200, 3000].map((delay) => window.setTimeout(playAll, delay));

    const added = new MutationObserver(scan);
    added.observe(document.body, { childList: true, subtree: true });

    return () => {
      added.disconnect();
      visibility.disconnect();
      document.removeEventListener("visibilitychange", playAll);
      timers.forEach(window.clearTimeout);
      GESTURES.forEach((name) => window.removeEventListener(name, playAll));
    };
  }, []);

  return null;
}
