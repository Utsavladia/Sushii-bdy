"use client";

import { useEffect, useRef } from "react";

/**
 * Headless background music player. No UI.
 * Tries to autoplay on mount. If the browser blocks it,
 * starts on the very first user interaction (tap / click / scroll / keypress).
 */
export default function MusicToggle({ src = "/happy_birthday.mp3" }: { src?: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0.4;
    audio.preload = "auto";
    audioRef.current = audio;

    let unlocked = false;
    const events: (keyof DocumentEventMap)[] = [
      "pointerdown",
      "touchstart",
      "click",
      "keydown",
      "scroll",
      "wheel",
    ];

    const removeGestureListeners = () => {
      events.forEach((ev) => document.removeEventListener(ev, onGesture));
    };

    const tryPlay = async () => {
      if (unlocked || !audioRef.current) return;
      try {
        await audioRef.current.play();
        unlocked = true;
        removeGestureListeners();
      } catch {
        // autoplay blocked — keep waiting for a user gesture
      }
    };

    const onGesture = () => {
      tryPlay();
    };

    events.forEach((ev) =>
      document.addEventListener(ev, onGesture, { passive: true, once: false })
    );

    tryPlay();

    return () => {
      removeGestureListeners();
      audio.pause();
      audioRef.current = null;
    };
  }, [src]);

  return null;
}
