"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function LockedGift() {
  const [shake, setShake] = useState(0);

  return (
    <button
      onClick={() => setShake((s) => s + 1)}
      aria-label="Locked gift"
      className="relative group"
    >
      <motion.div
        key={shake}
        initial={{ rotate: 0 }}
        animate={
          shake > 0
            ? { rotate: [0, -8, 8, -6, 6, -3, 3, 0] }
            : { rotate: 0 }
        }
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="relative w-44 h-44 md:w-56 md:h-56 mx-auto"
      >
        {/* Box body */}
        <div className="absolute inset-x-0 bottom-0 h-[65%] rounded-2xl glow-pink"
          style={{
            background: "linear-gradient(180deg, #ff7a93 0%, #c93665 100%)",
            boxShadow: "inset 0 -8px 22px rgba(0,0,0,0.18), 0 18px 40px -10px rgba(201, 54, 101, 0.45)",
          }}
        />
        {/* Vertical ribbon */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-7 md:w-9 h-[65%]"
          style={{ background: "linear-gradient(180deg, #f3dca0, #d4a85a)" }}
        />
        {/* Lid */}
        <div className="absolute inset-x-[-6%] top-[26%] h-[18%] rounded-xl"
          style={{
            background: "linear-gradient(180deg, #ff96ad 0%, #ef5577 100%)",
            boxShadow: "0 10px 22px -8px rgba(201, 54, 101, 0.55)",
          }}
        />
        {/* Lid ribbon */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[24%] w-7 md:w-9 h-[22%]"
          style={{ background: "linear-gradient(180deg, #f3dca0, #d4a85a)" }}
        />
        {/* Bow */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[8%] flex">
          <div className="w-9 h-9 md:w-12 md:h-12 rounded-full"
            style={{ background: "radial-gradient(circle at 30% 30%, #f8e3a6, #d4a85a)" }}
          />
          <div className="w-9 h-9 md:w-12 md:h-12 rounded-full -ml-3"
            style={{ background: "radial-gradient(circle at 30% 30%, #f8e3a6, #d4a85a)" }}
          />
        </div>
        {/* Padlock */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[42%] w-12 h-12 md:w-14 md:h-14 rounded-md flex items-center justify-center"
          style={{ background: "linear-gradient(180deg, #fff3d9, #d4a85a)", boxShadow: "0 4px 10px rgba(0,0,0,0.2)" }}
        >
          <span className="text-2xl">🔒</span>
        </div>
      </motion.div>

      <p className="mt-6 text-xs md:text-sm tracking-[0.3em] uppercase font-bold text-mid">
        tap me, but don&apos;t peek
      </p>
    </button>
  );
}
