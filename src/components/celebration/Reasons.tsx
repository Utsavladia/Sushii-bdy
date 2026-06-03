"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { content } from "@/content";
import SectionHeader from "@/components/SectionHeader";

function FlipCard({ reason, index }: { reason: string; index: number }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.button
      onClick={() => setFlipped((f) => !f)}
      whileHover={{ y: -4 }}
      className="relative w-full aspect-square cursor-pointer no-select"
      style={{ perspective: 1000 }}
      aria-label={`Reason ${index + 1}`}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-3xl glass-strong flex flex-col items-center justify-center p-4"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div
            className="font-serif text-4xl md:text-6xl font-bold"
            style={{ color: "#a82654" }}
          >
            {String(index + 1).padStart(2, "0")}
          </div>
          <p className="mt-2 text-[10px] md:text-xs uppercase tracking-[0.3em] text-mid font-medium">
            tap to reveal
          </p>
          <div className="absolute bottom-3 right-3 text-xl opacity-80" style={{ color: "#a82654" }}>♡</div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-3xl p-5 flex items-center justify-center text-center"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background:
              "linear-gradient(135deg, #ffd3df 0%, #e5cdff 100%)",
            boxShadow: "0 24px 50px -16px rgba(201, 54, 101, 0.55)",
            border: "1px solid rgba(255,255,255,0.9)",
          }}
        >
          <p className="font-script text-xl md:text-2xl leading-snug font-semibold" style={{ color: "#3a1428" }}>
            {reason}
          </p>
        </div>
      </motion.div>
    </motion.button>
  );
}

export default function Reasons() {
  return (
    <section className="relative py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          eyebrow="tap each card"
          title={content.reasonsTitle}
          intro={content.reasonsIntro}
          variant="blush"
          icon="heart"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
          {content.reasons.map((r, i) => (
            <FlipCard key={i} reason={r} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
