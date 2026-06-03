"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import PetalsBackground from "@/components/PetalsBackground";
import MusicToggle from "@/components/MusicToggle";
import Intro from "@/components/celebration/Intro";
import MemoryLane from "@/components/celebration/MemoryLane";
import LoveLetter from "@/components/celebration/LoveLetter";
import Reasons from "@/components/celebration/Reasons";
import Quiz from "@/components/celebration/Quiz";
import GiftBoxes from "@/components/celebration/GiftBoxes";
import Finale from "@/components/celebration/Finale";
import { content } from "@/content";
import { getRemaining } from "@/lib/time";

function CelebrationInner() {
  const router = useRouter();
  const params = useSearchParams();
  const [ready, setReady] = useState<null | "ok" | "redirect">(null);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const key = params.get("key");
    const skipIntro = params.get("skipIntro") === "1";
    const hasKey = key && content.secretPreviewKey && key === content.secretPreviewKey;
    const unlocked = getRemaining().unlocked;
    if (unlocked || hasKey) {
      setReady("ok");
      if (skipIntro) setShowIntro(false);
    } else {
      setReady("redirect");
      router.replace("/");
    }
  }, [params, router]);

  if (ready !== "ok") {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <PetalsBackground />
        <p className="font-script text-2xl" style={{ color: "rgba(74,36,56,0.5)" }}>
          loading…
        </p>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen">
      <PetalsBackground />
      <AnimatePresence>
        {showIntro && <Intro onDone={() => setShowIntro(false)} />}
      </AnimatePresence>

      <div className="relative z-10">
        <MemoryLane />
        <LoveLetter />
        <Reasons />
        <Quiz />
        <GiftBoxes />
        <Finale />
        <footer className="py-12 text-center text-xs uppercase tracking-[0.4em] font-semibold text-mid">
          made with ♡ for you
        </footer>
      </div>

      <MusicToggle />
    </main>
  );
}

export default function CelebrationPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center">
        <p className="font-script text-2xl" style={{ color: "rgba(74,36,56,0.5)" }}>loading…</p>
      </main>
    }>
      <CelebrationInner />
    </Suspense>
  );
}
