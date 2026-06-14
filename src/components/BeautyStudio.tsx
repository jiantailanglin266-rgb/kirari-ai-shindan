"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Wand2 } from "lucide-react";
import type { BeautyMode, DiagnosisResult } from "@/types/diagnosis";
import { BEAUTY_MODES } from "@/types/diagnosis";
import { generateBeautyImage } from "@/lib/ai/generateBeautyImage";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { BeforeAfterImage } from "@/components/BeforeAfterImage";
import { cn } from "@/lib/utils";

export function BeautyStudio({
  result,
  beforeImage,
}: {
  result: DiagnosisResult;
  beforeImage: string;
}) {
  const [mode, setMode] = useState<BeautyMode>("natural");
  const [loading, setLoading] = useState(false);
  const current = result.beautyImages?.find((b) => b.mode === mode);
  const [afterUrl, setAfterUrl] = useState(current?.url ?? "/mock/beauty-natural.svg");

  async function selectMode(m: BeautyMode) {
    setMode(m);
    setLoading(true);
    const img = await generateBeautyImage({ mode: m, sourceImage: beforeImage });
    setAfterUrl(img.url);
    setLoading(false);
  }

  return (
    <Card>
      <CardHeader>
        <Wand2 className="h-5 w-5 text-brand-pink" />
        <CardTitle>開運フェイス スタジオ</CardTitle>
      </CardHeader>
      <p className="-mt-1 mb-3 text-sm text-ink-soft">
        なりたい運気をタップ。AIが“開運の相”をまとった顔を生成します🔮（全モード無料）
      </p>

      {/* モード選択 */}
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {BEAUTY_MODES.map((m) => (
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
          </button>
        ))}
      </div>

      {/* プレビュー */}
      <div className="relative mt-4">
        {loading ? (
          <div className="grid aspect-[4/5] w-full place-items-center rounded-3xl glass">
            <div className="text-center">
              <Loader2 className="mx-auto h-8 w-8 animate-spin text-brand-purple" />
              <p className="mt-2 text-sm font-bold text-ink-soft">AIが生成中…✨</p>
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
        ※ 現在はデモ画像です。画像生成APIを接続すると、実写ベースの開運フェイスに切り替わります。
      </p>
    </Card>
  );
}
