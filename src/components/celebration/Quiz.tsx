"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import confetti from "canvas-confetti";
import { content } from "@/content";
import SectionHeader from "@/components/SectionHeader";

export default function Quiz() {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = content.quiz[idx];

  const pick = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === q.answer) {
      setScore((s) => s + 1);
      confetti({
        particleCount: 50,
        spread: 60,
        startVelocity: 35,
        origin: { y: 0.6 },
        colors: ["#ef5577", "#a884e8", "#d4a85a", "#ffc9d4"],
      });
    }
    setTimeout(() => {
      if (idx + 1 >= content.quiz.length) {
        setDone(true);
      } else {
        setIdx(idx + 1);
        setPicked(null);
      }
    }, 1200);
  };

  return (
    <section className="relative py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <SectionHeader
          eyebrow="just for fun"
          title={content.quizTitle}
          intro={content.quizIntro}
          variant="gold"
          icon="star"
        />

        <div className="glass-strong rounded-3xl p-8 md:p-12 min-h-[400px] flex flex-col">
          {!done ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.45 }}
                className="flex-1 flex flex-col"
              >
                <div className="text-xs uppercase tracking-[0.35em] mb-4 text-mid font-semibold">
                  question {idx + 1} of {content.quiz.length}
                </div>
                <h3 className="font-serif text-2xl md:text-4xl mb-10 text-strong leading-snug font-semibold">
                  {q.question}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
                  {q.options.map((opt, i) => {
                    const isAnswer = picked !== null && i === q.answer;
                    const isWrong = picked === i && i !== q.answer;
                    return (
                      <button
                        key={i}
                        onClick={() => pick(i)}
                        disabled={picked !== null}
                        className={`group relative rounded-2xl p-5 md:p-6 text-left transition border-2 font-medium ${
                          isAnswer
                            ? "border-rose-400"
                            : isWrong
                            ? "border-purple-300"
                            : "border-white"
                        }`}
                        style={{
                          background: isAnswer
                            ? "linear-gradient(135deg, #ff96ad, #c93665)"
                            : isWrong
                            ? "linear-gradient(135deg, #ede0ff, #dcc4ff)"
                            : "rgba(255, 255, 255, 0.85)",
                          color: isAnswer ? "#ffffff" : "#3a1428",
                          cursor: picked !== null ? "default" : "pointer",
                          boxShadow: isAnswer
                            ? "0 12px 28px -8px rgba(201, 54, 101, 0.55)"
                            : "0 4px 14px -4px rgba(201, 54, 101, 0.12)",
                        }}
                      >
                        <span className="font-serif text-lg md:text-xl font-semibold">{opt}</span>
                        {isAnswer && <span className="ml-2 text-xl">♡</span>}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex flex-col items-center justify-center text-center gap-4"
            >
              <div className="font-serif text-7xl md:text-8xl font-bold" style={{ color: "#a82654" }}>
                {score}<span className="text-4xl md:text-5xl text-mid font-normal">/{content.quiz.length}</span>
              </div>
              <p className="font-script text-3xl md:text-4xl text-strong max-w-xl">
                {score === content.quiz.length
                  ? "perfect — you really do know us ♡"
                  : score >= Math.ceil(content.quiz.length / 2)
                  ? "almost everything — close enough to my heart ♡"
                  : "doesn't matter. you'll always be my favourite answer."}
              </p>
              <button
                onClick={() => {
                  setIdx(0);
                  setPicked(null);
                  setScore(0);
                  setDone(false);
                }}
                className="mt-6 px-5 py-2 text-sm uppercase tracking-[0.25em] rounded-full font-semibold border-2 transition hover:scale-105"
                style={{ borderColor: "#c93665", color: "#a82654" }}
              >
                play again
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
