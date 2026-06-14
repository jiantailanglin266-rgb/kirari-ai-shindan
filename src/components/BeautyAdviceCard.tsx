"use client";

import { motion } from "framer-motion";
import { Scissors, Sparkles, Shirt, Droplets, Camera, UserRound } from "lucide-react";
import type { DiagnosisResult } from "@/types/diagnosis";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export function BeautyAdviceCard({ result }: { result: DiagnosisResult }) {
  const a = result.beautyAdvice;
  const items = [
    { icon: Scissors, label: "似合う髪型", value: a.hairstyle },
    { icon: Sparkles, label: "眉の整え方", value: a.eyebrows },
    { icon: Shirt, label: "似合う服装", value: a.fashion },
    { icon: Droplets, label: "肌の見せ方", value: a.skin },
    { icon: Camera, label: "盛れる角度", value: a.photoAngle },
    { icon: UserRound, label: "プロフ写真", value: a.profilePhoto },
  ];

  return (
    <Card>
      <CardHeader>
        <Sparkles className="h-5 w-5 text-brand-purple" />
        <CardTitle>AI美容・垢抜けアドバイス</CardTitle>
      </CardHeader>

      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((it, i) => (
          <motion.div
            key={it.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="flex gap-3 rounded-2xl bg-white/55 p-3.5"
          >
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-gradient text-white">
              <it.icon className="h-4.5 w-4.5" strokeWidth={2.2} />
            </div>
            <div>
              <p className="text-xs font-bold text-brand-purple">{it.label}</p>
              <p className="text-sm text-ink">{it.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 rounded-2xl bg-brand-purple-soft/50 p-4">
        <p className="text-xs font-bold text-brand-purple">✨ 垢抜けポイント</p>
        <ul className="mt-2 space-y-1.5">
          {result.improvementPoints.map((p) => (
            <li key={p} className="flex gap-2 text-sm text-ink">
              <span className="text-brand-pink">●</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
