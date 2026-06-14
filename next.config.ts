import type { NextConfig } from "next";

/**
 * GitHub Pages（プロジェクトページ）公開用の設定。
 * 本番ビルド時のみ basePath = "/<repo>" を付与します。
 * dev / Vercel など別環境では NEXT_PUBLIC_BASE_PATH="" を渡せば無効化できます。
 */
const repo = "kirari-ai-shindan";
const isProd = process.env.NODE_ENV === "production";
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ?? (isProd ? `/${repo}` : "");

const nextConfig: NextConfig = {
  output: "export", // 静的エクスポート（out/）
  trailingSlash: true, // GitHub Pages でのディレクトリ解決を安定化
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true }, // 静的エクスポートでは画像最適化を無効化
  env: {
    // クライアントから public 配下の画像パスを解決するために公開
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
