"use client";

import { motion } from "framer-motion";
import Photo from "@/components/Photo";
import SectionHeader from "@/components/SectionHeader";
import { content } from "@/content";

export default function MemoryLane() {
  return (
    <section className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="our story"
          title={content.photosTitle}
          intro={content.photosIntro}
          variant="rose"
          icon="flower"
        />

        {/* Masonry — each photo keeps its natural aspect ratio */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 md:gap-8 [&>*]:mb-6 md:[&>*]:mb-8">
          {content.photos.map((p, i) => {
            const tilt = i % 2 === 0 ? -1.2 : 1.2;
            return (
              <motion.figure
                key={i}
                initial={{ rotate: tilt }}
                whileHover={{ rotate: 0, scale: 1.02, y: -4, transition: { duration: 0.3 } }}
                className="break-inside-avoid relative rounded-3xl glass-strong p-3 md:p-4"
                style={{
                  boxShadow:
                    "0 24px 60px -20px rgba(201, 54, 101, 0.35), 0 4px 14px -2px rgba(201,54,101,0.12)",
                  transform: `rotate(${tilt}deg)`,
                }}
              >
                {/* Number badge */}
                <div
                  className="absolute -top-3 -right-3 z-10 w-11 h-11 rounded-full flex items-center justify-center font-serif text-base font-semibold"
                  style={{
                    background: "linear-gradient(135deg, #ffe7b3, #d4a85a)",
                    color: "#3a1428",
                    boxShadow: "0 6px 14px -4px rgba(212, 168, 90, 0.6)",
                    border: "2px solid #fff",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* Polaroid tape (top-left) */}
                <div
                  className="absolute -top-3 left-8 w-16 h-5 rotate-[-6deg] rounded-sm opacity-80"
                  style={{ background: "rgba(255, 195, 215, 0.75)" }}
                />

                <div className="rounded-2xl overflow-hidden">
                  <Photo src={p.src} alt={p.caption} index={i} className="block w-full h-auto" />
                </div>

                <figcaption className="px-2 pt-4 pb-2 text-center">
                  <p className="font-script text-2xl md:text-3xl text-strong leading-snug">
                    {p.caption}
                  </p>
                </figcaption>
              </motion.figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
