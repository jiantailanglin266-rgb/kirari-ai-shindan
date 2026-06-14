"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { asset } from "@/lib/asset";

export function BeforeAfterImage({
  beforeUrl,
  afterUrl,
  beforeLabel = "BEFORE",
  afterLabel = "AFTER",
  className,
  rounded = "rounded-3xl",
}: {
  beforeUrl: string;
  afterUrl: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
  rounded?: string;
}) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);

  const move = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, pct)));
  };

  return (
    <div
      ref={ref}
      className={cn(
        "relative aspect-[4/5] w-full select-none overflow-hidden bg-white/40",
        rounded,
        className,
      )}
      onMouseMove={(e) => e.buttons === 1 && move(e.clientX)}
      onTouchMove={(e) => move(e.touches[0].clientX)}
      onClick={(e) => move(e.clientX)}
    >
      {/* AFTER（背面・全面） */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset(afterUrl)}
        alt={afterLabel}
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      <span className="absolute right-3 top-3 rounded-full bg-brand-gradient px-3 py-1 text-xs font-bold text-white">
        {afterLabel}
      </span>

      {/* BEFORE（前面・clip-path で左側だけ表示。画像はリサイズしない） */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset(beforeUrl)}
          alt={beforeLabel}
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/80 px-3 py-1 text-xs font-bold text-ink">
          {beforeLabel}
        </span>
      </div>

      {/* ハンドル */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.25)]"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white shadow-lg">
          <span className="text-xs font-black text-brand-purple">↔</span>
        </div>
      </div>
    </div>
  );
}
