import Link from "next/link";
import {
  Camera,
  Wand2,
  ScrollText,
  Share2,
  Heart,
  Sparkles,
  Gift,
  RefreshCw,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { HeroSection } from "@/components/HeroSection";
import { CTAButton } from "@/components/CTAButton";
import { Card } from "@/components/ui/card";
import { PLANS } from "@/lib/payment/checkout";

const STEPS = [
  { icon: Camera, title: "写真をアップ", desc: "自撮りでもOK。1枚あれば診断できます。" },
  { icon: Wand2, title: "AIが解析", desc: "魅力を多角的にスコア化＆タイプ診断。" },
  { icon: ScrollText, title: "結果をレポート", desc: "垢抜けアドバイスとAI美化画像まで。" },
];

const FEATURES = [
  { emoji: "📊", title: "顔面魅力度スコア", desc: "8つの観点であなたの魅力を可視化。" },
  { emoji: "💘", title: "AIモテタイプ診断", desc: "あなたはどのモテタイプ？全12種。" },
  { emoji: "💄", title: "垢抜けアドバイス", desc: "髪型・メイク・服装・撮り方まで提案。" },
  { emoji: "🪄", title: "AI美化画像", desc: "韓国アイドル風〜3年後の自分まで生成。" },
  { emoji: "💞", title: "恋愛市場価値診断", desc: "マッチングアプリ映えや本命度をチェック。" },
  { emoji: "🎴", title: "SNSシェアカード", desc: "そのまま映える診断結果カードを保存。" },
];

const TYPES = [
  "👑 王子様系",
  "🌟 韓国俳優系",
  "🌷 清楚ヒロイン系",
  "💘 小悪魔アイドル系",
  "🖤 クールビューティー系",
  "☕ 優しそうな彼氏系",
  "💄 韓国女優系",
  "🏄 爽やかスポーツ系",
];

const BUZZ = [
  { icon: Share2, title: "SNSシェア", desc: "X・Instagram・TikTok・LINE対応" },
  { icon: Heart, title: "今日のモテ運", desc: "毎日チェックしたくなる占い要素" },
  { icon: Gift, title: "ガチャ風ランク演出", desc: "結果が出る瞬間がいちばん盛り上がる" },
  { icon: RefreshCw, title: "何度でも診断", desc: "別タイプ・別角度でAI加工し放題" },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />

        {/* 3ステップ */}
        <section className="mx-auto max-w-2xl px-4 py-10">
          <h2 className="text-center text-2xl font-black text-ink">
            たった<span className="text-gradient">3ステップ</span>
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {STEPS.map((s, i) => (
              <Card key={s.title} className="text-center">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-brand-gradient text-white">
                  <s.icon className="h-6 w-6" />
                </div>
                <p className="mt-3 text-xs font-bold text-brand-purple">
                  STEP {i + 1}
                </p>
                <p className="text-base font-black text-ink">{s.title}</p>
                <p className="mt-1 text-sm text-ink-soft">{s.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* 診断でわかること */}
        <section className="mx-auto max-w-2xl px-4 py-6">
          <h2 className="text-center text-2xl font-black text-ink">
            診断でわかること
          </h2>
          <p className="mt-2 text-center text-sm text-ink-soft">
            あなたの魅力を、ポジティブに丸ごと可視化✨
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <Card key={f.title} className="flex items-start gap-3">
                <span className="text-3xl">{f.emoji}</span>
                <div>
                  <p className="text-base font-black text-ink">{f.title}</p>
                  <p className="mt-0.5 text-sm text-ink-soft">{f.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* モテタイプ */}
        <section className="mx-auto max-w-2xl px-4 py-6">
          <h2 className="text-center text-2xl font-black text-ink">
            あなたは<span className="text-gradient">どのモテタイプ？</span>
          </h2>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {TYPES.map((t) => (
              <span
                key={t}
                className="rounded-full glass-strong px-4 py-2 text-sm font-bold text-ink"
              >
                {t}
              </span>
            ))}
            <span className="rounded-full bg-brand-gradient px-4 py-2 text-sm font-bold text-white">
              …全12種
            </span>
          </div>
        </section>

        {/* バズ要素 */}
        <section className="mx-auto max-w-2xl px-4 py-6">
          <div className="grid grid-cols-2 gap-3">
            {BUZZ.map((b) => (
              <Card key={b.title} className="text-center">
                <div className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-brand-purple-soft text-brand-purple">
                  <b.icon className="h-5 w-5" />
                </div>
                <p className="mt-2 text-sm font-black text-ink">{b.title}</p>
                <p className="text-xs text-ink-soft">{b.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* 料金ティザー */}
        <section className="mx-auto max-w-2xl px-4 py-8">
          <Card className="text-center">
            <span className="inline-flex items-center gap-1 rounded-full bg-brand-gradient px-3 py-1 text-xs font-bold text-white">
              <Sparkles className="h-3 w-3" /> 無料ではじめる
            </span>
            <h2 className="mt-3 text-xl font-black text-ink">
              基本診断はずっと無料
            </h2>
            <p className="mt-1 text-sm text-ink-soft">
              総合スコア・モテタイプ・簡易アドバイス・シェアカードまで無料。
              <br />
              もっと深く知りたい人はプレミアム診断へ。
            </p>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm font-bold text-ink">
              {PLANS.map((p) => (
                <span key={p.id} className="rounded-full bg-white/60 px-3 py-1">
                  {p.name} ¥{p.price.toLocaleString()}
                </span>
              ))}
            </div>
            <div className="mt-5 flex flex-col items-center gap-2">
              <CTAButton href="/upload" size="lg" className="w-full max-w-xs">
                無料で診断する ✨
              </CTAButton>
              <Link
                href="/pricing"
                className="text-xs font-bold text-brand-purple underline"
              >
                料金プランの詳細を見る
              </Link>
            </div>
          </Card>
        </section>

        {/* 最終CTA */}
        <section className="mx-auto max-w-2xl px-4 pb-4">
          <div className="relative overflow-hidden rounded-[var(--radius-xl2)] bg-brand-gradient p-8 text-center text-white shadow-[var(--shadow-glow-purple)]">
            <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/20 blur-xl" />
            <h2 className="relative text-2xl font-black">
              さっそく“盛れ未来”を見にいこう
            </h2>
            <p className="relative mt-2 text-sm opacity-95">
              あなたの魅力、まだ全部出しきれてないかも。
            </p>
            <div className="relative mt-5 flex justify-center">
              <CTAButton
                href="/upload"
                variant="secondary"
                size="lg"
                className="w-full max-w-xs !text-ink"
              >
                無料で診断する ✨
              </CTAButton>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
