"use client";

import { useEffect, useState } from "react";
import { getRemaining, type Remaining } from "@/lib/time";

function Cell({ value, label }: { value: number; label: string }) {
  const padded = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center min-w-0 flex-1">
      <div className="glass-strong rounded-xl sm:rounded-2xl w-full px-1.5 py-3 sm:px-4 sm:py-5 md:px-7 md:py-7 text-center">
        <div
          className="font-serif text-[28px] leading-none sm:text-5xl md:text-6xl font-bold tracking-tight"
          style={{ color: "#a82654" }}
        >
          {padded}
        </div>
      </div>
      <div className="mt-2 sm:mt-3 text-[9px] sm:text-[11px] md:text-xs uppercase tracking-[0.18em] sm:tracking-[0.3em] font-semibold text-mid">
        {label}
      </div>
    </div>
  );
}

export default function CountdownTimer({ onUnlock }: { onUnlock?: () => void }) {
  const [r, setR] = useState<Remaining | null>(null);

  useEffect(() => {
    const tick = () => {
      const next = getRemaining();
      setR(next);
      if (next.unlocked) onUnlock?.();
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [onUnlock]);

  if (!r) {
    return <div className="h-32" />;
  }

  return (
    <div className="flex items-end gap-1 sm:gap-2 md:gap-4 justify-center select-none w-full max-w-sm sm:max-w-md md:max-w-xl mx-auto">
      <Cell value={r.days} label="days" />
      <span
        className="font-serif text-xl sm:text-3xl md:text-5xl pb-4 sm:pb-7 md:pb-8 font-bold"
        style={{ color: "rgba(168, 38, 84, 0.45)" }}
      >
        :
      </span>
      <Cell value={r.hours} label="hours" />
      <span
        className="font-serif text-xl sm:text-3xl md:text-5xl pb-4 sm:pb-7 md:pb-8 font-bold"
        style={{ color: "rgba(168, 38, 84, 0.45)" }}
      >
        :
      </span>
      <Cell value={r.minutes} label="minutes" />
      <span
        className="font-serif text-xl sm:text-3xl md:text-5xl pb-4 sm:pb-7 md:pb-8 font-bold"
        style={{ color: "rgba(168, 38, 84, 0.45)" }}
      >
        :
      </span>
      <Cell value={r.seconds} label="seconds" />
    </div>
  );
}
