import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Tailwind クラスを安全に結合するヘルパー（shadcn/ui 互換）。 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** 0〜100 にクランプ。 */
export function clampScore(n: number) {
  return Math.max(0, Math.min(100, Math.round(n)));
}
