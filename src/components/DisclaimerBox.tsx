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
        "flex items-start gap-3 rounded-2xl bg-white/5 border border-white/15 px-4 py-3 text-sm text-ink-soft",
        className,
      )}
    >
      <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-brand-purple" />
      <p className="leading-relaxed">
        {children ??
          "本鑑定はエンタメ目的です。AIが人相学をモチーフにあなたの運勢をポジティブに読み解くもので、医学的・科学的・職業的な評価ではありません。"}
      </p>
    </div>
  );
}
