"use client";

import { useEffect } from "react";

/**
 * Keeps every background video on the site looping.
 *
 * iOS refuses autoplay outright in Low Power Mode and can also drop playback
 * when a tab is backgrounded or the connection stalls mid-buffer, which leaves
 * a video frozen on one frame for the rest of the visit. This watches all of
 * them centrally: it retries on the first user gesture, resumes anything that
 * stalls, and picks up videos added by client-side navigation.
 *
 * Offscreen videos are paused. Decoding four looping videos at once is the main
 * source of scroll jank on a phone, and a video nobody can see does not need to
 * be running — each one resumes from where it left off as it comes back.
 */
export function VideoAutoplay() {
  useEffect(() => {
    const videos = new Set<HTMLVideoElement>();
    let gestureBound = false;

    const wanted = (video: HTMLVideoElement) => video.dataset.paused !== "user";

    const tryPlay = (video: HTMLVideoElement) => {
      if (!wanted(video) || !video.isConnected) return;
      const attempt = video.play();
      if (attempt) attempt.catch(bindGesture);
    };

    const retryAll = () => {
      videos.forEach((video) => {
        if (video.dataset.visible === "false") return;
        tryPlay(video);
      });
    };

    function bindGesture() {
      if (gestureBound) return;
      gestureBound = true;
      ["touchstart", "pointerdown", "keydown"].forEach((name) =>
        window.addEventListener(name, retryAll, { passive: true }),
      );
    }

    // Pause what is offscreen; resume it as it scrolls back in.
    const visibility = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        const video = entry.target as HTMLVideoElement;
        video.dataset.visible = String(entry.isIntersecting);
        if (entry.isIntersecting) tryPlay(video);
        else if (!video.paused) video.pause();
      }),
      { rootMargin: "200px 0px" },
    );

    const adopt = (video: HTMLVideoElement) => {
      if (videos.has(video) || !video.hasAttribute("autoplay")) return;
      videos.add(video);
      // Safari only honours inline autoplay when both are set on the element.
      video.muted = video.muted || !video.hasAttribute("data-unmuted");
      video.playsInline = true;
      video.loop = true;
      video.addEventListener("stalled", () => tryPlay(video));
      video.addEventListener("pause", () => {
        // A pause we did not ask for (buffer underrun, OS interruption).
        if (wanted(video) && video.dataset.visible !== "false" && !video.ended) {
          requestAnimationFrame(() => tryPlay(video));
        }
      });
      visibility.observe(video);
      tryPlay(video);
    };

    const scan = () => document.querySelectorAll("video").forEach((v) => adopt(v as HTMLVideoElement));

    scan();

    const added = new MutationObserver(scan);
    added.observe(document.body, { childList: true, subtree: true });
    document.addEventListener("visibilitychange", retryAll);

    return () => {
      added.disconnect();
      visibility.disconnect();
      document.removeEventListener("visibilitychange", retryAll);
      ["touchstart", "pointerdown", "keydown"].forEach((name) =>
        window.removeEventListener(name, retryAll),
      );
    };
  }, []);

  return null;
}
