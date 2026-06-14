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
  { key: "love", label: "恋愛運", emoji: "💗" },
  { key: "money", label: "金運", emoji: "💰" },
  { key: "work", label: "仕事運", emoji: "💼" },
  { key: "health", label: "健康運", emoji: "🌿" },
  { key: "popularity", label: "人気運", emoji: "⭐" },
  { key: "intellect", label: "知性", emoji: "📚" },
  { key: "intuition", label: "直感力", emoji: "🔮" },
  { key: "charm", label: "魅力運", emoji: "✨" },
];

const RADAR_LABELS: Record<string, string> = {
  love: "恋愛運",
  money: "金運",
  work: "仕事運",
  health: "健康運",
  popularity: "人気運",
  intellect: "知性",
  intuition: "直感力",
  charm: "魅力運",
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
      r = generateMockDiagnosis("all");
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
    const next = generateMockDiagnosis("all");
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
          <Sparkles className="h-3 w-3" /> 鑑定完了！
        </span>
        <h1 className="mt-2 text-2xl font-black text-ink">あなたの鑑定結果</h1>
      </motion.div>

      {/* 総合スコア */}
      <ScoreCard result={result} />

      {/* 今日の運勢 */}
      <Card className="flex items-center gap-4 bg-[linear-gradient(110deg,rgba(255,78,205,0.14),rgba(34,211,238,0.12))]">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-brand-gradient text-white">
          <Star className="h-6 w-6" />
        </div>
        <div>
          <p className="text-xs font-bold text-brand-purple">
            今日の運勢 {result.todayLuck.score}点
          </p>
          <p className="text-sm font-bold text-ink">{result.todayLuck.message}</p>
        </div>
      </Card>

      {/* 詳細スコア（プレミアム） */}
      <PremiumGate unlocked={unlocked} label="詳細運勢をプレミアムで解放">
        <Card>
          <CardHeader>
            <Star className="h-5 w-5 text-brand-purple" />
            <CardTitle>詳細運勢（八運）</CardTitle>
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

      {/* 開運アドバイス（プレミアムで詳細） */}
      <PremiumGate unlocked={unlocked} label="開運プランをプレミアムで解放">
        <BeautyAdviceCard result={result} />
      </PremiumGate>

      {/* 開運フェイス スタジオ */}
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
          <h2 className="text-xl font-black">もっと深く視てほしいなら</h2>
          <p className="mt-1 text-sm opacity-95">
            詳細運勢・開運フェイス・恋愛運/金運の詳細・開運プランをぜんぶ解放🔮
          </p>
          <div className="mt-4 flex justify-center">
            <CTAButton
              href="/pricing"
              variant="secondary"
              size="lg"
              className="!text-ink"
            >
              プレミアム鑑定を見る
            </CTAButton>
          </div>
        </div>
      )}

      {/* アクション */}
      <div className="grid grid-cols-1 gap-2.5">
        <CTAButton onClick={reGenerate} variant="primary" size="lg" shine={false}>
          <RefreshCw className="h-4 w-4" /> もう一度鑑定する
        </CTAButton>
        <div className="grid grid-cols-2 gap-2.5">
          <Button variant="secondary" onClick={reGenerate}>
            <Rocket className="h-4 w-4" /> 別の運で観る
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
