"use client";

import Link from "next/link";
import { Lock } from "lucide-react";

/** 有料コンテンツのぼかしゲート。unlocked=false のとき中身をぼかしてロック表示。 */
export function PremiumGate({
  unlocked,
  children,
  label = "プレミアム診断で解放",
}: {
  unlocked: boolean;
  children: React.ReactNode;
  label?: string;
}) {
  if (unlocked) return <>{children}</>;

  return (
    <div className="relative">
      <div className="pointer-events-none select-none blur-[6px]" aria-hidden>
        {children}
      </div>
      <div className="absolute inset-0 grid place-items-center rounded-[var(--radius-xl2)] bg-white/30">
        <Link
          href="/pricing"
          className="flex flex-col items-center gap-2 rounded-2xl bg-white/85 px-6 py-4 text-center shadow-lg"
        >
          <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-gradient text-white">
            <Lock className="h-5 w-5" />
          </span>
          <span className="text-sm font-black text-ink">{label}</span>
          <span className="text-xs font-bold text-brand-purple underline">
            プランを見る →
          </span>
        </Link>
      </div>
    </div>
  );
}
