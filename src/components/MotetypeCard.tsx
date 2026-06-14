"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import type { DiagnosisResult } from "@/types/diagnosis";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export function MotetypeCard({ result }: { result: DiagnosisResult }) {
  const love = result.loveReport;
  const rows: { label: string; value: string }[] = [
    { label: "第一印象", value: love.firstImpression },
    { label: "異性から見た魅力", value: love.oppositeSexImpression },
    { label: "マッチングアプリ映え", value: love.datingAppScore },
    { label: "本命にされやすさ", value: love.seriousLovePotential },
    { label: "話しかけやすさ", value: love.approachability },
    { label: "ギャップ魅力", value: love.gapCharm },
  ];

  return (
    <Card>
      <CardHeader>
        <Heart className="h-5 w-5 text-brand-pink" />
        <CardTitle>モテタイプ & 恋愛診断</CardTitle>
      </CardHeader>

      <div className="rounded-2xl bg-brand-gradient p-[1.5px]">
        <div className="rounded-2xl bg-white/85 px-4 py-4 text-center">
          <span className="text-4xl">{result.motetypeEmoji}</span>
          <p className="mt-1 text-xl font-black text-ink">{result.motetype}</p>
          <p className="mt-1 text-sm text-ink-soft">
            {result.motetypeDescription}
          </p>
        </div>
      </div>

      <ul className="mt-4 space-y-3">
        {rows.map((r, i) => (
          <motion.li
            key={r.label}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="rounded-xl bg-white/55 px-3.5 py-2.5"
          >
            <p className="text-xs font-bold text-brand-purple">{r.label}</p>
            <p className="text-sm text-ink">{r.value}</p>
          </motion.li>
        ))}
      </ul>
    </Card>
  );
}
