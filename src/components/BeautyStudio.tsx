"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2, Wand2, Lock } from "lucide-react";
import type { BeautyMode, DiagnosisResult } from "@/types/diagnosis";
import { BEAUTY_MODES } from "@/types/diagnosis";
import { generateBeautyImage } from "@/lib/ai/generateBeautyImage";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { BeforeAfterImage } from "@/components/BeforeAfterImage";
import { cn } from "@/lib/utils";

export function BeautyStudio({
  result,
  beforeImage,
  unlocked,
}: {
  result: DiagnosisResult;
  beforeImage: string;
  unlocked: boolean;
}) {
  const [mode, setMode] = useState<BeautyMode>("natural");
  const [loading, setLoading] = useState(false);
  const current = result.beautyImages.find((b) => b.mode === mode);
  const [afterUrl, setAfterUrl] = useState(current?.url ?? "/mock/beauty-natural.svg");

  async function selectMode(m: BeautyMode) {
    const meta = BEAUTY_MODES.find((x) => x.mode === m);
    const isPremium = m !== "natural";
    if (isPremium && !unlocked) {
      // ロック中は選択だけ反映（プレビューはぼかし側で対応）
      setMode(m);
      return;
    }
    setMode(m);
    setLoading(true);
    const img = await generateBeautyImage({ mode: m, sourceImage: beforeImage });
    setAfterUrl(img.url);
    setLoading(false);
    void meta;
  }

  const lockedSelection = mode !== "natural" && !unlocked;

  return (
    <Card>
      <CardHeader>
        <Wand2 className="h-5 w-5 text-brand-pink" />
        <CardTitle>AI美化スタジオ</CardTitle>
      </CardHeader>
      <p className="-mt-1 mb-3 text-sm text-ink-soft">
        なりたい雰囲気をタップ。AIが“盛れた未来”を生成します🪄
      </p>

      {/* モード選択 */}
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {BEAUTY_MODES.map((m) => {
          const locked = m.mode !== "natural" && !unlocked;
          return (
            <button
              key={m.mode}
              onClick={() => selectMode(m.mode)}
              className={cn(
                "relative rounded-2xl px-2 py-2.5 text-[11px] font-bold leading-tight transition-all",
                mode === m.mode
                  ? "bg-brand-gradient text-white shadow-[var(--shadow-glow-pink)]"
                  : "glass text-ink",
              )}
            >
              <span className="block text-base">{m.emoji}</span>
              {m.label}
              {locked && (
                <span className="absolute right-1 top-1 text-ink-soft">
                  <Lock className="h-3 w-3" />
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* プレビュー */}
      <div className="relative mt-4">
        {lockedSelection ? (
          <div className="relative">
            <div className="blur-[7px]" aria-hidden>
              <BeforeAfterImage
                beforeUrl={beforeImage}
                afterUrl={`/mock/beauty-${mode}.svg`}
              />
            </div>
            <div className="absolute inset-0 grid place-items-center">
              <Link
                href="/pricing"
                className="flex flex-col items-center gap-1 rounded-2xl bg-white/85 px-5 py-4 text-center shadow-lg"
              >
                <Lock className="h-5 w-5 text-brand-purple" />
                <span className="text-sm font-black text-ink">
                  このモードはプレミアムで解放
                </span>
                <span className="text-xs font-bold text-brand-purple underline">
                  プランを見る →
                </span>
              </Link>
            </div>
          </div>
        ) : loading ? (
          <div className="grid aspect-[4/5] w-full place-items-center rounded-3xl glass">
            <div className="text-center">
              <Loader2 className="mx-auto h-8 w-8 animate-spin text-brand-purple" />
              <p className="mt-2 text-sm font-bold text-ink-soft">
                AIが生成中…✨
              </p>
            </div>
          </div>
        ) : (
          <motion.div
            key={mode}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <BeforeAfterImage beforeUrl={beforeImage} afterUrl={afterUrl} />
            <p className="mt-2 text-center text-sm font-bold text-ink">
              {BEAUTY_MODES.find((m) => m.mode === mode)?.label}
            </p>
            <p className="text-center text-xs text-ink-soft">
              {BEAUTY_MODES.find((m) => m.mode === mode)?.description}
            </p>
          </motion.div>
        )}
      </div>

      <p className="mt-3 text-center text-[11px] text-ink-soft">
        ※ 現在はデモ画像です。画像生成APIを接続すると実写の美化結果に切り替わります。
      </p>
    </Card>
  );
}
