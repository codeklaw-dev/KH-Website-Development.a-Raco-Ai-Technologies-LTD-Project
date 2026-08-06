"use client";

import { useEffect } from "react";

/**
 * Keeps every background video on the site playing, on a loop, at all times.
 *
 * A muted inline video is allowed to autoplay, but browsers still refuse or drop
 * playback in several situations that leave a frozen frame for the rest of the
 * visit: iOS blocks autoplay outright in Low Power Mode, a `play()` issued
 * before enough data has buffered can be rejected, and a backgrounded tab or a
 * stalled connection pauses the element without asking.
 *
 * So rather than calling play() once at mount, every event that could mark a
 * recovery point retries it. Videos are never paused deliberately — including
 * when off screen — because a paused background video reads as broken.
 */
export function VideoAutoplay() {
  useEffect(() => {
    const tracked = new WeakSet<HTMLVideoElement>();
    let gestureBound = false;

    const play = (video: HTMLVideoElement) => {
      if (!video.isConnected || !video.paused) return;
      const attempt = video.play();
      if (attempt) attempt.catch(bindGesture);
    };

    const playAll = () => document.querySelectorAll("video").forEach((v) => play(v as HTMLVideoElement));

    // Autoplay is permitted again once the user has interacted, so a blocked
    // video starts on the first touch instead of staying frozen.
    function bindGesture() {
      if (gestureBound) return;
      gestureBound = true;
      ["touchstart", "pointerdown", "keydown", "scroll"].forEach((name) =>
        window.addEventListener(name, playAll, { passive: true }),
      );
    }

    const adopt = (video: HTMLVideoElement) => {
      if (tracked.has(video)) return;
      tracked.add(video);

      // Safari only honours inline autoplay with both of these set on the element.
      video.muted = true;
      video.playsInline = true;
      video.loop = true;

      // Each of these is a point where playback can legitimately resume.
      (["loadeddata", "canplay", "stalled", "suspend", "pause", "ended"] as const).forEach((name) =>
        video.addEventListener(name, () => play(video)),
      );

      play(video);
    };

    const scan = () => document.querySelectorAll("video").forEach((v) => adopt(v as HTMLVideoElement));

    scan();

    // Client-side navigation swaps in new videos.
    const added = new MutationObserver(scan);
    added.observe(document.body, { childList: true, subtree: true });
    document.addEventListener("visibilitychange", playAll);

    // A couple of early retries cover a first play() that lost the race with
    // the network, without polling for the whole visit.
    const timers = [400, 1500, 4000].map((delay) => window.setTimeout(playAll, delay));

    return () => {
      added.disconnect();
      document.removeEventListener("visibilitychange", playAll);
      timers.forEach(window.clearTimeout);
      ["touchstart", "pointerdown", "keydown", "scroll"].forEach((name) =>
        window.removeEventListener(name, playAll),
      );
    };
  }, []);

  return null;
}
