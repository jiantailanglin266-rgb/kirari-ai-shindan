import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PricingView } from "@/components/PricingView";
import { StickyCta } from "@/components/StickyCta";

export const metadata: Metadata = {
  title: "料金プラン",
  description:
    "人相鑑定 NEONの料金プラン。基本鑑定はずっと無料、詳細鑑定は1回500円〜、プレミアム鑑定980円、月額プラン980円。無料と有料の違いを比較できます。",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <PricingView />
        <div aria-hidden className="h-20 sm:hidden" />
      </main>
      <SiteFooter />
      <StickyCta />
    </>
  );
}
