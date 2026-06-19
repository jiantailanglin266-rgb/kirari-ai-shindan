import type { Metadata, Viewport } from "next";
import { M_PLUS_Rounded_1c, Yuji_Syuku } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";
import { SiteJsonLd } from "@/components/JsonLd";

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

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | AIが顔から運勢を読み解く人相占い`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "人相学",
    "人相占い",
    "顔占い",
    "AI占い",
    "運勢診断",
    "開運",
    "観相",
    "人相鑑定",
  ],
  alternates: { canonical: `${SITE.url}/` },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: SITE.locale,
    url: absOg(),
    title: `${SITE.name} | AIが顔から運勢を読み解く人相占い`,
    description: SITE.description,
    images: [
      {
        url: `${SITE.url}${SITE.ogImage}`,
        width: 1200,
        height: 630,
        alt: `${SITE.name} — AI人相鑑定`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | AIが顔から運勢を読み解く人相占い`,
    description: SITE.description,
    images: [`${SITE.url}${SITE.ogImage}`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

function absOg() {
  return `${SITE.url}/`;
}

export const viewport: Viewport = {
  themeColor: "#04060c",
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
        <SiteJsonLd />
        {children}
      </body>
    </html>
  );
}
