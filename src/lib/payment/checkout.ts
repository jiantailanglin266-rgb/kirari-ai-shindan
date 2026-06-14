/* ============================================================
   決済（モック）
   ------------------------------------------------------------
   現時点ではモックで「購入成功」を返します。
   将来的に Stripe Checkout を接続する場合は
   createCheckoutSession() を実装し、startCheckout() の分岐を
   差し替えてください。
   ============================================================ */

export type PlanId = "single" | "premium" | "monthly";

export type Plan = {
  id: PlanId;
  name: string;
  price: number;
  unit: string;
  features: string[];
  highlight?: boolean;
  badge?: string;
};

export const PLANS: Plan[] = [
  {
    id: "single",
    name: "1回鑑定",
    price: 500,
    unit: "/ 1回",
    features: [
      "詳細運勢8項目フル公開",
      "開運フェイス 3枚",
      "恋愛運・金運の詳細鑑定",
      "開運プラン",
    ],
  },
  {
    id: "premium",
    name: "プレミアム鑑定",
    price: 980,
    unit: "/ 1回",
    highlight: true,
    badge: "いちばん人気",
    features: [
      "1回鑑定のすべて",
      "開運フェイス 7モード全部",
      "人相の深掘り鑑定",
      "SNSプロフ開運アドバイス",
      "高解像度シェアカード",
    ],
  },
  {
    id: "monthly",
    name: "月額プラン",
    price: 980,
    unit: "/ 月",
    badge: "通い放題",
    features: [
      "毎日何回でも鑑定し放題",
      "全開運フェイス使い放題",
      "新機能を先行利用",
      "今日の運勢を毎日通知",
    ],
  },
];

const USE_REAL_STRIPE = process.env.NEXT_PUBLIC_USE_REAL_STRIPE === "true";

export type CheckoutResult = {
  success: boolean;
  plan: PlanId;
  mock: boolean;
};

/** 本番 Stripe のスタブ（未実装）。 */
async function createCheckoutSession(plan: PlanId): Promise<CheckoutResult> {
  // TODO: /api/checkout で Stripe Checkout Session を作成して redirect。
  // const res = await fetch("/api/checkout", {
  //   method: "POST",
  //   body: JSON.stringify({ plan }),
  // });
  // const { url } = await res.json();
  // window.location.href = url;
  console.warn("[checkout] real Stripe not implemented — using mock");
  return mockCheckout(plan);
}

/** モック決済。一定時間後に成功を返す。 */
export async function mockCheckout(plan: PlanId): Promise<CheckoutResult> {
  await new Promise((r) => setTimeout(r, 900));
  return { success: true, plan, mock: true };
}

export async function startCheckout(plan: PlanId): Promise<CheckoutResult> {
  return USE_REAL_STRIPE ? createCheckoutSession(plan) : mockCheckout(plan);
}
