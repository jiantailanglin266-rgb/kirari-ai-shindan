"use client";

import { motion } from "framer-motion";
import { CTAButton } from "@/components/CTAButton";
import { asset } from "@/lib/asset";

/** ネオン発光＋グリングリン回転する人相鑑定エンブレム。 */
function NeonEmblem() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[340px]">
      {/* グリングリン回る発光ハロー（背面） */}
      <div
        className="absolute -inset-6 rounded-full opacity-70 blur-2xl animate-[spin_12s_linear_infinite] motion-reduce:animate-none"
        style={{
          background:
            "conic-gradient(from 0deg,#00eaff,#b14bff,#ff2bd6,#00eaff)",
        }}
        aria-hidden
      />
      {/* 逆回転の細いネオンリング */}
      <div
        className="absolute -inset-1 rounded-full opacity-80 animate-[spin_18s_linear_infinite_reverse] motion-reduce:animate-none"
        style={{
          background:
            "conic-gradient(from 90deg,transparent 0deg,#00eaff 40deg,transparent 120deg,#ff2bd6 200deg,transparent 280deg,#b14bff 330deg,transparent 360deg)",
          WebkitMask:
            "radial-gradient(farthest-side,transparent calc(100% - 5px),#000 calc(100% - 4px))",
          mask: "radial-gradient(farthest-side,transparent calc(100% - 5px),#000 calc(100% - 4px))",
        }}
        aria-hidden
      />

      {/* エンブレム画像（ネオン発光パルス＋ゆらぎ） */}
      <motion.div
        className="relative z-10 h-full w-full animate-[neonpulse_3.6s_ease-in-out_infinite] motion-reduce:animate-none"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset("/hero-emblem.webp")}
          width={760}
          height={608}
          alt="人相鑑定 NEON — 人相学占いのネオンエンブレム"
          className="h-full w-full select-none rounded-full object-cover"
          draggable={false}
          fetchPriority="high"
        />
      </motion.div>

      {/* 周回するスパークル（グリングリン感） */}
      <div className="pointer-events-none absolute inset-0 animate-[spin_22s_linear_infinite] motion-reduce:animate-none">
        <span className="absolute left-1/2 top-0 -translate-x-1/2 neon-cyan text-lg">
          ✦
        </span>
        <span className="absolute bottom-2 right-6 neon-pink text-sm">✧</span>
        <span className="absolute left-4 top-1/2 neon-purple text-xs">✦</span>
      </div>
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
            完全無料 / 何回でもOK / 登録不要 / エンタメ占い
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
                  "linear-gradient(135deg,#ff2bd6 0%,#b14bff 50%,#00eaff 100%)",
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
            {/* 詳細運勢サンプル */}
            <div className="space-y-2.5 p-4">
              {[
                { label: "恋愛運", v: 88 },
                { label: "金運", v: 76 },
                { label: "仕事運", v: 82 },
              ].map((s) => (
                <div key={s.label}>
                  <div className="flex items-center justify-between text-[11px] font-bold text-ink">
                    <span>{s.label}</span>
                    <span className="text-gradient">{s.v}</span>
                  </div>
                  <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-brand-purple/15">
                    <div
                      className="h-full rounded-full bg-brand-gradient"
                      style={{ width: `${s.v}%` }}
                    />
                  </div>
                </div>
              ))}
              <p className="pt-1 text-center text-[11px] font-bold text-ink-soft">
                8つの運をまるごと鑑定 🔮
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
