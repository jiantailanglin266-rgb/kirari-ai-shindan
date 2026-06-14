"use client";

import { motion } from "framer-motion";
import type { DiagnosisResult } from "@/types/diagnosis";
import { Card } from "@/components/ui/card";
import { CircularGauge } from "@/components/CircularGauge";
import { RankBadge } from "@/components/RankBadge";

export function ScoreCard({ result }: { result: DiagnosisResult }) {
  return (
    <Card className="relative overflow-hidden text-center">
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-pink/20 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-12 -left-10 h-44 w-44 rounded-full bg-brand-blue/20 blur-2xl" />

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative text-sm font-bold text-ink-soft"
      >
        総合運勢スコア
      </motion.p>

      <div className="relative mt-2 flex flex-col items-center">
        <CircularGauge value={result.totalScore} label="/ 100" size={208} />
      </div>

      <div className="relative mt-4 flex items-center justify-center gap-4">
        <RankBadge rank={result.rank} label={result.rankLabel} />
        <div className="text-left">
          <p className="text-xs font-bold text-ink-soft">あなたの人相タイプ</p>
          <p className="text-xl font-black text-ink">
            {result.motetypeEmoji} {result.motetype}
          </p>
          <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-black/30 px-2.5 py-0.5 text-[11px] font-black">
            <span className="text-amber-300">
              {"★".repeat(result.rarity.stars)}
            </span>
            <span className="text-ink">
              {result.rarity.label}・出現率{result.rarity.percent}%
            </span>
          </span>
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="relative mt-4 rounded-2xl bg-white/10 px-4 py-3 text-base font-bold text-ink"
      >
        「{result.catchCopy}」
      </motion.p>
    </Card>
  );
}
