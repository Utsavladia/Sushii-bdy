"use client";

import { useEffect, useMemo, useState } from "react";

type Bloom = {
  kind: "rose" | "tulip" | "daisy" | "leaf";
  left: string;
  size: number;
  delay: string;
  duration: string;
  drift: string;
  hue: string;
  hue2: string;
  rotation: number;
  opacity: number;
};

const PALETTE: { hue: string; hue2: string }[] = [
  { hue: "#ff8aa6", hue2: "#c93665" }, // rose pink
  { hue: "#ffb3c6", hue2: "#ef5577" }, // soft pink
  { hue: "#ffd0e1", hue2: "#ff7a93" }, // blush
  { hue: "#e6a4f1", hue2: "#a884e8" }, // lavender
  { hue: "#dcc4ff", hue2: "#7c5ed3" }, // lilac
  { hue: "#fff0c2", hue2: "#d4a85a" }, // cream gold
  { hue: "#ffc99d", hue2: "#ef7a52" }, // peach
];

function darken(_h: string, alpha = 1) {
  return `rgba(0,0,0,${alpha * 0.18})`;
}

function RoseSVG({ size, hue, hue2 }: { size: number; hue: string; hue2: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id={`rg-${hue}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={hue2} />
          <stop offset="60%" stopColor={hue} />
          <stop offset="100%" stopColor={hue} stopOpacity="0.85" />
        </radialGradient>
      </defs>
      {/* 5 outer petals (rotated ellipses) */}
      <g opacity="0.92">
        {[0, 72, 144, 216, 288].map((rot) => (
          <ellipse
            key={rot}
            cx="30"
            cy="18"
            rx="13"
            ry="17"
            fill={`url(#rg-${hue})`}
            transform={`rotate(${rot} 30 30)`}
          />
        ))}
      </g>
      {/* Inner offset petals */}
      <g opacity="0.95">
        {[36, 108, 180, 252, 324].map((rot) => (
          <ellipse
            key={rot}
            cx="30"
            cy="22"
            rx="8"
            ry="11"
            fill={hue2}
            transform={`rotate(${rot} 30 30)`}
          />
        ))}
      </g>
      {/* Center bud */}
      <circle cx="30" cy="30" r="6.5" fill={hue2} />
      <circle cx="30" cy="30" r="3" fill={darken(hue, 1.4)} />
      {/* Highlight */}
      <ellipse cx="26" cy="26" rx="2" ry="1.4" fill="white" opacity="0.45" />
    </svg>
  );
}

function TulipSVG({ size, hue, hue2 }: { size: number; hue: string; hue2: string }) {
  return (
    <svg width={size * 0.75} height={size * 1.1} viewBox="0 0 40 58" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`tg-${hue}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={hue} />
          <stop offset="100%" stopColor={hue2} />
        </linearGradient>
      </defs>
      {/* Stem */}
      <path d="M20 36 Q20 50 20 56" stroke="#7fa84a" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      {/* Leaf */}
      <path d="M20 50 Q31 44 32 34 Q26 42 20 50 Z" fill="#8cc25a" opacity="0.9" />
      <path d="M20 48 Q10 42 9 32 Q14 41 20 48 Z" fill="#7fb04d" opacity="0.85" />
      {/* Outer cup */}
      <path
        d="M10 30 Q9 8 20 6 Q31 8 30 30 Q26 36 20 36 Q14 36 10 30 Z"
        fill={`url(#tg-${hue})`}
      />
      {/* Inner front petal */}
      <path
        d="M14 30 Q14 14 20 12 Q26 14 26 30 Q24 33 20 33 Q16 33 14 30 Z"
        fill={hue2}
        opacity="0.55"
      />
      {/* Highlight */}
      <ellipse cx="15" cy="20" rx="1.6" ry="5" fill="white" opacity="0.5" />
    </svg>
  );
}

function DaisySVG({ size, hue }: { size: number; hue: string }) {
  return (
    <svg width={size * 0.85} height={size * 0.85} viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      {/* 6 white petals */}
      <g opacity="0.95">
        {[0, 60, 120, 180, 240, 300].map((rot) => (
          <ellipse
            key={rot}
            cx="20"
            cy="9"
            rx="4.5"
            ry="9"
            fill="white"
            transform={`rotate(${rot} 20 20)`}
          />
        ))}
      </g>
      {/* center */}
      <circle cx="20" cy="20" r="5" fill={hue} />
      <circle cx="20" cy="20" r="3" fill="#d4a85a" opacity="0.85" />
    </svg>
  );
}

function LeafSVG({ size }: { size: number }) {
  return (
    <svg width={size * 0.9} height={size * 0.7} viewBox="0 0 40 30" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2 20 Q14 -2 38 6 Q30 24 8 28 Q2 24 2 20 Z"
        fill="#8cc25a"
        opacity="0.7"
      />
      <path d="M6 22 Q18 14 34 12" stroke="#7fa84a" strokeWidth="1" fill="none" opacity="0.6" />
    </svg>
  );
}

function FlowerNode({ b }: { b: Bloom }) {
  if (b.kind === "rose") return <RoseSVG size={b.size} hue={b.hue} hue2={b.hue2} />;
  if (b.kind === "tulip") return <TulipSVG size={b.size} hue={b.hue} hue2={b.hue2} />;
  if (b.kind === "daisy") return <DaisySVG size={b.size} hue={b.hue} />;
  return <LeafSVG size={b.size} />;
}

export default function PetalsBackground({ count = 28 }: { count?: number }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const blooms = useMemo<Bloom[]>(() => {
    if (!mounted) return [];
    // Mix: ~50% roses, ~25% tulips, ~15% daisies, ~10% leaves
    const kinds: Bloom["kind"][] = [];
    for (let i = 0; i < count; i++) {
      const r = Math.random();
      if (r < 0.5) kinds.push("rose");
      else if (r < 0.75) kinds.push("tulip");
      else if (r < 0.9) kinds.push("daisy");
      else kinds.push("leaf");
    }
    return kinds.map((kind, i) => {
      const palette = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      const baseSize = kind === "leaf" ? 22 : kind === "daisy" ? 24 : kind === "tulip" ? 30 : 28;
      return {
        kind,
        left: `${Math.random() * 100}%`,
        size: baseSize + Math.random() * 16,
        delay: `${-Math.random() * 22}s`,
        duration: `${18 + Math.random() * 20}s`,
        drift: `${(Math.random() - 0.5) * 240}px`,
        hue: palette.hue,
        hue2: palette.hue2,
        rotation: Math.random() * 360,
        opacity: 0.55 + Math.random() * 0.35,
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, mounted]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 overflow-hidden no-select"
      style={{ zIndex: 0 }}
    >
      {blooms.map((b, idx) => (
        <div
          key={idx}
          className="absolute top-0"
          style={{
            left: b.left,
            animation: `drift-down ${b.duration} linear infinite`,
            animationDelay: b.delay,
            ["--drift" as never]: b.drift,
            opacity: b.opacity,
            transform: `rotate(${b.rotation}deg)`,
            filter: "drop-shadow(0 6px 12px rgba(201, 54, 101, 0.18))",
          }}
        >
          <FlowerNode b={b} />
        </div>
      ))}
    </div>
  );
}
