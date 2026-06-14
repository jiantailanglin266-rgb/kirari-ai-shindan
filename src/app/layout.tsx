import type { Metadata, Viewport } from "next";
import { M_PLUS_Rounded_1c } from "next/font/google";
import "./globals.css";

const rounded = M_PLUS_Rounded_1c({
  variable: "--font-rounded",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800", "900"],
  display: "swap",
});

const SITE_NAME = "Kirari AI 顔診断";

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} | AIがあなたの魅力を診断`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "顔写真をアップするだけで、モテタイプ・顔面魅力度・垢抜けポイント・AI美化画像を一瞬でレポート化。エンタメ目的のポジティブAI診断。",
  applicationName: SITE_NAME,
  keywords: ["AI顔診断", "顔面偏差値", "モテ診断", "垢抜け診断", "AI盛れ顔"],
  openGraph: {
    title: `${SITE_NAME} | AIがあなたの魅力を診断`,
    description:
      "モテタイプ・顔面魅力度・垢抜けポイント・AI美化画像を一瞬でレポート化。",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#fbcfe8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${rounded.variable} h-full antialiased`}>
      <body className="app-bg min-h-full flex flex-col font-sans text-ink">
        {children}
      </body>
    </html>
  );
}
