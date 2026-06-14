import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PricingView } from "@/components/PricingView";

export const metadata: Metadata = {
  title: "料金プラン",
};

export default function PricingPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <PricingView />
      </main>
      <SiteFooter />
    </>
  );
}
