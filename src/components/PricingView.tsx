"use client";

import { useRouter } from "next/navigation";
import { Check, X } from "lucide-react";
import { PLANS } from "@/lib/payment/checkout";
import { PricingCard } from "@/components/PricingCard";
import { Card } from "@/components/ui/card";

const COMPARE: { label: string; free: boolean; premium: boolean }[] = [
  { label: "総合運勢 & ランク", free: true, premium: true },
  { label: "人相タイプ鑑定", free: true, premium: true },
  { label: "簡易アドバイス", free: true, premium: true },
  { label: "シェアカード", free: true, premium: true },
  { label: "詳細運勢8項目", free: false, premium: true },
  { label: "開運フェイス（全モード）", free: false, premium: true },
  { label: "人相の深掘り鑑定", free: false, premium: true },
  { label: "恋愛運・金運の詳細", free: false, premium: true },
  { label: "開運プラン & プロフ改善", free: false, premium: true },
];

export function PricingView() {
  const router = useRouter();

  function handlePurchased() {
    // モック決済成功 → 結果ページで解放状態を反映
    router.push("/result");
  }

  return (
    <div className="mx-auto w-full max-w-2xl space-y-8 px-4 py-8">
      <header className="text-center">
        <h1 className="text-3xl font-black text-ink">料金プラン</h1>
        <p className="mt-2 text-sm text-ink-soft">
          基本鑑定はずっと無料。もっと深く視てほしい人だけプレミアムへ🔮
        </p>
        <p className="mx-auto mt-3 max-w-md rounded-full border border-brand-blue/25 bg-white/5 px-4 py-1.5 text-xs font-bold text-ink">
          対面の人相鑑定なら数千円〜。AIなら<span className="text-gradient">まず無料</span>、詳細でもワンコイン〜。
        </p>
      </header>

      {/* 無料 vs 有料 比較 */}
      <Card>
        <div className="grid grid-cols-[1fr_auto_auto] gap-x-3 gap-y-1 text-sm">
          <div className="pb-2 font-black text-ink">機能</div>
          <div className="pb-2 text-center font-black text-ink-soft">無料</div>
          <div className="pb-2 text-center font-black text-gradient">有料</div>
          {COMPARE.map((row) => (
            <div key={row.label} className="contents">
              <div className="border-t border-white/10 py-2 text-ink">
                {row.label}
              </div>
              <div className="grid place-items-center border-t border-white/10 py-2">
                {row.free ? (
                  <Check className="h-4 w-4 text-brand-mint" strokeWidth={3} />
                ) : (
                  <X className="h-4 w-4 text-ink-soft/40" />
                )}
              </div>
              <div className="grid place-items-center border-t border-white/10 py-2">
                {row.premium ? (
                  <Check className="h-4 w-4 text-brand-pink" strokeWidth={3} />
                ) : (
                  <X className="h-4 w-4 text-ink-soft/40" />
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* プランカード */}
      <div className="grid gap-4 sm:grid-cols-3">
        {PLANS.map((plan) => (
          <PricingCard key={plan.id} plan={plan} onPurchased={handlePurchased} />
        ))}
      </div>

      <p className="text-center text-xs text-ink-soft">
        現在の決済はデモ（モック）です。Stripe接続後に実決済へ切り替わります。
        <br />
        本鑑定はエンタメ目的のサービスです。
      </p>
    </div>
  );
}
