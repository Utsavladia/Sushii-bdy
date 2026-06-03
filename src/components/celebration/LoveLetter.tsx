"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { content } from "@/content";
import SectionHeader from "@/components/SectionHeader";

function Typewriter({ text, start }: { text: string; start: boolean }) {
  const [shown, setShown] = useState("");

  useEffect(() => {
    if (!start) return;
    let i = 0;
    setShown("");
    const id = setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, 22);
    return () => clearInterval(id);
  }, [text, start]);

  return (
    <pre
      className="font-handwriting text-2xl md:text-[2.1rem] leading-[1.5] whitespace-pre-wrap text-left text-strong"
      style={{ fontFamily: "var(--font-handwriting), 'Bradley Hand', cursive", fontWeight: 500 }}
    >
      {shown}
      {start && shown.length < text.length && <span className="opacity-70 animate-pulse">|</span>}
    </pre>
  );
}

export default function LoveLetter() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="relative py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <SectionHeader
          eyebrow="in your own words"
          title={content.loveLetterTitle}
          variant="lavender"
          icon="letter"
        />

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40, rotate: -1.5 }}
          animate={{ opacity: 1, y: 0, rotate: -1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="rounded-3xl p-8 md:p-14 relative glass-strong"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(255,244,247,0.94) 100%)",
            boxShadow:
              "0 36px 72px -22px rgba(201, 54, 101, 0.32), inset 0 1px 0 rgba(255,255,255,1)",
          }}
        >
          {/* Tape decorations */}
          <div className="absolute -top-3 left-10 w-20 h-6 rotate-[-6deg] rounded-sm" style={{ background: "rgba(255, 195, 215, 0.65)" }} />
          <div className="absolute -top-3 right-10 w-20 h-6 rotate-[5deg] rounded-sm" style={{ background: "rgba(213, 188, 255, 0.65)" }} />

          <Typewriter text={content.loveLetter} start={inView} />
        </motion.div>
      </div>
    </section>
  );
}
