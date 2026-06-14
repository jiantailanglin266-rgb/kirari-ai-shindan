import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ResultView } from "@/components/ResultView";

export const metadata: Metadata = {
  title: "鑑定結果",
};

export default function ResultPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <ResultView />
      </main>
      <SiteFooter />
    </>
  );
}
