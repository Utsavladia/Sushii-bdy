"use client";

import type { FlowerKind } from "@/lib/flower";

export type FlowerPalette = { hue: string; hue2: string };

export const FLOWER_PALETTES: FlowerPalette[] = [
  { hue: "#ff8aa6", hue2: "#c93665" },
  { hue: "#ffb3c6", hue2: "#ef5577" },
  { hue: "#ffd0e1", hue2: "#ff7a93" },
  { hue: "#e6a4f1", hue2: "#a884e8" },
  { hue: "#dcc4ff", hue2: "#7c5ed3" },
  { hue: "#fff0c2", hue2: "#d4a85a" },
  { hue: "#ffc99d", hue2: "#ef7a52" },
];

function darken(_h: string, alpha = 1) {
  return `rgba(0,0,0,${alpha * 0.18})`;
}

export function RoseSVG({
  size,
  hue,
  hue2,
  uniqueId,
}: {
  size: number;
  hue: string;
  hue2: string;
  uniqueId?: string | number;
}) {
  const gid = `rg-${uniqueId ?? hue.replace(/[^a-zA-Z0-9]/g, "")}`;
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id={gid} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={hue2} />
          <stop offset="60%" stopColor={hue} />
          <stop offset="100%" stopColor={hue} stopOpacity="0.85" />
        </radialGradient>
      </defs>
      <g opacity="0.92">
        {[0, 72, 144, 216, 288].map((rot) => (
          <ellipse
            key={rot}
            cx="30"
            cy="18"
            rx="13"
            ry="17"
            fill={`url(#${gid})`}
            transform={`rotate(${rot} 30 30)`}
          />
        ))}
      </g>
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
      <circle cx="30" cy="30" r="6.5" fill={hue2} />
      <circle cx="30" cy="30" r="3" fill={darken(hue, 1.4)} />
      <ellipse cx="26" cy="26" rx="2" ry="1.4" fill="white" opacity="0.45" />
    </svg>
  );
}

export function TulipSVG({
  size,
  hue,
  hue2,
  uniqueId,
}: {
  size: number;
  hue: string;
  hue2: string;
  uniqueId?: string | number;
}) {
  const gid = `tg-${uniqueId ?? hue.replace(/[^a-zA-Z0-9]/g, "")}`;
  return (
    <svg
      width={size * 0.75}
      height={size * 1.1}
      viewBox="0 0 40 58"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gid} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={hue} />
          <stop offset="100%" stopColor={hue2} />
        </linearGradient>
      </defs>
      <path
        d="M20 36 Q20 50 20 56"
        stroke="#7fa84a"
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
      />
      <path d="M20 50 Q31 44 32 34 Q26 42 20 50 Z" fill="#8cc25a" opacity="0.9" />
      <path d="M20 48 Q10 42 9 32 Q14 41 20 48 Z" fill="#7fb04d" opacity="0.85" />
      <path
        d="M10 30 Q9 8 20 6 Q31 8 30 30 Q26 36 20 36 Q14 36 10 30 Z"
        fill={`url(#${gid})`}
      />
      <path
        d="M14 30 Q14 14 20 12 Q26 14 26 30 Q24 33 20 33 Q16 33 14 30 Z"
        fill={hue2}
        opacity="0.55"
      />
      <ellipse cx="15" cy="20" rx="1.6" ry="5" fill="white" opacity="0.5" />
    </svg>
  );
}

export function SunflowerSVG({
  size,
  uniqueId,
}: {
  size: number;
  uniqueId?: string | number;
}) {
  const gid = `sf-${uniqueId ?? size}`;
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id={gid} cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#ffe27a" />
          <stop offset="100%" stopColor="#f59a2e" />
        </radialGradient>
      </defs>
      {/* Back layer - offset petals */}
      <g opacity="0.7">
        {[15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345].map((rot, i) => (
          <ellipse
            key={i}
            cx="32"
            cy="12"
            rx="4.5"
            ry="11"
            fill="#e8821e"
            transform={`rotate(${rot} 32 32)`}
          />
        ))}
      </g>
      {/* Front petals */}
      <g>
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((rot, i) => (
          <ellipse
            key={i}
            cx="32"
            cy="9"
            rx="5.5"
            ry="13"
            fill={`url(#${gid})`}
            transform={`rotate(${rot} 32 32)`}
          />
        ))}
      </g>
      {/* Brown center */}
      <circle cx="32" cy="32" r="11" fill="#5d3a1a" />
      <circle cx="32" cy="32" r="9" fill="#7a4a23" />
      {/* Seeds (subtle texture) */}
      {[0, 72, 144, 216, 288].map((rot, i) => (
        <circle
          key={i}
          cx="32"
          cy="27"
          r="0.9"
          fill="#3a2208"
          opacity="0.7"
          transform={`rotate(${rot} 32 32)`}
        />
      ))}
      <circle cx="32" cy="32" r="2.5" fill="#3a2208" opacity="0.5" />
      <ellipse cx="29" cy="29" rx="1.6" ry="1" fill="white" opacity="0.25" />
    </svg>
  );
}

export function DaisySVG({ size, hue }: { size: number; hue: string }) {
  return (
    <svg
      width={size * 0.85}
      height={size * 0.85}
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        {[0, 60, 120, 180, 240, 300].map((rot) => (
          <ellipse
            key={rot}
            cx="20"
            cy="9"
            rx="4.5"
            ry="9"
            fill="white"
            stroke="#e8a4b8"
            strokeWidth="0.9"
            transform={`rotate(${rot} 20 20)`}
          />
        ))}
      </g>
      {/* Inner pink-tinged petals for depth */}
      <g opacity="0.55">
        {[30, 90, 150, 210, 270, 330].map((rot) => (
          <ellipse
            key={rot}
            cx="20"
            cy="11"
            rx="3"
            ry="6.5"
            fill="#ffd0e1"
            transform={`rotate(${rot} 20 20)`}
          />
        ))}
      </g>
      <circle cx="20" cy="20" r="5.5" fill="#f5b840" stroke="#c98520" strokeWidth="0.5" />
      <circle cx="20" cy="20" r="3" fill="#a66a18" opacity="0.85" />
      <ellipse cx="18" cy="18.5" rx="1.2" ry="0.8" fill="white" opacity="0.4" />
    </svg>
  );
}

export function LeafSVG({ size }: { size: number }) {
  return (
    <svg
      width={size * 0.9}
      height={size * 0.7}
      viewBox="0 0 40 30"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2 20 Q14 -2 38 6 Q30 24 8 28 Q2 24 2 20 Z" fill="#8cc25a" opacity="0.7" />
      <path
        d="M6 22 Q18 14 34 12"
        stroke="#7fa84a"
        strokeWidth="1"
        fill="none"
        opacity="0.6"
      />
    </svg>
  );
}

type FlowerProps = {
  kind: FlowerKind;
  size?: number;
  hue?: string;
  hue2?: string;
  uniqueId?: string | number;
};

/** Generic flower component. Pass kind + optional palette. */
export function Flower({ kind, size = 40, hue, hue2, uniqueId }: FlowerProps) {
  const p =
    hue && hue2 ? { hue, hue2 } : FLOWER_PALETTES[0];
  if (kind === "rose") return <RoseSVG size={size} hue={p.hue} hue2={p.hue2} uniqueId={uniqueId} />;
  if (kind === "tulip") return <TulipSVG size={size} hue={p.hue} hue2={p.hue2} uniqueId={uniqueId} />;
  if (kind === "daisy") return <DaisySVG size={size} hue={p.hue} />;
  if (kind === "sunflower") return <SunflowerSVG size={size} uniqueId={uniqueId} />;
  return null;
}
