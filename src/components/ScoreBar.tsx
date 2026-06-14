"use client";

import { motion } from "framer-motion";

export function ScoreBar({
  label,
  value,
  emoji,
  delay = 0,
}: {
  label: string;
  value: number;
  emoji?: string;
  delay?: number;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="font-bold text-ink">
          {emoji && <span className="mr-1">{emoji}</span>}
          {label}
        </span>
        <span className="font-black text-gradient tabular-nums">{value}</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-brand-purple/10">
        <motion.div
          className="h-full rounded-full bg-brand-gradient"
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
