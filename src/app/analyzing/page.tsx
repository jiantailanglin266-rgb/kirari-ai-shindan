import type { Metadata } from "next";
import { AnalysisLoading } from "@/components/AnalysisLoading";

export const metadata: Metadata = {
  title: "AI鑑定中",
  robots: { index: false, follow: true },
};

export default function AnalyzingPage() {
  return (
    <main className="flex-1">
      <AnalysisLoading />
    </main>
  );
}
