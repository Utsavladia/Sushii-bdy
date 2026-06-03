"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export type SectionVariant = "rose" | "lavender" | "gold" | "peach" | "blush";

type Props = {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  variant?: SectionVariant;
  icon?: "heart" | "flower" | "letter" | "gift" | "star" | "ribbon";
};

const PALETTES: Record<
  SectionVariant,
  { bow: string; bowDark: string; ribbon: string; glow: string; tagBg: string }
> = {
  rose: {
    bow: "#ef5577",
    bowDark: "#c93665",
    ribbon: "#a82654",
    glow: "rgba(239, 85, 119, 0.28)",
    tagBg: "linear-gradient(180deg, rgba(255,255,255,0.97), rgba(255,232,238,0.95))",
  },
  lavender: {
    bow: "#a884e8",
    bowDark: "#7c5ed3",
    ribbon: "#5a3da8",
    glow: "rgba(168, 132, 232, 0.28)",
    tagBg: "linear-gradient(180deg, rgba(255,255,255,0.97), rgba(237,224,255,0.95))",
  },
  gold: {
    bow: "#d4a85a",
    bowDark: "#a88444",
    ribbon: "#6f5018",
    glow: "rgba(212, 168, 90, 0.28)",
    tagBg: "linear-gradient(180deg, rgba(255,255,255,0.97), rgba(255,243,217,0.95))",
  },
  peach: {
    bow: "#ff9d7a",
    bowDark: "#e07b54",
    ribbon: "#a64d2c",
    glow: "rgba(255, 157, 122, 0.28)",
    tagBg: "linear-gradient(180deg, rgba(255,255,255,0.97), rgba(255,232,217,0.95))",
  },
  blush: {
    bow: "#ffa7b8",
    bowDark: "#ef5577",
    ribbon: "#c93665",
    glow: "rgba(255, 167, 184, 0.28)",
    tagBg: "linear-gradient(180deg, rgba(255,255,255,0.97), rgba(255,222,232,0.95))",
  },
};

function Icon({ kind, color }: { kind: NonNullable<Props["icon"]>; color: string }) {
  const common = { width: 22, height: 22, viewBox: "0 0 24 24" as const };
  if (kind === "heart") {
    return (
      <svg {...common} fill={color}>
        <path d="M12 21s-7-4.5-9.5-9C.5 7.5 4 3 8 4.5 10 5.2 11.2 6.7 12 8c.8-1.3 2-2.8 4-3.5 4-1.5 7.5 3 5.5 7.5C19 16.5 12 21 12 21Z" />
      </svg>
    );
  }
  if (kind === "flower") {
    return (
      <svg {...common}>
        {[0, 72, 144, 216, 288].map((r) => (
          <ellipse key={r} cx="12" cy="6" rx="3.2" ry="5" fill={color} transform={`rotate(${r} 12 12)`} />
        ))}
        <circle cx="12" cy="12" r="2.6" fill="#d4a85a" />
      </svg>
    );
  }
  if (kind === "letter") {
    return (
      <svg {...common} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="6" width="18" height="14" rx="2" />
        <path d="M3 7l9 7 9-7" />
      </svg>
    );
  }
  if (kind === "gift") {
    return (
      <svg {...common} fill={color}>
        <path d="M3 9h18v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9Z" opacity="0.85" />
        <path d="M2 6h20v3H2z" />
        <path d="M11 6v15M12 6c-2-4-5-2-5 0s3 0 5 0Zm0 0c2-4 5-2 5 0s-3 0-5 0Z" stroke="#fff" strokeWidth="1.4" fill="none" />
      </svg>
    );
  }
  if (kind === "star") {
    return (
      <svg {...common} fill={color}>
        <path d="M12 2l2.6 6.3L21 9l-5 4.4 1.6 7-5.6-3.6L6.4 20.4 8 13.4 3 9l6.4-.7L12 2Z" />
      </svg>
    );
  }
  return (
    <svg {...common} fill={color}>
      <path d="M2 8c4 4 8 4 10 0 2 4 6 4 10 0v6c-4 4-8 4-10 0-2 4-6 4-10 0V8Z" opacity="0.9" />
    </svg>
  );
}

export default function SectionHeader({ eyebrow, title, intro, variant = "rose", icon = "heart" }: Props) {
  const c = PALETTES[variant];
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center mb-14 relative"
    >
      {/* Hanging string above */}
      <div
        className="mx-auto w-[2px] h-12 mb-1 rounded-full"
        style={{
          background: `linear-gradient(180deg, transparent 0%, ${c.ribbon}aa 80%, ${c.ribbon} 100%)`,
        }}
        aria-hidden
      />

      {/* Bow tied at the top of the tag */}
      <svg
        className="mx-auto -mt-2 relative z-10"
        width="64"
        height="38"
        viewBox="0 0 64 38"
        aria-hidden
      >
        <ellipse cx="18" cy="19" rx="14" ry="11" fill={c.bow} />
        <ellipse cx="46" cy="19" rx="14" ry="11" fill={c.bow} />
        <ellipse cx="18" cy="19" rx="7" ry="5" fill="white" opacity="0.32" />
        <ellipse cx="46" cy="19" rx="7" ry="5" fill="white" opacity="0.32" />
        <rect x="26" y="11" width="12" height="22" rx="3" fill={c.bowDark} />
        <line x1="32" y1="32" x2="24" y2="38" stroke={c.bowDark} strokeWidth="3" strokeLinecap="round" />
        <line x1="32" y1="32" x2="40" y2="38" stroke={c.bowDark} strokeWidth="3" strokeLinecap="round" />
      </svg>

      {/* Tag body */}
      <div
        className="inline-block px-7 md:px-10 py-5 md:py-6 rounded-2xl relative -mt-3 max-w-3xl"
        style={{
          background: c.tagBg,
          border: `2px solid ${c.bow}44`,
          boxShadow: `0 20px 50px -18px ${c.glow}, inset 0 1px 0 rgba(255,255,255,1)`,
        }}
      >
        {/* Punched hole top center */}
        <div
          aria-hidden
          className="absolute left-1/2 -translate-x-1/2 -top-2 w-3 h-3 rounded-full"
          style={{
            background: "#fff",
            border: `2px solid ${c.bowDark}`,
            boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)",
          }}
        />

        <div className="flex items-center justify-center gap-2 mb-2">
          <span style={{ color: c.bowDark }}><Icon kind={icon} color={c.bowDark} /></span>
          <span
            className="text-[11px] uppercase tracking-[0.4em] font-bold"
            style={{ color: c.ribbon }}
          >
            {eyebrow}
          </span>
          <span style={{ color: c.bowDark }}><Icon kind={icon} color={c.bowDark} /></span>
        </div>
        <h2 className="font-script text-5xl md:text-6xl shimmer-text leading-tight">{title}</h2>
      </div>

      {intro && (
        <p className="mt-5 font-serif italic text-lg md:text-xl text-mid">
          {intro}
        </p>
      )}
    </motion.div>
  );
}
