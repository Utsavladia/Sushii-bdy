"use client";

import { useEffect, useMemo, useState } from "react";
import {
  FLOWER_PALETTES,
  RoseSVG,
  TulipSVG,
  DaisySVG,
  SunflowerSVG,
  LeafSVG,
} from "@/components/Flower";
import {
  FLOWER_EVENT,
  type FlowerKind,
  getChosenFlowers,
} from "@/lib/flower";

type BloomKind = FlowerKind | "leaf";

type Bloom = {
  kind: BloomKind;
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

function FlowerNode({ b, id }: { b: Bloom; id: number }) {
  if (b.kind === "rose") return <RoseSVG size={b.size} hue={b.hue} hue2={b.hue2} uniqueId={id} />;
  if (b.kind === "tulip") return <TulipSVG size={b.size} hue={b.hue} hue2={b.hue2} uniqueId={id} />;
  if (b.kind === "daisy") return <DaisySVG size={b.size} hue={b.hue} />;
  if (b.kind === "sunflower") return <SunflowerSVG size={b.size} uniqueId={id} />;
  return <LeafSVG size={b.size} />;
}

export default function PetalsBackground({ count: countProp }: { count?: number } = {}) {
  const [mounted, setMounted] = useState(false);
  const [chosen, setChosen] = useState<FlowerKind[]>([]);
  const [seed, setSeed] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    setChosen(getChosenFlowers());
    const updateViewport = () => setIsMobile(window.innerWidth < 640);
    updateViewport();
    window.addEventListener("resize", updateViewport);

    const onChange = (e: Event) => {
      const detail = (e as CustomEvent<FlowerKind[]>).detail;
      setChosen(detail);
      setSeed((s) => s + 1);
    };
    window.addEventListener(FLOWER_EVENT, onChange);
    return () => {
      window.removeEventListener(FLOWER_EVENT, onChange);
      window.removeEventListener("resize", updateViewport);
    };
  }, []);

  // Mobile gets fewer, smaller, more transparent flowers so they don't crowd the UI.
  const count = countProp ?? (isMobile ? 12 : 26);
  const sizeScale = isMobile ? 0.7 : 1;
  const opacityScale = isMobile ? 0.55 : 0.75;

  const blooms = useMemo<Bloom[]>(() => {
    if (!mounted) return [];

    const pickKind = (): BloomKind => {
      if (chosen.length > 0) {
        return chosen[Math.floor(Math.random() * chosen.length)];
      }
      const r = Math.random();
      if (r < 0.42) return "rose";
      if (r < 0.62) return "tulip";
      if (r < 0.78) return "daisy";
      if (r < 0.9) return "sunflower";
      return "leaf";
    };

    // Bias positions toward the edges, away from the center column where the
    // main UI lives. ~75% of flowers land in the outer thirds; 25% center.
    const pickLeft = (): number => {
      const r = Math.random();
      if (r < 0.4) return Math.random() * 25; // left band 0-25%
      if (r < 0.8) return 75 + Math.random() * 25; // right band 75-100%
      return 25 + Math.random() * 50; // center band 25-75%
    };

    return Array.from({ length: count }, () => {
      const kind = pickKind();
      const palette = FLOWER_PALETTES[Math.floor(Math.random() * FLOWER_PALETTES.length)];
      const baseSize =
        kind === "leaf"
          ? 22
          : kind === "daisy"
          ? 24
          : kind === "tulip"
          ? 30
          : kind === "sunflower"
          ? 32
          : 28;
      return {
        kind,
        left: `${pickLeft()}%`,
        size: (baseSize + Math.random() * 14) * sizeScale,
        delay: `${-Math.random() * 22}s`,
        duration: `${20 + Math.random() * 22}s`,
        drift: `${(Math.random() - 0.5) * 220}px`,
        hue: palette.hue,
        hue2: palette.hue2,
        rotation: Math.random() * 360,
        opacity: (0.45 + Math.random() * 0.35) * opacityScale,
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, mounted, chosen, seed, sizeScale, opacityScale]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 overflow-hidden no-select"
      style={{ zIndex: 0 }}
    >
      {blooms.map((b, idx) => (
        <div
          key={`${seed}-${idx}`}
          className="absolute top-0"
          style={{
            left: b.left,
            animation: `drift-down ${b.duration} linear infinite`,
            animationDelay: b.delay,
            ["--drift" as never]: b.drift,
            opacity: b.opacity,
            transform: `rotate(${b.rotation}deg)`,
            filter: "drop-shadow(0 4px 8px rgba(201, 54, 101, 0.14))",
          }}
        >
          <FlowerNode b={b} id={idx} />
        </div>
      ))}
    </div>
  );
}
