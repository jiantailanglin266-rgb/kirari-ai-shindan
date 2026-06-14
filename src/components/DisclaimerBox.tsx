import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function DisclaimerBox({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-2xl bg-white/55 border border-white px-4 py-3 text-sm text-ink-soft",
        className,
      )}
    >
      <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-brand-purple" />
      <p className="leading-relaxed">
        {children ??
          "診断はエンタメ目的です。あなたの魅力をポジティブに可視化するAI診断であり、医学的・科学的・職業的な評価ではありません。"}
      </p>
    </div>
  );
}
