"use client";

import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import { Download, Share2, Link2, Check } from "lucide-react";
import type { DiagnosisResult } from "@/types/diagnosis";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";
import { buildShareUrl } from "@/lib/share";

const SITE_NAME = SITE.name;

export function ShareResultCard({ result }: { result: DiagnosisResult }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = buildShareUrl(SITE.url, result);
  const hashtagText = result.hashtags.map((h) => `#${h}`).join(" ");
  const shareText = `${result.shareText}\n${hashtagText}`;
  const stars = "★".repeat(result.rarity.stars) + "☆".repeat(5 - result.rarity.stars);

  async function buildPng(): Promise<string | null> {
    if (!cardRef.current) return null;
    try {
      return await toPng(cardRef.current, { pixelRatio: 2, cacheBust: true });
    } catch (e) {
      console.error("toPng failed", e);
      return null;
    }
  }

  async function saveImage() {
    setBusy(true);
    const dataUrl = await buildPng();
    setBusy(false);
    if (!dataUrl) return;
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `ninso-${result.motetype}.png`;
    a.click();
  }

  async function nativeShare() {
    const dataUrl = await buildPng();
    if (dataUrl && navigator.canShare) {
      try {
        const blob = await (await fetch(dataUrl)).blob();
        const file = new File([blob], "ninso-result.png", { type: "image/png" });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            text: shareText,
            url: shareUrl,
            title: SITE_NAME,
          });
          return;
        }
      } catch {
        /* キャンセル等は握りつぶす */
      }
    }
    // フォールバック: テキスト＋URLのみで共有
    if (navigator.share) {
      try {
        await navigator.share({ text: shareText, url: shareUrl, title: SITE_NAME });
        return;
      } catch {
        /* noop */
      }
    }
    await saveImage();
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* noop */
    }
  }

  function shareToX() {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText,
    )}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function shareToLine() {
    const url = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
      shareUrl,
    )}&text=${encodeURIComponent(shareText)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="space-y-4">
      {/* ==== キャプチャ対象カード ==== */}
      <div className="mx-auto w-full max-w-sm">
        <div
          ref={cardRef}
          className="relative overflow-hidden rounded-[28px] p-6 text-white"
          style={{
            background:
              "linear-gradient(135deg,#ff2bd6 0%,#b14bff 50%,#00eaff 100%)",
          }}
        >
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/20 blur-lg" />
          <div className="absolute -bottom-10 -left-6 h-32 w-32 rounded-full bg-white/15 blur-lg" />

          <div className="relative flex items-center justify-between">
            <span className="text-sm font-bold opacity-90">{SITE_NAME}</span>
            <span className="text-sm">🔮 AI人相鑑定</span>
          </div>

          <div className="relative mt-5 text-center">
            <p className="text-xs font-bold opacity-90">総合運勢スコア</p>
            <p className="text-6xl font-black leading-none drop-shadow">
              {result.totalScore}
            </p>
            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/25 px-4 py-1.5 backdrop-blur">
              <span className="text-lg font-black">{result.rank}</span>
              <span className="text-sm font-bold">{result.rankLabel}</span>
            </div>
          </div>

          <div className="relative mt-4 rounded-2xl bg-white/20 px-4 py-3 text-center backdrop-blur">
            <p className="text-2xl">{result.motetypeEmoji}</p>
            <p className="text-xl font-black">{result.motetype}</p>
            {/* レア度バッジ（バズ要素） */}
            <div className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-black/25 px-3 py-1">
              <span className="text-xs font-black tracking-wide text-amber-200">
                {stars}
              </span>
              <span className="text-[11px] font-bold">
                {result.rarity.label}・出現率{result.rarity.percent}%
              </span>
            </div>
            <p className="mt-2 text-xs opacity-95">「{result.catchCopy}」</p>
          </div>

          <p className="relative mt-4 text-center text-[11px] font-bold opacity-90">
            {result.hashtags.map((h) => `#${h}`).join("  ")}
          </p>
        </div>
      </div>

      {/* ==== シェアボタン ==== */}
      <div className="grid grid-cols-2 gap-2.5">
        <Button variant="primary" onClick={nativeShare} disabled={busy}>
          <Share2 className="h-4 w-4" /> シェアする
        </Button>
        <Button variant="secondary" onClick={copyLink}>
          {copied ? (
            <>
              <Check className="h-4 w-4" /> コピーしました
            </>
          ) : (
            <>
              <Link2 className="h-4 w-4" /> リンクをコピー
            </>
          )}
        </Button>
        <Button variant="outline" size="sm" onClick={shareToX}>
          𝕏 でポスト
        </Button>
        <Button variant="outline" size="sm" onClick={shareToLine}>
          LINEで送る
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="col-span-2"
          onClick={saveImage}
          disabled={busy}
        >
          <Download className="h-4 w-4" /> 画像を保存（Instagram / TikTok 用）
        </Button>
      </div>
      <p className="text-center text-xs text-ink-soft">
        リンクを送ると、相手にこの結果が表示されます。友達の人相も占ってみて🔮
      </p>
    </div>
  );
}
