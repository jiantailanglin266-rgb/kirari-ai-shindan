"use client";

import type { DiagnosisResult } from "@/types/diagnosis";
import type { Gender } from "@/lib/mock/diagnosis";

/* ============================================================
   ページ間の状態受け渡し（sessionStorage ベースの簡易ストア）
   ------------------------------------------------------------
   /upload → /analyzing → /result の橋渡しに使用。
   将来は Supabase 等の永続化に差し替え可能。
   ============================================================ */

const KEY_IMAGE = "kirari:image";
const KEY_GENDER = "kirari:gender";
const KEY_RESULT = "kirari:result";
const KEY_UNLOCKED = "kirari:unlocked";

function safeGet(key: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key: string, value: string) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    /* quota / private mode は無視 */
  }
}

function safeRemove(key: string) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(key);
  } catch {
    /* noop */
  }
}

/* ---- アップロード画像 ---- */
export function saveImage(dataUrl: string) {
  safeSet(KEY_IMAGE, dataUrl);
}
export function loadImage(): string | null {
  return safeGet(KEY_IMAGE);
}
export function clearImage() {
  safeRemove(KEY_IMAGE);
}

/* ---- 性別（任意） ---- */
export function saveGender(g: Gender) {
  safeSet(KEY_GENDER, g);
}
export function loadGender(): Gender {
  return (safeGet(KEY_GENDER) as Gender) ?? "neutral";
}

/* ---- 診断結果 ---- */
export function saveResult(result: DiagnosisResult) {
  safeSet(KEY_RESULT, JSON.stringify(result));
}
export function loadResult(): DiagnosisResult | null {
  const raw = safeGet(KEY_RESULT);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as DiagnosisResult;
  } catch {
    return null;
  }
}
export function clearResult() {
  safeRemove(KEY_RESULT);
}

/* ---- 課金アンロック状態（モック） ---- */
export function setUnlocked(value: boolean) {
  safeSet(KEY_UNLOCKED, value ? "1" : "0");
}
export function isUnlocked(): boolean {
  return safeGet(KEY_UNLOCKED) === "1";
}

/** 画像削除（プライバシー導線用）。診断結果は残してもよいが画像は消す。 */
export function deleteUploadedImage() {
  clearImage();
}

/** すべてリセット。 */
export function resetAll() {
  clearImage();
  clearResult();
  safeRemove(KEY_GENDER);
  safeRemove(KEY_UNLOCKED);
}
