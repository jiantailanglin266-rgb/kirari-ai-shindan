import type { Metadata } from "next";
import { AnalysisLoading } from "@/components/AnalysisLoading";

export const metadata: Metadata = {
  title: "AI解析中",
};

export default function AnalyzingPage() {
  return (
    <main className="flex-1">
      <AnalysisLoading />
    </main>
  );
}
