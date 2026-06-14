"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { RefreshCw, Trash2, Rocket, Sparkles, Star } from "lucide-react";
import type { DiagnosisResult } from "@/types/diagnosis";
import {
  loadResult,
  loadImage,
  isUnlocked,
  saveResult,
  resetAll,
  deleteUploadedImage,
} from "@/lib/store";
import { generateMockDiagnosis } from "@/lib/mock/diagnosis";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ScoreCard } from "@/components/ScoreCard";
import { RadarChart } from "@/components/RadarChart";
import { ScoreBar } from "@/components/ScoreBar";
import { MotetypeCard } from "@/components/MotetypeCard";
import { BeautyAdviceCard } from "@/components/BeautyAdviceCard";
import { BeautyStudio } from "@/components/BeautyStudio";
import { ShareResultCard } from "@/components/ShareResultCard";
import { PremiumGate } from "@/components/PremiumGate";
import { CTAButton } from "@/components/CTAButton";
import { Button } from "@/components/ui/button";

const SCORE_META: { key: keyof DiagnosisResult["scores"]; label: string; emoji: string }[] = [
  { key: "cleanliness", label: "清潔感", emoji: "🤍" },
  { key: "eyes", label: "目元の印象", emoji: "👀" },
  { key: "friendliness", label: "親近感", emoji: "🌸" },
  { key: "sexiness", label: "色気", emoji: "💋" },
  { key: "aura", label: "華やかさ", emoji: "✨" },
  { key: "intelligence", label: "知的さ", emoji: "📚" },
  { key: "photogenic", label: "写真映え", emoji: "📸" },
  { key: "loveAttraction", label: "恋愛引力", emoji: "💘" },
];

const RADAR_LABELS: Record<string, string> = {
  cleanliness: "清潔感",
  eyes: "目元",
  friendliness: "親近感",
  sexiness: "色気",
  aura: "華やかさ",
  intelligence: "知的さ",
  photogenic: "写真映え",
  loveAttraction: "恋愛引力",
};

export function ResultView() {
  const router = useRouter();
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [beforeImage, setBeforeImage] = useState<string>("/mock/beauty-natural.svg");
  const [unlocked, setUnlocked] = useState(false);
  const [imageDeleted, setImageDeleted] = useState(false);

  useEffect(() => {
    let r = loadResult();
    if (!r) {
      // 直接アクセス時はデモ結果を生成して表示
      r = generateMockDiagnosis("neutral");
      saveResult(r);
    }
    setResult(r);
    const img = loadImage();
    if (img) setBeforeImage(img);
    setUnlocked(isUnlocked());
  }, []);

  function reDiagnose() {
    resetAll();
    router.push("/upload");
  }

  function reGenerate() {
    if (!result) return;
    const next = generateMockDiagnosis("neutral");
    saveResult(next);
    setResult(next);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleDeleteImage() {
    deleteUploadedImage();
    setBeforeImage("/mock/beauty-natural.svg");
    setImageDeleted(true);
  }

  if (!result) {
    return (
      <div className="grid min-h-[50vh] place-items-center text-ink-soft">
        読み込み中…
      </div>
    );
  }

  const radarData = SCORE_META.map((m) => ({
    label: RADAR_LABELS[m.key],
    value: result.scores[m.key],
  }));

  return (
    <div className="mx-auto w-full max-w-md space-y-5 px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <span className="inline-flex items-center gap-1 rounded-full bg-brand-gradient px-4 py-1 text-xs font-bold text-white">
          <Sparkles className="h-3 w-3" /> 診断完了！
        </span>
        <h1 className="mt-2 text-2xl font-black text-ink">あなたの診断結果</h1>
      </motion.div>

      {/* 総合スコア */}
      <ScoreCard result={result} />

      {/* 今日のモテ運 */}
      <Card className="flex items-center gap-4 bg-[linear-gradient(110deg,#fff0f7,#f3ecff)]">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-brand-gradient text-white">
          <Star className="h-6 w-6" />
        </div>
        <div>
          <p className="text-xs font-bold text-brand-purple">
            今日のモテ運 {result.todayLuck.score}点
          </p>
          <p className="text-sm font-bold text-ink">{result.todayLuck.message}</p>
        </div>
      </Card>

      {/* 詳細スコア（プレミアム） */}
      <PremiumGate unlocked={unlocked} label="詳細スコアをプレミアムで解放">
        <Card>
          <CardHeader>
            <Star className="h-5 w-5 text-brand-purple" />
            <CardTitle>詳細スコア</CardTitle>
          </CardHeader>
          <div className="flex justify-center">
            <RadarChart data={radarData} />
          </div>
          <div className="mt-4 space-y-3">
            {SCORE_META.map((m, i) => (
              <ScoreBar
                key={m.key}
                label={m.label}
                emoji={m.emoji}
                value={result.scores[m.key]}
                delay={i * 0.05}
              />
            ))}
          </div>
        </Card>
      </PremiumGate>

      {/* モテタイプ & 恋愛診断 */}
      <MotetypeCard result={result} />

      {/* 美容アドバイス（プレミアムで詳細） */}
      <PremiumGate unlocked={unlocked} label="フル美容プランをプレミアムで解放">
        <BeautyAdviceCard result={result} />
      </PremiumGate>

      {/* AI美化スタジオ */}
      <BeautyStudio
        result={result}
        beforeImage={beforeImage}
        unlocked={unlocked}
      />

      {/* シェアカード */}
      <Card>
        <CardHeader>
          <Sparkles className="h-5 w-5 text-brand-pink" />
          <CardTitle>SNSシェアカード</CardTitle>
        </CardHeader>
        <ShareResultCard result={result} />
      </Card>

      {/* プレミアム導線 */}
      {!unlocked && (
        <div className="relative overflow-hidden rounded-[var(--radius-xl2)] bg-brand-gradient p-6 text-center text-white shadow-[var(--shadow-glow-purple)]">
          <h2 className="text-xl font-black">もっと深く知りたいなら</h2>
          <p className="mt-1 text-sm opacity-95">
            詳細スコア・AI美化画像・恋愛詳細・垢抜けプランをぜんぶ解放✨
          </p>
          <div className="mt-4 flex justify-center">
            <CTAButton
              href="/pricing"
              variant="secondary"
              size="lg"
              className="!text-ink"
            >
              プレミアム診断を見る
            </CTAButton>
          </div>
        </div>
      )}

      {/* アクション */}
      <div className="grid grid-cols-1 gap-2.5">
        <CTAButton onClick={reGenerate} variant="primary" size="lg" shine={false}>
          <RefreshCw className="h-4 w-4" /> もう一度診断する
        </CTAButton>
        <div className="grid grid-cols-2 gap-2.5">
          <Button variant="secondary" onClick={reGenerate}>
            <Rocket className="h-4 w-4" /> 別タイプで加工
          </Button>
          <Button variant="secondary" onClick={reDiagnose}>
            <RefreshCw className="h-4 w-4" /> 写真を変える
          </Button>
        </div>
      </div>

      {/* プライバシー: 画像削除 */}
      <Card className="text-center">
        <p className="text-xs text-ink-soft">
          アップロードした写真は端末内（セッション）にのみ一時保存されます。
        </p>
        <Button
          variant="ghost"
          size="sm"
          className="mt-2 text-rose-400"
          onClick={handleDeleteImage}
          disabled={imageDeleted}
        >
          <Trash2 className="h-4 w-4" />
          {imageDeleted ? "画像を削除しました" : "アップロード画像を削除"}
        </Button>
        <div>
          <Link
            href="/privacy"
            className="text-xs font-bold text-brand-purple underline"
          >
            プライバシーポリシー
          </Link>
        </div>
      </Card>
    </div>
  );
}
