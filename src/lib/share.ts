import type { DiagnosisResult } from "@/types/diagnosis";
import { getSlugByName } from "@/lib/faceTypes";

/* ============================================================
   結果のシェア用エンコード/デコード（バズの核）
   ------------------------------------------------------------
   診断結果を URL クエリ(?r=...)に埋め込み、リンクを開いた友達に
   「あなたの結果」をそのまま見せる → 自分も診断したくなる導線。
   バックエンド不要で拡散ループを作る。
   ============================================================ */

const PARAM = "r";

function toB64Url(s: string): string {
  const b64 = btoa(unescape(encodeURIComponent(s)));
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromB64Url(s: string): string {
  const b64 = s.replace(/-/g, "+").replace(/_/g, "/");
  const pad = b64.length % 4 ? "=".repeat(4 - (b64.length % 4)) : "";
  return decodeURIComponent(escape(atob(b64 + pad)));
}

/** 結果をURL用の文字列にエンコード（URLを軽くするため重い/不要フィールドは除外）。 */
export function encodeResult(r: DiagnosisResult): string {
  const { beautyImages: _bi, id: _id, createdAt: _ca, ...slim } = r;
  void _bi;
  void _id;
  void _ca;
  return toB64Url(JSON.stringify(slim));
}

/** URL文字列から結果をデコード（失敗時 null）。 */
export function decodeResult(s: string): DiagnosisResult | null {
  try {
    const obj = JSON.parse(fromB64Url(s)) as DiagnosisResult;
    if (!obj || typeof obj.totalScore !== "number" || !obj.motetype) return null;
    return obj;
  } catch {
    return null;
  }
}

/** 共有URLを組み立てる（タイプ別OGページ /r/<slug>/ を使う）。 */
export function buildShareUrl(baseUrl: string, r: DiagnosisResult): string {
  const slug = getSlugByName(r.motetype);
  const u = `${baseUrl.replace(/\/$/, "")}/r/${slug}/`;
  return `${u}?${PARAM}=${encodeResult(r)}`;
}

/** 現在のURLから共有結果を読む（クライアント専用）。 */
export function readSharedResult(): DiagnosisResult | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const v = params.get(PARAM);
  return v ? decodeResult(v) : null;
}
