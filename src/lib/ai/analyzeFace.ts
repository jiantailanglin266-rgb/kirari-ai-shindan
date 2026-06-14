import type { DiagnosisResult } from "@/types/diagnosis";
import { generateMockDiagnosis, type Focus } from "@/lib/mock/diagnosis";

/* ============================================================
   顔解析エントリポイント
   ------------------------------------------------------------
   現時点では mockAnalyzeFace() がダミー結果を返します。
   将来的に OpenAI Vision / 画像解析 API を接続する場合は
   analyzeFaceWithAI() を実装し、analyzeFace() の分岐を
   差し替えるだけで切り替えられる構造です。
   ============================================================ */

export type AnalyzeOptions = {
  /** data URL もしくはアップロード済み画像 URL */
  image?: string;
  /** 重視する運の出し分け用（任意） */
  focus?: Focus;
};

/** API 接続を切り替えるフラグ（環境変数で制御）。 */
const USE_REAL_AI = process.env.NEXT_PUBLIC_USE_REAL_AI === "true";

/** ダミー解析。少し待ってからランダムな診断結果を返す。 */
export async function mockAnalyzeFace(
  opts: AnalyzeOptions = {},
): Promise<DiagnosisResult> {
  // 解析中演出に合わせてわずかに待機（UI 側のローディングと別管理でもOK）。
  await new Promise((r) => setTimeout(r, 400));
  return generateMockDiagnosis(opts.focus ?? "all");
}

/**
 * 本番 AI 解析の置き場所（未実装のスタブ）。
 * 例: /api/analyze に画像を投げ、結果を DiagnosisResult にマッピングする。
 */
async function analyzeFaceWithAI(
  opts: AnalyzeOptions,
): Promise<DiagnosisResult> {
  // TODO: 画像解析 API を接続する。
  // const res = await fetch("/api/analyze", {
  //   method: "POST",
  //   body: JSON.stringify({ image: opts.image }),
  // });
  // const data = await res.json();
  // return mapApiResponseToDiagnosis(data);
  //
  // 安全設計: 年齢・人種・健康状態の推定値は受け取らない／使わないこと。
  console.warn("[analyzeFace] real AI not implemented yet — falling back to mock");
  return mockAnalyzeFace(opts);
}

/** 呼び出し側はこれだけを使う。実装の差し替えはここで吸収。 */
export async function analyzeFace(
  opts: AnalyzeOptions = {},
): Promise<DiagnosisResult> {
  return USE_REAL_AI ? analyzeFaceWithAI(opts) : mockAnalyzeFace(opts);
}
