"use client";

import { motion } from "framer-motion";
import type { Rank } from "@/types/diagnosis";
import { cn } from "@/lib/utils";

const RANK_STYLES: Record<Rank, { ring: string; text: string; glow: string }> = {
  SSS: {
    ring: "from-[#e6ff3a] via-[#ff2bd6] to-[#b14bff]",
    text: "text-[#e6ff3a]",
    glow: "shadow-[0_0_48px_-4px_rgba(230,255,58,0.9)]",
  },
  SS: {
    ring: "from-[#ff2bd6] via-[#b14bff] to-[#00eaff]",
    text: "text-[#ff5ce0]",
    glow: "shadow-[0_0_44px_-6px_rgba(255,43,214,0.9)]",
  },
  S: {
    ring: "from-[#b14bff] via-[#7c1fff] to-[#00eaff]",
    text: "text-[#c98aff]",
    glow: "shadow-[0_0_38px_-6px_rgba(177,75,255,0.9)]",
  },
  A: {
    ring: "from-[#2bffd6] via-[#00eaff] to-[#b14bff]",
    text: "text-[#3bffe0]",
    glow: "shadow-[0_0_34px_-6px_rgba(43,255,214,0.85)]",
  },
  B: {
    ring: "from-[#ff2bd6] via-[#ff5ce0] to-[#b14bff]",
    text: "text-[#ff8ae6]",
    glow: "shadow-[0_0_30px_-6px_rgba(255,43,214,0.8)]",
  },
  C: {
    ring: "from-[#00eaff] via-[#38bdf8] to-[#2bffd6]",
    text: "text-[#5cf0ff]",
    glow: "shadow-[0_0_30px_-6px_rgba(0,234,255,0.85)]",
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
