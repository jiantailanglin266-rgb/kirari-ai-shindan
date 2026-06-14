import type { NextConfig } from "next";

/**
 * 公開設定。
 * 独自ドメイン petdogcat.jp の「ルート直下」で配信するため basePath は無し（""）。
 * もし GitHub Pages のプロジェクトパス等のサブパスで配信したい場合は
 * 環境変数 NEXT_PUBLIC_BASE_PATH="/kirari-ai-shindan" のように渡せば切替可能。
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

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
