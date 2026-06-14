"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, ImagePlus, X, Loader2 } from "lucide-react";
import { saveImage, saveGender } from "@/lib/store";
import type { Gender } from "@/lib/mock/diagnosis";
import { Button } from "@/components/ui/button";
import { DisclaimerBox } from "@/components/DisclaimerBox";
import { cn } from "@/lib/utils";

const GENDERS: { id: Gender; label: string; emoji: string }[] = [
  { id: "female", label: "女性タイプで診断", emoji: "🌸" },
  { id: "male", label: "男性タイプで診断", emoji: "🌊" },
  { id: "neutral", label: "おまかせ", emoji: "✨" },
];

/** ファイルを data URL に変換（縮小してストレージ節約）。 */
function fileToResizedDataUrl(file: File, max = 720): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) return resolve(reader.result as string);
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", 0.85));
      };
      img.onerror = reject;
      img.src = reader.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function UploadBox() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [agreed, setAgreed] = useState(false);
  const [gender, setGender] = useState<Gender>("neutral");
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("画像ファイルを選んでください。");
      return;
    }
    setError(null);
    try {
      const dataUrl = await fileToResizedDataUrl(file);
      setPreview(dataUrl);
    } catch {
      setError("画像の読み込みに失敗しました。別の写真をお試しください。");
    }
  }

  function start() {
    if (!preview || !agreed) return;
    setStarting(true);
    saveImage(preview);
    saveGender(gender);
    router.push("/analyzing");
  }

  return (
    <div className="space-y-5">
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
      <input
        ref={cameraRef}
        type="file"
        accept="image/*"
        capture="user"
        className="hidden"
        onChange={handleFile}
      />

      {/* プレビュー / アップロード枠 */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-xl2)] glass border-2 border-dashed border-brand-purple/30">
        <AnimatePresence mode="wait">
          {preview ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preview}
                alt="アップロードした写真のプレビュー"
                className="h-full w-full object-cover"
              />
              <button
                onClick={() => setPreview(null)}
                className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/85 text-ink shadow-md"
                aria-label="写真を削除"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              className="absolute inset-0 grid place-items-center p-6 text-center"
            >
              <div>
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="mx-auto mb-3 grid h-16 w-16 place-items-center rounded-full bg-brand-gradient text-white"
                >
                  <ImagePlus className="h-7 w-7" />
                </motion.div>
                <p className="font-bold text-ink">顔写真をアップロード</p>
                <p className="mt-1 text-sm text-ink-soft">
                  正面・明るめの写真がいちばん盛れます🎀
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 撮影 / 選択ボタン */}
      <div className="grid grid-cols-2 gap-3">
        <Button variant="secondary" onClick={() => cameraRef.current?.click()}>
          <Camera className="h-4 w-4" /> カメラで撮影
        </Button>
        <Button variant="secondary" onClick={() => fileRef.current?.click()}>
          <ImagePlus className="h-4 w-4" /> 画像を選ぶ
        </Button>
      </div>

      {error && (
        <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-500">
          {error}
        </p>
      )}

      {/* タイプ選択 */}
      <div>
        <p className="mb-2 text-sm font-bold text-ink">診断タイプ（任意）</p>
        <div className="grid grid-cols-3 gap-2">
          {GENDERS.map((g) => (
            <button
              key={g.id}
              onClick={() => setGender(g.id)}
              className={cn(
                "rounded-2xl px-2 py-3 text-xs font-bold transition-all",
                gender === g.id
                  ? "bg-brand-gradient text-white shadow-[var(--shadow-glow-pink)]"
                  : "glass text-ink",
              )}
            >
              <span className="block text-lg">{g.emoji}</span>
              {g.label}
            </button>
          ))}
        </div>
      </div>

      <DisclaimerBox />

      {/* 利用規約同意 */}
      <label className="flex cursor-pointer items-start gap-3 rounded-2xl bg-white/55 px-4 py-3">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-0.5 h-5 w-5 shrink-0 accent-[#a78bfa]"
        />
        <span className="text-sm text-ink">
          <Link href="/terms" className="font-bold text-brand-purple underline">
            利用規約
          </Link>
          と
          <Link href="/privacy" className="font-bold text-brand-purple underline">
            プライバシーポリシー
          </Link>
          に同意します（自分の写真／許可を得た写真のみ使用します）
        </span>
      </label>

      <Button
        variant="primary"
        size="xl"
        className="w-full"
        disabled={!preview || !agreed || starting}
        onClick={start}
      >
        {starting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" /> 診断を準備中…
          </>
        ) : (
          "診断スタート ✨"
        )}
      </Button>
    </div>
  );
}
