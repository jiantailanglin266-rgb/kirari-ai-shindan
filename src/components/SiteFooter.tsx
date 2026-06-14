import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-white/5">
      <div className="mx-auto max-w-2xl px-4 py-8 text-center text-sm text-ink-soft">
        <p className="text-base font-black text-ink">
          人相鑑定<span className="neon-pink"> NEON</span>
        </p>
        <p className="mt-1 text-xs">
          本サービスはエンタメ目的です。鑑定結果は医学的・科学的・職業的評価ではありません。
        </p>
        <nav className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-bold">
          <Link href="/" className="hover:text-brand-purple">
            ホーム
          </Link>
          <Link href="/pricing" className="hover:text-brand-purple">
            料金
          </Link>
          <Link href="/privacy" className="hover:text-brand-purple">
            プライバシーポリシー
          </Link>
        </nav>
        <p className="mt-4 text-[11px] text-ink-soft/80">
          © {new Date().getFullYear()} 人相鑑定 NEON. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
