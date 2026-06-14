"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import type { DiagnosisResult } from "@/types/diagnosis";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export function MotetypeCard({ result }: { result: DiagnosisResult }) {
  const love = result.loveReport;
  const rows: { label: string; value: string }[] = [
    { label: "第一印象", value: love.firstImpression },
    { label: "恋愛運", value: love.oppositeSexImpression },
    { label: "出会い運", value: love.datingAppScore },
    { label: "結婚運・晩年運", value: love.seriousLovePotential },
    { label: "人付き合いの運", value: love.approachability },
    { label: "隠れた才能", value: love.gapCharm },
  ];

  return (
    <Card>
      <CardHeader>
        <Heart className="h-5 w-5 text-brand-pink" />
        <CardTitle>人相タイプ & 運勢</CardTitle>
      </CardHeader>

      <div className="rounded-2xl bg-brand-gradient p-[1.5px]">
        <div className="rounded-2xl bg-white/10 px-4 py-4 text-center">
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
            className="rounded-xl bg-white/5 px-3.5 py-2.5"
          >
            <p className="text-xs font-bold text-brand-purple">{r.label}</p>
            <p className="text-sm text-ink">{r.value}</p>
          </motion.li>
        ))}
      </ul>
    </Card>
  );
}
