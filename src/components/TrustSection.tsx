import { ShieldCheck, Zap, Smartphone, Lock } from "lucide-react";

const POINTS = [
  {
    icon: Zap,
    title: "完全無料・登録不要",
    desc: "会員登録も課金もなし。写真1枚で何回でも鑑定できます。",
  },
  {
    icon: Lock,
    title: "写真は端末内のみ",
    desc: "アップロード画像はセッション内に一時保存。いつでも削除でき、第三者提供はしません。",
  },
  {
    icon: Smartphone,
    title: "スマホ最適化",
    desc: "片手で完結。結果はそのままSNSでシェアできます。",
  },
  {
    icon: ShieldCheck,
    title: "傷つけない設計",
    desc: "年齢・人種・健康の判定はしません。必ずポジティブに読み解くエンタメ占いです。",
  },
];

export function TrustSection() {
  return (
    <section
      aria-labelledby="trust-heading"
      className="mx-auto max-w-2xl px-4 py-6"
    >
      <h2
        id="trust-heading"
        className="text-center text-2xl font-black text-ink"
      >
        選ばれる<span className="text-gradient">理由</span>
      </h2>
      <div className="mt-6 grid grid-cols-2 gap-3">
        {POINTS.map((p) => (
          <div key={p.title} className="glass rounded-2xl p-4">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-gradient text-white shadow-[var(--shadow-glow-pink)]">
              <p.icon className="h-5 w-5" aria-hidden />
            </div>
            <p className="mt-2.5 text-sm font-black text-ink">{p.title}</p>
            <p className="mt-1 text-xs leading-relaxed text-ink-soft">
              {p.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
