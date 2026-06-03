"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { content } from "@/content";

export default function Intro({ onDone }: { onDone: () => void }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const burst = (origin: { x: number; y: number }) => {
      confetti({
        particleCount: 90,
        spread: 70,
        startVelocity: 45,
        origin,
        colors: ["#ef5577", "#c93665", "#a884e8", "#d4a85a", "#ffc9d4", "#ffffff"],
        scalar: 1.1,
      });
    };
    burst({ x: 0.2, y: 0.4 });
    setTimeout(() => burst({ x: 0.8, y: 0.4 }), 250);
    setTimeout(() => burst({ x: 0.5, y: 0.3 }), 500);
    setTimeout(() => {
      confetti({
        particleCount: 200,
        spread: 160,
        startVelocity: 55,
        origin: { x: 0.5, y: 0.5 },
        colors: ["#ef5577", "#c93665", "#a884e8", "#d4a85a", "#ffc9d4", "#ffffff"],
        scalar: 1.3,
      });
    }, 900);

    const t1 = setTimeout(() => setStage(1), 1500);
    const t2 = setTimeout(() => setStage(2), 3200);
    const t3 = setTimeout(() => onDone(), 5400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center text-center px-6"
      style={{
        background:
          "radial-gradient(circle at 50% 40%, rgba(255,255,255,0.92), rgba(255,229,236,0.95) 60%, rgba(237,224,255,0.97) 100%)",
      }}
    >
      <AnimatePresence mode="wait">
        {stage === 0 && (
          <motion.div
            key="0"
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 1, type: "spring", stiffness: 120 }}
            className="font-serif text-6xl md:text-8xl shimmer-text"
          >
            ♡
          </motion.div>
        )}

        {stage === 1 && (
          <motion.div
            key="1"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <p className="font-script text-4xl md:text-6xl font-bold" style={{ color: "#a82654" }}>
              today is the day…
            </p>
          </motion.div>
        )}

        {stage === 2 && (
          <motion.div
            key="2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.9 }}
            className="space-y-6"
          >
            <p className="font-serif text-3xl md:text-5xl italic font-semibold text-mid">
              Happy Birthday,
            </p>
            <h1 className="font-script text-8xl md:text-[11rem] leading-none shimmer-text">
              {content.girlName}
            </h1>
            <p className="font-script text-3xl md:text-4xl" style={{ color: "#a82654" }}>
              ♡
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
