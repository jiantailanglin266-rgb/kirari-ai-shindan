"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, animate as animateValue } from "framer-motion";
import { cn } from "@/lib/utils";

export function CircularGauge({
  value,
  size = 200,
  stroke = 16,
  label,
  duration = 1.6,
  className,
}: {
  value: number;
  size?: number;
  stroke?: number;
  label?: string;
  duration?: number;
  className?: string;
}) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const [display, setDisplay] = useState(0);
  const mv = useMotionValue(0);

  useEffect(() => {
    const controls = animateValue(mv, value, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [value, duration, mv]);

  const offset = circumference - (display / 100) * circumference;

  return (
    <div
      className={cn("relative grid place-items-center", className)}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id="gauge-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff2bd6" />
            <stop offset="50%" stopColor="#b14bff" />
            <stop offset="100%" stopColor="#00eaff" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(0,234,255,0.12)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#gauge-grad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ filter: "drop-shadow(0 0 7px rgba(0,234,255,0.65))" }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <motion.div
            className="text-5xl font-black text-gradient leading-none"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {display}
          </motion.div>
          {label && (
            <div className="mt-1 text-xs font-bold text-ink-soft">{label}</div>
          )}
        </div>
      </div>
    </div>
  );
}
