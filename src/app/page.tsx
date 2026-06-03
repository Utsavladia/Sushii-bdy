"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import PetalsBackground from "@/components/PetalsBackground";
import CountdownTimer from "@/components/CountdownTimer";
import LockedGift from "@/components/LockedGift";
import MusicToggle from "@/components/MusicToggle";
import { content } from "@/content";
import { getRemaining } from "@/lib/time";

export default function CountdownPage() {
  const router = useRouter();
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    if (getRemaining().unlocked) {
      router.replace("/celebration");
    }
  }, [router]);

  useEffect(() => {
    if (unlocked) {
      const t = setTimeout(() => router.push("/celebration"), 1200);
      return () => clearTimeout(t);
    }
  }, [unlocked, router]);

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-6 py-16">
      <PetalsBackground count={32} />

      <div className="relative z-10 w-full max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-3xl md:text-4xl mb-4 animate-heartbeat"
          aria-hidden
        >
          ♡
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.1 }}
          className="font-script shimmer-text text-5xl md:text-7xl leading-tight"
        >
          {content.countdownTitle}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 0.45 }}
          className="font-serif italic text-xl md:text-2xl mt-4 font-medium text-mid"
        >
          {content.countdownTagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.8 }}
          className="mt-12"
        >
          <CountdownTimer onUnlock={() => setUnlocked(true)} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 1.2 }}
          className="mt-16"
        >
          <LockedGift />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 1.6 }}
          className="font-script text-2xl md:text-3xl mt-10 font-semibold text-mid"
        >
          {content.countdownSubtle}
        </motion.p>

        {unlocked && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mt-10 font-serif text-2xl"
            style={{ color: "var(--color-rose-deep)" }}
          >
            unlocking your surprise…
          </motion.div>
        )}
      </div>

      <MusicToggle />
    </main>
  );
}
