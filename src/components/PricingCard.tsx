"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import type { Plan } from "@/lib/payment/checkout";
import { startCheckout } from "@/lib/payment/checkout";
import { setUnlocked } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PricingCard({
  plan,
  onPurchased,
}: {
  plan: Plan;
  onPurchased?: (planId: Plan["id"]) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleBuy() {
    setLoading(true);
    const res = await startCheckout(plan.id);
    setLoading(false);
    if (res.success) {
      setUnlocked(true);
      setDone(true);
      onPurchased?.(plan.id);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "relative rounded-[var(--radius-xl2)] p-[2px]",
        plan.highlight ? "bg-brand-gradient shadow-[var(--shadow-glow-purple)]" : "",
      )}
    >
      <div
        className={cn(
          "h-full rounded-[calc(var(--radius-xl2)-2px)] p-6",
          plan.highlight ? "glass-strong" : "glass",
        )}
      >
        {plan.badge && (
          <span
            className={cn(
              "inline-block rounded-full px-3 py-1 text-xs font-bold",
              plan.highlight
                ? "bg-brand-gradient text-white"
                : "bg-white/10 text-brand-purple",
            )}
          >
            {plan.badge}
          </span>
        )}

        <h3 className="mt-3 text-lg font-black text-ink">{plan.name}</h3>
        <div className="mt-1 flex items-end gap-1">
          <span className="text-4xl font-black text-gradient">
            ¥{plan.price.toLocaleString()}
          </span>
          <span className="mb-1 text-sm text-ink-soft">{plan.unit}</span>
        </div>

        <ul className="mt-4 space-y-2">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm text-ink">
              <span className="mt-0.5 grid h-4.5 w-4.5 shrink-0 place-items-center rounded-full bg-brand-gradient text-white">
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
              {f}
            </li>
          ))}
        </ul>

        <Button
          variant={plan.highlight ? "primary" : "secondary"}
          className="mt-6 w-full"
          onClick={handleBuy}
          disabled={loading || done}
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> 処理中…
            </>
          ) : done ? (
            <>
              <Check className="h-4 w-4" /> 解放しました！
            </>
          ) : (
            "このプランで鑑定する"
          )}
        </Button>
        <p className="mt-2 text-center text-[11px] text-ink-soft">
          ※ 現在はデモ決済（モック）です
        </p>
      </div>
    </motion.div>
  );
}
