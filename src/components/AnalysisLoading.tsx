"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { analyzeFace } from "@/lib/ai/analyzeFace";
import { loadImage, loadFocus, saveResult } from "@/lib/store";

const STEPS = [
  "顔の輪郭と各パーツを読み取り中…",
  "目・鼻・口から運勢を観相中…",
  "人相タイプを鑑定中…",
  "総合運勢スコアを算出中…",
  "開運ポイントを抽出中…",
];

const STEP_MS = 1100;

export function AnalysisLoading() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const image = loadImage();
    if (!image) {
      router.replace("/upload");
      return;
    }
    const focus = loadFocus();

    // ステップ演出
    const timers: ReturnType<typeof setTimeout>[] = [];
    STEPS.forEach((_, i) => {
      timers.push(setTimeout(() => setStep(i), i * STEP_MS));
    });

    const minDuration = STEPS.length * STEP_MS;

    // 解析（モック）と最低演出時間を両立
    Promise.all([
      analyzeFace({ image, focus }),
      new Promise((r) => setTimeout(r, minDuration)),
    ]).then(([result]) => {
      saveResult(result);
      router.replace("/result");
    });

    return () => timers.forEach(clearTimeout);
  }, [router]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      {/* スキャン演出 */}
      <div className="relative mb-10 h-44 w-44">
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-brand-purple/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-2 rounded-full border-t-4 border-brand-pink"
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-6 rounded-full bg-brand-gradient"
          animate={{ scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />
        <div className="absolute inset-0 grid place-items-center">
          <motion.span
            className="text-5xl"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          >
            ✨
          </motion.span>
        </div>
        {/* スキャンライン */}
        <motion.div
          className="absolute inset-6 overflow-hidden rounded-full"
          aria-hidden
        >
          <motion.div
            className="absolute left-0 right-0 h-8 bg-white/5 blur-md"
            animate={{ top: ["-20%", "120%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>

      <h1 className="text-xl font-black text-ink">AIがあなたの人相を鑑定中</h1>

      {/* ステップ表示 */}
      <div className="mt-6 w-full max-w-sm space-y-2.5">
        {STEPS.map((s, i) => {
          const state = i < step ? "done" : i === step ? "active" : "todo";
          return (
            <motion.div
              key={s}
              className="flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-2.5 text-left"
              animate={{
                opacity: state === "todo" ? 0.5 : 1,
                scale: state === "active" ? 1.02 : 1,
              }}
            >
              <span
                className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-white"
                style={{
                  background:
                    state === "todo"
                      ? "rgba(167,139,250,0.25)"
                      : "linear-gradient(100deg,#ff6fb5,#a78bfa)",
                }}
              >
                {state === "done" ? (
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                ) : state === "active" ? (
                  <motion.span
                    className="block h-2 w-2 rounded-full bg-white"
                    animate={{ scale: [1, 1.6, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                ) : null}
              </span>
              <span className="text-sm font-bold text-ink">{s}</span>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        <motion.p
          key={step}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 text-sm text-ink-soft"
        >
          {STEPS[Math.min(step, STEPS.length - 1)]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
