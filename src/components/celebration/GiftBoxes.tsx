"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import confetti from "canvas-confetti";
import { content } from "@/content";
import SectionHeader from "@/components/SectionHeader";

function MiniBox({
  label,
  index,
  opened,
  onOpen,
}: {
  label: string;
  index: number;
  opened: boolean;
  onOpen: () => void;
}) {
  const palette = [
    { body: "linear-gradient(180deg, #ff96ad, #c93665)", ribbon: "linear-gradient(180deg, #f3dca0, #d4a85a)" },
    { body: "linear-gradient(180deg, #c5a3f7, #7c5ed3)", ribbon: "linear-gradient(180deg, #ffd1de, #ef5577)" },
    { body: "linear-gradient(180deg, #ffc9d4, #ff7a93)", ribbon: "linear-gradient(180deg, #dcc4ff, #a884e8)" },
    { body: "linear-gradient(180deg, #f3dca0, #d4a85a)", ribbon: "linear-gradient(180deg, #ffc9d4, #c93665)" },
  ];
  const p = palette[index % palette.length];

  return (
    <motion.button
      whileHover={{ y: -6, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onOpen}
      className="relative aspect-square rounded-2xl overflow-hidden no-select"
      style={{
        background: "rgba(255,255,255,0.45)",
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(255,255,255,0.8)",
        boxShadow: "0 12px 32px -12px rgba(201, 54, 101, 0.35)",
      }}
      aria-label={`Open ${label}`}
    >
      <div className="absolute inset-3 rounded-xl" style={{ background: p.body }}>
        <div
          className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-4"
          style={{ background: p.ribbon }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-4"
          style={{ background: p.ribbon }}
        />
        <div
          className="absolute left-1/2 -translate-x-1/2 -top-3 w-7 h-7 rounded-full"
          style={{ background: p.ribbon }}
        />
      </div>
      <div
        className="absolute inset-x-0 bottom-0 py-3 text-center"
        style={{
          background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(58, 20, 40, 0.75) 100%)",
        }}
      >
        <span className="font-script text-lg md:text-xl text-white font-semibold drop-shadow-lg">{label}</span>
      </div>
      {!opened && (
        <div className="absolute top-3 right-3 text-[10px] uppercase tracking-widest text-white font-bold bg-black/30 px-2 py-1 rounded-full">
          tap
        </div>
      )}
      {opened && (
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center rounded-2xl">
          <span className="font-script text-2xl font-bold" style={{ color: "#a82654" }}>
            opened ♡
          </span>
        </div>
      )}
    </motion.button>
  );
}

export default function GiftBoxes() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [openedSet, setOpenedSet] = useState<Set<number>>(new Set());

  const open = (i: number) => {
    setOpenIdx(i);
    setOpenedSet((s) => new Set(s).add(i));
    confetti({
      particleCount: 60,
      spread: 80,
      origin: { y: 0.55 },
      colors: ["#ef5577", "#a884e8", "#d4a85a", "#ffc9d4", "#ffffff"],
    });
  };

  return (
    <section className="relative py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          eyebrow="eight little surprises"
          title={content.giftsTitle}
          intro={content.giftsIntro}
          variant="peach"
          icon="gift"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          {content.gifts.map((g, i) => (
            <MiniBox
              key={i}
              label={g.label}
              index={i}
              opened={openedSet.has(i)}
              onOpen={() => open(i)}
            />
          ))}
        </div>
      </div>

      {/* Modal reveal */}
      <AnimatePresence>
        {openIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ background: "rgba(74, 36, 56, 0.55)", backdropFilter: "blur(8px)" }}
            onClick={() => setOpenIdx(null)}
          >
            <motion.div
              initial={{ scale: 0.85, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 140 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong rounded-3xl p-10 md:p-14 max-w-xl w-full text-center relative"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(255,229,236,0.98))",
              }}
            >
              <div className="text-xs uppercase tracking-[0.4em] mb-4 font-bold" style={{ color: "#a82654" }}>
                {content.gifts[openIdx].label}
              </div>
              <p className="font-script text-3xl md:text-4xl leading-[1.4] text-strong font-semibold">
                {content.gifts[openIdx].message}
              </p>
              <button
                onClick={() => setOpenIdx(null)}
                className="mt-8 px-6 py-2 rounded-full font-medium text-sm uppercase tracking-[0.25em] text-white"
                style={{ background: "linear-gradient(135deg, #ef5577, #c93665)" }}
              >
                close ♡
              </button>
              <div className="absolute -top-4 -right-4 text-3xl animate-heartbeat">♡</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
