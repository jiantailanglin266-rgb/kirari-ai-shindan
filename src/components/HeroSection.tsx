"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { CTAButton } from "@/components/CTAButton";
import { BeforeAfterImage } from "@/components/BeforeAfterImage";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pt-8 pb-12">
      {/* 背景の浮遊する光 */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[8%] top-10 h-24 w-24 rounded-full bg-brand-pink/30 blur-2xl animate-[float_6s_ease-in-out_infinite]" />
        <div className="absolute right-[10%] top-24 h-28 w-28 rounded-full bg-brand-blue/30 blur-2xl animate-[float_7s_ease-in-out_infinite]" />
        <div className="absolute bottom-10 left-1/3 h-32 w-32 rounded-full bg-brand-purple/25 blur-3xl animate-[float_8s_ease-in-out_infinite]" />
      </div>

      <div className="mx-auto max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full glass-strong px-4 py-1.5 text-xs font-bold text-brand-purple"
        >
          <Sparkles className="h-3.5 w-3.5" />
          近未来AI × あなたの“盛れ顔”診断
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="text-3xl font-black leading-tight text-ink sm:text-4xl"
        >
          AIがあなたの魅力を診断。
          <br />
          未来の<span className="text-gradient">“盛れ顔”</span>まで生成。
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink-soft sm:text-base"
        >
          顔写真をアップするだけで、モテタイプ・顔面偏差値・垢抜けポイント・AI美化画像を
          <span className="font-bold text-ink">一瞬でレポート化</span>。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          className="mt-6 flex flex-col items-center gap-3"
        >
          <CTAButton href="/upload" size="xl" className="w-full max-w-xs">
            無料で診断する ✨
          </CTAButton>
          <p className="text-xs text-ink-soft">
            1日1回無料 / 登録不要 / エンタメ診断
          </p>
        </motion.div>
      </div>

      {/* スマホモック + サンプルカード */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="relative mx-auto mt-10 w-full max-w-[300px]"
      >
        <div className="relative rounded-[40px] border-[10px] border-white bg-white/70 p-3 shadow-[var(--shadow-card)]">
          <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-white" />
          <div className="overflow-hidden rounded-[28px] bg-white">
            {/* 結果カードサンプル */}
            <div
              className="p-5 text-white"
              style={{
                background:
                  "linear-gradient(135deg,#ff8fc7 0%,#a78bfa 50%,#6aa8ff 100%)",
              }}
            >
              <p className="text-center text-xs font-bold opacity-90">
                顔面魅力度スコア
              </p>
              <p className="text-center text-5xl font-black leading-none">87</p>
              <div className="mx-auto mt-2 flex w-fit items-center gap-1.5 rounded-full bg-white/25 px-3 py-1 backdrop-blur">
                <span className="font-black">S</span>
                <span className="text-xs font-bold">モデル級</span>
              </div>
              <div className="mt-3 rounded-2xl bg-white/20 p-2.5 text-center backdrop-blur">
                <p className="text-lg">🌟</p>
                <p className="text-sm font-black">韓国俳優系モテ顔</p>
              </div>
            </div>
            {/* Before/After サンプル */}
            <div className="p-3">
              <BeforeAfterImage
                beforeUrl="/mock/beauty-natural.svg"
                afterUrl="/mock/beauty-kpop.svg"
                rounded="rounded-2xl"
              />
              <p className="mt-2 text-center text-xs font-bold text-ink-soft">
                ← ドラッグで Before / After ✨
              </p>
            </div>
          </div>
        </div>

        {/* 浮遊バッジ */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute -left-4 top-16 rounded-2xl glass-strong px-3 py-2 text-xs font-black text-brand-purple shadow-lg"
        >
          💗 モテ診断
        </motion.div>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute -right-3 bottom-24 rounded-2xl glass-strong px-3 py-2 text-xs font-black text-brand-pink shadow-lg"
        >
          🚀 3年後の自分
        </motion.div>
      </motion.div>
    </section>
  );
}
