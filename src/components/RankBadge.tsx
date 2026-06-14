"use client";

import { motion } from "framer-motion";
import type { Rank } from "@/types/diagnosis";
import { cn } from "@/lib/utils";

const RANK_STYLES: Record<Rank, { ring: string; text: string; glow: string }> = {
  SSS: {
    ring: "from-[#ffe08a] via-[#ff6fb5] to-[#a78bfa]",
    text: "text-[#7c3aed]",
    glow: "shadow-[0_0_40px_-6px_rgba(245,196,81,0.9)]",
  },
  SS: {
    ring: "from-[#ff9ec7] via-[#a78bfa] to-[#60a5fa]",
    text: "text-[#db2777]",
    glow: "shadow-[0_0_36px_-8px_rgba(167,139,250,0.8)]",
  },
  S: {
    ring: "from-[#c4b5fd] via-[#a78bfa] to-[#60a5fa]",
    text: "text-[#7c3aed]",
    glow: "shadow-[0_0_30px_-8px_rgba(167,139,250,0.7)]",
  },
  A: {
    ring: "from-[#a7f3d0] via-[#5eead4] to-[#60a5fa]",
    text: "text-[#0d9488]",
    glow: "shadow-[0_0_26px_-8px_rgba(94,234,212,0.7)]",
  },
  B: {
    ring: "from-[#ffd1e8] via-[#ff9ec7] to-[#fbcfe8]",
    text: "text-[#db2777]",
    glow: "shadow-[0_0_24px_-8px_rgba(255,158,199,0.7)]",
  },
  C: {
    ring: "from-[#bae6fd] via-[#7dd3fc] to-[#a7f3d0]",
    text: "text-[#0284c7]",
    glow: "shadow-[0_0_24px_-8px_rgba(125,211,252,0.7)]",
  },
};

export function RankBadge({
  rank,
  label,
  size = "md",
  animate = true,
}: {
  rank: Rank;
  label?: string;
  size?: "sm" | "md" | "lg";
  animate?: boolean;
}) {
  const style = RANK_STYLES[rank];
  const dims =
    size === "lg" ? "h-28 w-28 text-4xl" : size === "sm" ? "h-14 w-14 text-xl" : "h-20 w-20 text-2xl";

  return (
    <div className="flex flex-col items-center gap-1.5">
      <motion.div
        initial={animate ? { scale: 0, rotate: -30 } : false}
        animate={animate ? { scale: 1, rotate: 0 } : undefined}
        transition={{ type: "spring", stiffness: 200, damping: 12 }}
        className={cn(
          "relative grid place-items-center rounded-full bg-gradient-to-br p-[3px]",
          style.ring,
          style.glow,
          dims,
        )}
      >
        <div className="grid h-full w-full place-items-center rounded-full bg-white/90">
          <span className={cn("font-black tracking-tight", style.text)}>
            {rank}
          </span>
        </div>
        <motion.span
          aria-hidden
          className="absolute -right-1 -top-1 text-lg"
          animate={animate ? { scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] } : undefined}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ✨
        </motion.span>
      </motion.div>
      {label && (
        <span className={cn("text-sm font-bold", style.text)}>{label}</span>
      )}
    </div>
  );
}
