import type { Metadata, Viewport } from "next";
import { M_PLUS_Rounded_1c, Yuji_Syuku } from "next/font/google";
import "./globals.css";

const rounded = M_PLUS_Rounded_1c({
  variable: "--font-rounded",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800", "900"],
  display: "swap",
});

const brush = Yuji_Syuku({
  variable: "--font-brush",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const SITE_NAME = "人相鑑定 NEON";

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} | AIが顔から運勢を読み解く`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "顔写真をアップするだけで、AIが東洋の人相学であなたの運勢・人相タイプ・恋愛運・金運・開運ポイントを一瞬で鑑定。ネオンに輝くエンタメ人相占い。",
  applicationName: SITE_NAME,
  keywords: ["人相学", "人相占い", "顔占い", "AI占い", "運勢診断", "開運"],
  openGraph: {
    title: `${SITE_NAME} | AIが顔から運勢を読み解く`,
    description:
      "AIが東洋の人相学で運勢・人相タイプ・恋愛運・金運・開運ポイントを鑑定。",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#070d12",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${rounded.variable} ${brush.variable} h-full antialiased`}
    >
      <body className="app-bg min-h-full flex flex-col font-sans text-ink">
        {children}
      </body>
    </html>
  );
}
