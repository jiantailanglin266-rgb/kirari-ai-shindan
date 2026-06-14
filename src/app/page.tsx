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
import { TrustSection } from "@/components/TrustSection";
import { FaqSection } from "@/components/FaqSection";
import { StickyCta } from "@/components/StickyCta";
import { FaqJsonLd } from "@/components/JsonLd";

const STEPS = [
  { icon: Camera, title: "写真をアップ", desc: "自撮りでもOK。1枚あれば鑑定できます。" },
  { icon: Wand2, title: "AIが観相", desc: "顔の各パーツから運勢を読み解きます。" },
  { icon: ScrollText, title: "運勢をレポート", desc: "開運アドバイスと開運フェイスまで。" },
];

const FEATURES = [
  { emoji: "🔮", title: "総合運勢スコア", desc: "8つの運をスコアで丸ごと可視化。" },
  { emoji: "🐉", title: "人相タイプ鑑定", desc: "あなたはどの人相？漢字で全12種。" },
  { emoji: "🌿", title: "開運アドバイス", desc: "髪型・眉・表情で運気を底上げ。" },
  { emoji: "🚀", title: "開運フェイス生成", desc: "福相〜三年後の開運顔までAI生成。" },
  { emoji: "💗", title: "恋愛運・金運レポート", desc: "出会い運や結婚運・財運まで鑑定。" },
  { emoji: "🎴", title: "SNSシェアカード", desc: "そのまま映える鑑定結果カードを保存。" },
];

const TYPES = [
  "🍑 福相",
  "🐉 龍相",
  "🦚 鳳眼",
  "🌸 慈愛相",
  "🦉 智将相",
  "💰 金運相",
  "🌷 桃花相",
  "🌙 仙風相",
];

const BUZZ = [
  { icon: Share2, title: "SNSシェア", desc: "X・Instagram・TikTok・LINE対応" },
  { icon: Heart, title: "今日の運勢", desc: "毎日チェックしたくなる開運占い" },
  { icon: Gift, title: "ガチャ風ランク演出", desc: "結果が出る瞬間がいちばん盛り上がる" },
  { icon: RefreshCw, title: "何度でも鑑定", desc: "別の運・開運フェイスで何度でも" },
];

export default function Home() {
  return (
    <>
      <FaqJsonLd />
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
            鑑定でわかること
          </h2>
          <p className="mt-2 text-center text-sm text-ink-soft">
            あなたの運勢を、ポジティブに丸ごと鑑定🔮
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
            あなたは<span className="text-gradient">どの人相？</span>
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

        {/* 選ばれる理由 */}
        <TrustSection />

        {/* 完全無料バナー */}
        <section className="mx-auto max-w-2xl px-4 py-8">
          <Card className="text-center">
            <span className="inline-flex items-center gap-1 rounded-full bg-brand-gradient px-3 py-1 text-xs font-bold text-white">
              <Sparkles className="h-3 w-3" /> 完全無料
            </span>
            <h2 className="mt-3 text-xl font-black text-ink">
              ぜんぶ無料。<span className="text-gradient">何回でも</span>鑑定OK
            </h2>
            <p className="mt-1 text-sm text-ink-soft">
              総合運勢・詳細運勢・人相タイプ・開運アドバイス・開運フェイス・シェアカードまで、
              <br className="hidden sm:block" />
              登録もお金も不要。気になる運を何度でも占えます。
            </p>
            <div className="mt-5 flex justify-center">
              <CTAButton href="/upload" size="lg" className="w-full max-w-xs">
                無料で鑑定する 🔮
              </CTAButton>
            </div>
          </Card>
        </section>

        {/* FAQ */}
        <FaqSection />

        {/* 最終CTA */}
        <section className="mx-auto max-w-2xl px-4 pb-4">
          <div className="relative overflow-hidden rounded-[var(--radius-xl2)] bg-brand-gradient p-8 text-center text-white shadow-[var(--shadow-glow-purple)]">
            <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/20 blur-xl" />
            <h2 className="relative text-2xl font-black">
              さっそく“開運”を観にいこう
            </h2>
            <p className="relative mt-2 text-sm opacity-95">
              あなたの運、まだ全部開ききっていないかも。
            </p>
            <div className="relative mt-5 flex justify-center">
              <CTAButton
                href="/upload"
                variant="secondary"
                size="lg"
                className="w-full max-w-xs !text-ink"
              >
                無料で鑑定する 🔮
              </CTAButton>
            </div>
          </div>
        </section>
        <div aria-hidden className="h-20 sm:hidden" />
      </main>
      <SiteFooter />
      <StickyCta />
    </>
  );
}
