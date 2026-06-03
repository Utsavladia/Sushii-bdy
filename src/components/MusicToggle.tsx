"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Floating music toggle. Looks for /happy_birthday.mp3 in /public by default.
 * Tries to autoplay on mount. If the browser blocks it, plays on the
 * very first user interaction (tap / click / scroll / keypress).
 */
export default function MusicToggle({ src = "/happy_birthday.mp3" }: { src?: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0.4;
    audio.preload = "auto";

    const markAvailable = () => setAvailable(true);
    audio.addEventListener("loadedmetadata", markAvailable, { once: true });
    audio.addEventListener("canplay", markAvailable, { once: true });
    audio.addEventListener("error", () => setAvailable(false));
    audioRef.current = audio;

    fetch(src, { method: "HEAD" })
      .then((r) => {
        if (r.ok) setAvailable(true);
      })
      .catch(() => {});

    let unlocked = false;
    const tryPlay = async () => {
      if (unlocked || !audioRef.current) return;
      try {
        await audioRef.current.play();
        unlocked = true;
        setPlaying(true);
        removeGestureListeners();
      } catch {
        // autoplay blocked — wait for a user gesture
      }
    };

    const onGesture = () => {
      tryPlay();
    };
    const events: (keyof DocumentEventMap)[] = [
      "pointerdown",
      "touchstart",
      "click",
      "keydown",
      "scroll",
      "wheel",
    ];
    const addGestureListeners = () => {
      events.forEach((ev) =>
        document.addEventListener(ev, onGesture, { passive: true, once: false })
      );
    };
    const removeGestureListeners = () => {
      events.forEach((ev) => document.removeEventListener(ev, onGesture));
    };

    // Try immediately; if blocked, arm the gesture listeners.
    tryPlay();
    addGestureListeners();

    return () => {
      removeGestureListeners();
      audio.pause();
      audioRef.current = null;
    };
  }, [src]);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        // ignore
      }
    }
  };

  if (!available) return null;

  return (
    <button
      onClick={toggle}
      aria-label={playing ? "Pause music" : "Play music"}
      className="fixed bottom-6 right-6 z-40 glass-strong rounded-full px-5 py-3 text-sm font-bold hover:scale-105 active:scale-95 transition"
      style={{ color: "#a82654" }}
    >
      <span className="inline-flex items-center gap-2">
        <span className={playing ? "animate-pulse-soft" : ""}>{playing ? "♪" : "♫"}</span>
        {playing ? "pause music" : "play music"}
      </span>
    </button>
  );
}
