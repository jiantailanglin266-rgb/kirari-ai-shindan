"use client";

import { motion } from "framer-motion";
import type { Rank } from "@/types/diagnosis";
import { cn } from "@/lib/utils";

const RANK_STYLES: Record<Rank, { ring: string; text: string; glow: string }> = {
  SSS: {
    ring: "from-[#ffe08a] via-[#ff4ecd] to-[#b06bff]",
    text: "text-[#ffe08a]",
    glow: "shadow-[0_0_44px_-4px_rgba(255,215,106,0.95)]",
  },
  SS: {
    ring: "from-[#ff9ec7] via-[#b06bff] to-[#22d3ee]",
    text: "text-[#ff8ad9]",
    glow: "shadow-[0_0_40px_-6px_rgba(176,107,255,0.9)]",
  },
  S: {
    ring: "from-[#c4b5fd] via-[#b06bff] to-[#22d3ee]",
    text: "text-[#c9acff]",
    glow: "shadow-[0_0_34px_-6px_rgba(176,107,255,0.85)]",
  },
  A: {
    ring: "from-[#a7f3d0] via-[#5eead4] to-[#22d3ee]",
    text: "text-[#6ef0d8]",
    glow: "shadow-[0_0_30px_-6px_rgba(94,234,212,0.85)]",
  },
  B: {
    ring: "from-[#ffd1e8] via-[#ff8ad9] to-[#b06bff]",
    text: "text-[#ff9ec7]",
    glow: "shadow-[0_0_28px_-6px_rgba(255,158,199,0.85)]",
  },
  C: {
    ring: "from-[#7dd3fc] via-[#38bdf8] to-[#5eead4]",
    text: "text-[#7dd3fc]",
    glow: "shadow-[0_0_28px_-6px_rgba(125,211,252,0.85)]",
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
        <div className="grid h-full w-full place-items-center rounded-full bg-[#0a121b]">
          <span
            className={cn("font-black tracking-tight", style.text)}
            style={{ textShadow: "0 0 10px currentColor" }}
          >
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
