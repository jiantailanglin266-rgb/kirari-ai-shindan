"use client";

import { motion } from "framer-motion";
import { CTAButton } from "@/components/CTAButton";
import { BeforeAfterImage } from "@/components/BeforeAfterImage";

/** ネオン看板風の円形エンブレム（人相鑑定 NEON ロゴ）。 */
function NeonEmblem() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[340px]">
      {/* 外周ネオンリング */}
      <div className="absolute inset-0 rounded-full neon-frame animate-[flicker_5s_linear_infinite]" />
      <div className="absolute inset-3 rounded-full border border-brand-blue/40 shadow-[0_0_14px_rgba(34,211,238,0.5)_inset]" />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
        {/* 上部の福顔アイコン */}
        <div className="mb-1 grid h-14 w-14 place-items-center rounded-full border-2 border-brand-pink shadow-[0_0_16px_rgba(255,78,205,0.7)]">
          <span className="text-2xl">🔮</span>
        </div>
        {/* 上部ラベル */}
        <span className="rounded-full border border-brand-purple/60 px-3 py-0.5 text-[10px] font-bold tracking-[0.3em] neon-purple">
          AI 観 相
        </span>
        {/* 中央の大きな漢字 */}
        <h2 className="font-brush mt-1 text-5xl font-black neon-cyan">人相鑑定</h2>
        {/* スクリプト風サブ */}
        <p className="font-brush -mt-1 text-2xl neon-pink">人相学占い</p>
      </div>

      {/* 星の装飾 */}
      <span className="absolute left-6 top-1/3 neon-pink text-sm">✦</span>
      <span className="absolute right-6 top-1/2 neon-cyan text-xs">✧</span>
    </div>
  );
}

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
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 14 }}
        >
          <NeonEmblem />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-6 text-2xl font-black leading-tight text-ink sm:text-3xl"
        >
          AIが顔から、
          <br />
          あなたの<span className="text-gradient">運勢</span>を読み解く。
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16 }}
          className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink-soft sm:text-base"
        >
          顔写真をアップするだけで、東洋の人相学で
          <span className="font-bold text-ink">運勢・人相タイプ・恋愛運・金運・開運ポイント</span>
          を一瞬で鑑定。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22 }}
          className="mt-6 flex flex-col items-center gap-3"
        >
          <CTAButton href="/upload" size="xl" className="w-full max-w-xs">
            無料で鑑定する 🔮
          </CTAButton>
          <p className="text-xs text-ink-soft">
            1日1回無料 / 登録不要 / エンタメ占い
          </p>
        </motion.div>
      </div>

      {/* スマホモック + サンプルカード */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28 }}
        className="relative mx-auto mt-10 w-full max-w-[300px]"
      >
        <div className="relative rounded-[40px] border-[10px] border-[#0f1a26] bg-[#0b141d] p-3 shadow-[var(--shadow-card)]">
          <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-[#0f1a26]" />
          <div className="overflow-hidden rounded-[28px] bg-[#0a121a]">
            {/* 結果カードサンプル */}
            <div
              className="p-5 text-white"
              style={{
                background:
                  "linear-gradient(135deg,#ff4ecd 0%,#b06bff 50%,#22d3ee 100%)",
              }}
            >
              <p className="text-center text-xs font-bold opacity-90">
                総合運勢スコア
              </p>
              <p className="text-center text-5xl font-black leading-none">87</p>
              <div className="mx-auto mt-2 flex w-fit items-center gap-1.5 rounded-full bg-white/25 px-3 py-1 backdrop-blur">
                <span className="font-black">S</span>
                <span className="text-xs font-bold">吉相</span>
              </div>
              <div className="mt-3 rounded-2xl bg-white/20 p-2.5 text-center backdrop-blur">
                <p className="text-lg">🍑</p>
                <p className="text-sm font-black">福相</p>
              </div>
            </div>
            {/* 開運フェイス サンプル */}
            <div className="p-3">
              <BeforeAfterImage
                beforeUrl="/mock/beauty-natural.svg"
                afterUrl="/mock/beauty-kpop.svg"
                rounded="rounded-2xl"
              />
              <p className="mt-2 text-center text-xs font-bold text-ink-soft">
                ← ドラッグで 現在 / 開運フェイス 🔮
              </p>
            </div>
          </div>
        </div>

        {/* 浮遊バッジ */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute -left-4 top-16 rounded-2xl glass-strong px-3 py-2 text-xs font-black neon-pink shadow-lg"
        >
          💗 恋愛運
        </motion.div>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute -right-3 bottom-24 rounded-2xl glass-strong px-3 py-2 text-xs font-black neon-cyan shadow-lg"
        >
          💰 金運
        </motion.div>
      </motion.div>
    </section>
  );
}
