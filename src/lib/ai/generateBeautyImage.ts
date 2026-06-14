import type { BeautyImage, BeautyMode } from "@/types/diagnosis";
import { BEAUTY_MODES } from "@/types/diagnosis";

/* ============================================================
   AI美化画像 生成エントリポイント
   ------------------------------------------------------------
   現時点ではモック画像 URL を返します。
   将来的に画像生成 API（例: Stable Diffusion / Replicate /
   OpenAI Images）を接続する場合は generateBeautyImageWithAI()
   を実装して分岐を差し替えてください。
   ============================================================ */

const USE_REAL_AI = process.env.NEXT_PUBLIC_USE_REAL_AI === "true";

export type GenerateOptions = {
  /** 元画像（data URL 等） */
  sourceImage?: string;
  mode: BeautyMode;
};

function modeMeta(mode: BeautyMode) {
  return BEAUTY_MODES.find((m) => m.mode === mode) ?? BEAUTY_MODES[0];
}

/** モック生成。プレースホルダ画像 URL を返す。 */
export async function mockGenerateBeautyImage(
  opts: GenerateOptions,
): Promise<BeautyImage> {
  await new Promise((r) => setTimeout(r, 600));
  const meta = modeMeta(opts.mode);
  return {
    mode: opts.mode,
    label: meta.label,
    description: meta.description,
    premium: opts.mode !== "natural",
    url: `/mock/beauty-${opts.mode}.svg`,
  };
}

/** 本番画像生成のスタブ（未実装）。 */
async function generateBeautyImageWithAI(
  opts: GenerateOptions,
): Promise<BeautyImage> {
  // TODO: 画像生成 API を接続する。
  // const res = await fetch("/api/generate-image", {
  //   method: "POST",
  //   body: JSON.stringify({ image: opts.sourceImage, mode: opts.mode }),
  // });
  // const { url } = await res.json();
  console.warn("[generateBeautyImage] real AI not implemented — using mock");
  return mockGenerateBeautyImage(opts);
}

/** 呼び出し側はこれだけを使う。 */
export async function generateBeautyImage(
  opts: GenerateOptions,
): Promise<BeautyImage> {
  return USE_REAL_AI
    ? generateBeautyImageWithAI(opts)
    : mockGenerateBeautyImage(opts);
}
