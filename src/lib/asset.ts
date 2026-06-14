/**
 * public 配下の静的ファイル（画像など）のパスを basePath 付きで解決する。
 * GitHub Pages のプロジェクトページ（/<repo>/）対応。
 * data: / blob: / http(s): のURLはそのまま返す。
 */
export function asset(path: string): string {
  if (
    !path ||
    path.startsWith("data:") ||
    path.startsWith("blob:") ||
    path.startsWith("http://") ||
    path.startsWith("https://")
  ) {
    return path;
  }
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (!path.startsWith("/")) return path;
  return `${base}${path}`;
}
