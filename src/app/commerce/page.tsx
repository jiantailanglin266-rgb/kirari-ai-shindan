import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記・運営者情報",
  description:
    "人相鑑定 NEONの特定商取引法に基づく表記と運営者情報。販売事業者・連絡先・料金・支払方法・提供時期・返金について。",
  alternates: { canonical: "/commerce" },
};

const ROWS: { label: string; value: string; todo?: boolean }[] = [
  { label: "サービス名", value: "人相鑑定 NEON" },
  { label: "販売事業者", value: "（運営者にて記入）", todo: true },
  { label: "運営責任者", value: "（運営者にて記入）", todo: true },
  { label: "所在地", value: "（請求があれば遅滞なく開示します／運営者にて記入）", todo: true },
  { label: "お問い合わせ", value: "（連絡先メールアドレスを記入）", todo: true },
  {
    label: "販売価格",
    value:
      "1回鑑定 500円 / プレミアム鑑定 980円 / 月額プラン 980円（いずれも税込・各ページに表示）",
  },
  { label: "商品代金以外の必要料金", value: "通信料はお客様のご負担となります。" },
  { label: "支払方法", value: "クレジットカード等（決済代行：Stripe を予定／現在はデモ決済）" },
  { label: "支払時期", value: "都度課金は購入時、月額プランは毎月課金日に決済されます。" },
  {
    label: "提供時期",
    value: "決済完了後ただちにオンラインで鑑定結果・機能をご利用いただけます。",
  },
  {
    label: "返品・キャンセル",
    value:
      "デジタルコンテンツの性質上、提供開始後の返金は原則できません。月額プランは次回更新日の前日までにいつでも解約できます。",
  },
  { label: "動作環境", value: "最新のモバイル／PCブラウザ（JavaScript有効）" },
];

export default function CommercePage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-6">
        <Link
          href="/"
          className="mb-4 inline-flex items-center gap-1 text-sm font-bold text-ink-soft hover:text-brand-purple"
        >
          <ArrowLeft className="h-4 w-4" /> もどる
        </Link>
        <h1 className="text-2xl font-black text-ink">
          特定商取引法に基づく表記
        </h1>
        <p className="mt-1 text-xs text-ink-soft">
          有料プランの提供にあたっての事業者情報です。
        </p>

        <Card className="mt-4">
          <dl className="divide-y divide-white/10">
            {ROWS.map((r) => (
              <div
                key={r.label}
                className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-[8rem_1fr] sm:gap-4"
              >
                <dt className="text-sm font-bold text-brand-purple">
                  {r.label}
                </dt>
                <dd
                  className={`text-sm ${r.todo ? "text-brand-pink" : "text-ink-soft"}`}
                >
                  {r.value}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 rounded-xl border border-brand-pink/30 bg-brand-pink/10 px-3 py-2 text-xs text-ink-soft">
            ※「（運営者にて記入）」の項目は、実際の事業者情報に置き換えてください。
            有料課金を有効化する前に必須の表記です。
          </p>
        </Card>
      </main>
      <SiteFooter />
    </>
  );
}
