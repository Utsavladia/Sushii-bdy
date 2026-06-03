"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { content } from "@/content";

export default function Finale() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [fired, setFired] = useState(false);

  useEffect(() => {
    if (fired) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setFired(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    // Fallback: fire after 6s on mount if observer hasn't triggered
    const t = setTimeout(() => setFired(true), 6000);
    return () => {
      observer.disconnect();
      clearTimeout(t);
    };
  }, [fired]);

  useEffect(() => {
    if (!fired) return;
    const end = Date.now() + 2500;
    const colors = ["#ef5577", "#c93665", "#a884e8", "#d4a85a", "#ffc9d4", "#ffffff"];
    const tick = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 65,
        origin: { x: 0, y: 0.7 },
        colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 65,
        origin: { x: 1, y: 0.7 },
        colors,
      });
      if (Date.now() < end) requestAnimationFrame(tick);
    };
    tick();
  }, [fired]);

  return (
    <section ref={ref} className="relative py-32 px-6 text-center overflow-hidden">
      {/* Spotlight glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(600px 400px at 50% 50%, rgba(255, 195, 215, 0.55), transparent 70%)",
        }}
      />
      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="font-serif text-3xl md:text-4xl italic font-semibold text-mid"
        >
          {content.finaleTitle}
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2 }}
          className="font-script text-7xl md:text-[10rem] leading-none shimmer-text mt-4"
        >
          {content.girlName}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.6 }}
          className="font-script text-3xl md:text-4xl mt-10 font-semibold"
          style={{ color: "#a82654" }}
        >
          {content.finaleMessage}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, delay: 1.1 }}
          className="mt-14 flex items-center justify-center gap-3"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="text-3xl animate-heartbeat"
              style={{ animationDelay: `${i * 0.2}s`, color: "var(--color-rose-deep)" }}
            >
              ♡
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
