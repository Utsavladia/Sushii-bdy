"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import {
  Flower,
  FLOWER_PALETTES,
  type FlowerPalette,
} from "@/components/Flower";
import {
  FLOWER_LABELS,
  type FlowerKind,
  setChosenFlowers,
} from "@/lib/flower";

const CHOICES: { kind: FlowerKind; palette: FlowerPalette; tagline: string }[] = [
  { kind: "rose", palette: FLOWER_PALETTES[0], tagline: "classic & deep" },
  { kind: "tulip", palette: FLOWER_PALETTES[6], tagline: "soft & spring" },
  { kind: "daisy", palette: FLOWER_PALETTES[2], tagline: "sweet & simple" },
  { kind: "sunflower", palette: { hue: "#ffd96f", hue2: "#f59a2e" }, tagline: "bright & sunny" },
];

function FlowerBurst({
  picks,
  origin,
}: {
  picks: { kind: FlowerKind; palette: FlowerPalette }[];
  origin: { x: number; y: number };
}) {
  const pieces = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => {
        const angle = (i / 26) * Math.PI * 2 + Math.random() * 0.35;
        const dist = 160 + Math.random() * 160;
        const pick = picks[i % picks.length];
        return {
          dx: Math.cos(angle) * dist,
          dy: Math.sin(angle) * dist,
          rot: Math.random() * 720 - 360,
          size: 24 + Math.random() * 16,
          delay: Math.random() * 0.16,
          kind: pick.kind,
          palette: pick.palette,
        };
      }),
    [picks]
  );

  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none z-[60]"
      style={{ left: 0, top: 0 }}
    >
      {pieces.map((p, i) => (
        <motion.div
          key={i}
          initial={{ x: origin.x, y: origin.y, opacity: 1, scale: 0.4, rotate: 0 }}
          animate={{
            x: origin.x + p.dx,
            y: origin.y + p.dy,
            opacity: 0,
            scale: 1.15,
            rotate: p.rot,
          }}
          transition={{ duration: 1.2, ease: "easeOut", delay: p.delay }}
          className="absolute"
          style={{ filter: "drop-shadow(0 6px 12px rgba(201, 54, 101, 0.28))" }}
        >
          <Flower
            kind={p.kind}
            size={p.size}
            hue={p.palette.hue}
            hue2={p.palette.hue2}
            uniqueId={`burst-${i}`}
          />
        </motion.div>
      ))}
    </div>
  );
}

export default function FlowerChooser({ onChosen }: { onChosen?: (kinds: FlowerKind[]) => void }) {
  const [picked, setPicked] = useState<Set<FlowerKind>>(new Set());
  const [confirmed, setConfirmed] = useState(false);
  const [burstOrigin, setBurstOrigin] = useState<{ x: number; y: number } | null>(null);
  const [exiting, setExiting] = useState(false);

  // Lock scroll while modal is open
  useEffect(() => {
    if (exiting) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [exiting]);

  const toggle = (kind: FlowerKind) => {
    if (confirmed) return;
    setPicked((s) => {
      const next = new Set(s);
      if (next.has(kind)) next.delete(kind);
      else next.add(kind);
      return next;
    });
  };

  const confirm = (ev: React.MouseEvent<HTMLButtonElement>) => {
    if (picked.size === 0 || confirmed) return;
    const rect = ev.currentTarget.getBoundingClientRect();
    setBurstOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    setConfirmed(true);
    const kinds = Array.from(picked);
    setChosenFlowers(kinds);
    setTimeout(() => setExiting(true), 900);
    setTimeout(() => onChosen?.(kinds), 1450);
  };

  const pickedPicks = useMemo(
    () =>
      Array.from(picked)
        .map((k) => CHOICES.find((c) => c.kind === k))
        .filter(Boolean) as { kind: FlowerKind; palette: FlowerPalette; tagline: string }[],
    [picked]
  );

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="chooser"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-3 sm:px-4 py-6"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.35), rgba(255,229,236,0.55) 60%, rgba(237,224,255,0.6) 100%)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        >
          <motion.div
            initial={{ scale: 0.92, y: 24 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 10, opacity: 0 }}
            transition={{ duration: 0.55, type: "spring", stiffness: 120 }}
            className="w-full max-w-[340px] sm:max-w-2xl flex flex-col items-center max-h-[92vh]"
          >
            {/* Hanging string */}
            <div
              aria-hidden
              className="w-[2px] h-6 sm:h-10 rounded-full"
              style={{
                background:
                  "linear-gradient(180deg, transparent 0%, rgba(201,54,101,0.7) 80%, #c93665 100%)",
              }}
            />

            {/* Bow tied above the card */}
            <svg
              className="-mb-3 sm:-mb-4 relative z-10"
              width="64"
              height="36"
              viewBox="0 0 72 42"
              aria-hidden
            >
              <ellipse cx="20" cy="21" rx="16" ry="13" fill="#ef5577" />
              <ellipse cx="52" cy="21" rx="16" ry="13" fill="#ef5577" />
              <ellipse cx="20" cy="21" rx="8" ry="6" fill="white" opacity="0.32" />
              <ellipse cx="52" cy="21" rx="8" ry="6" fill="white" opacity="0.32" />
              <rect x="30" y="11" width="12" height="22" rx="3" fill="#c93665" />
              <line x1="36" y1="32" x2="28" y2="40" stroke="#c93665" strokeWidth="3" strokeLinecap="round" />
              <line x1="36" y1="32" x2="44" y2="40" stroke="#c93665" strokeWidth="3" strokeLinecap="round" />
            </svg>

            <div
              className="glass-strong rounded-3xl px-3 py-6 sm:px-8 sm:py-9 md:px-12 md:py-12 text-center relative overflow-y-auto box-border w-full"
              style={{
                boxShadow:
                  "0 30px 70px -20px rgba(201,54,101,0.32), inset 0 1px 0 rgba(255,255,255,1)",
              }}
            >
              {/* Punched hole at top center, like a gift tag */}
              <div
                aria-hidden
                className="absolute left-1/2 -translate-x-1/2 -top-2 w-3 h-3 rounded-full"
                style={{
                  background: "#fff",
                  border: "2px solid #c93665",
                  boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)",
                }}
              />

              <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.35em] sm:tracking-[0.4em] font-bold text-mid mb-2 mt-1">
                first things first
              </p>
            <h2 className="font-script shimmer-text text-[32px] sm:text-5xl md:text-6xl leading-tight">
              Pick your flowers
            </h2>
            <p className="mt-2 sm:mt-3 font-serif italic text-[13px] sm:text-base md:text-lg text-mid px-2">
              tap any you love — they&apos;ll all bloom together ✿
            </p>

            <div className="mt-6 sm:mt-8 md:mt-10 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 md:gap-4">
              {CHOICES.map(({ kind, palette, tagline }, idx) => {
                const isPicked = picked.has(kind);
                return (
                  <motion.button
                    key={kind}
                    onClick={() => toggle(kind)}
                    disabled={confirmed}
                    whileHover={confirmed ? undefined : { y: -6, scale: 1.04 }}
                    whileTap={confirmed ? undefined : { scale: 0.95 }}
                    animate={
                      isPicked
                        ? { y: [0, -3, 0], rotate: [0, -2, 2, -1, 0] }
                        : { y: [0, -5, 0] }
                    }
                    transition={
                      isPicked
                        ? { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
                        : { duration: 3 + idx * 0.4, repeat: Infinity, ease: "easeInOut", delay: idx * 0.2 }
                    }
                    className="relative rounded-2xl px-1 py-2.5 sm:px-3 sm:py-4 md:px-4 md:py-5 flex flex-col items-center gap-1 sm:gap-1.5 transition border-2 min-w-0"
                    style={{
                      background: isPicked
                        ? `linear-gradient(135deg, ${palette.hue}, ${palette.hue2})`
                        : "rgba(255,255,255,0.85)",
                      borderColor: isPicked ? palette.hue2 : `${palette.hue}66`,
                      boxShadow: isPicked
                        ? `0 14px 32px -10px ${palette.hue2}99`
                        : "0 6px 18px -8px rgba(201, 54, 101, 0.18)",
                      cursor: confirmed ? "default" : "pointer",
                    }}
                    aria-pressed={isPicked}
                  >
                    {isPicked && (
                      <div
                        className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold"
                        style={{
                          background: "white",
                          color: palette.hue2,
                          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                        }}
                        aria-hidden
                      >
                        ✓
                      </div>
                    )}
                    <div
                      className="flex items-center justify-center"
                      style={{ height: kind === "tulip" ? 58 : 52 }}
                    >
                      <Flower
                        kind={kind}
                        size={kind === "tulip" ? 44 : kind === "sunflower" ? 48 : 50}
                        hue={palette.hue}
                        hue2={palette.hue2}
                        uniqueId={`pick-${kind}`}
                      />
                    </div>
                    <div
                      className="font-serif text-[12px] sm:text-base font-bold leading-tight w-full text-center break-words"
                      style={{ color: isPicked ? "#fff" : "#3a1428" }}
                    >
                      {FLOWER_LABELS[kind]}
                    </div>
                    <div
                      className="hidden sm:block text-[10px] uppercase tracking-[0.2em] font-semibold leading-tight w-full text-center"
                      style={{ color: isPicked ? "rgba(255,255,255,0.9)" : "rgba(74,36,56,0.6)" }}
                    >
                      {tagline}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            <div className="mt-6 sm:mt-8 flex flex-col items-center gap-3">
              <motion.button
                onClick={confirm}
                disabled={picked.size === 0 || confirmed}
                whileHover={picked.size > 0 && !confirmed ? { scale: 1.05 } : undefined}
                whileTap={picked.size > 0 && !confirmed ? { scale: 0.96 } : undefined}
                className="px-7 sm:px-9 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-bold tracking-wide text-white transition disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  background: picked.size > 0
                    ? "linear-gradient(135deg, #ef5577 0%, #c93665 100%)"
                    : "rgba(74, 36, 56, 0.25)",
                  boxShadow: picked.size > 0
                    ? "0 12px 28px -10px rgba(201, 54, 101, 0.55)"
                    : "none",
                }}
              >
                {picked.size === 0
                  ? "pick at least one"
                  : `let them rain ✿  (${picked.size})`}
              </motion.button>

            </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {confirmed && pickedPicks.length > 0 && burstOrigin && (
        <FlowerBurst key="burst" picks={pickedPicks} origin={burstOrigin} />
      )}
    </AnimatePresence>
  );
}
