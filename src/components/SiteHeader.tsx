import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-2xl bg-brand-gradient text-white shadow-[var(--shadow-glow-pink)]">
            🔮
          </span>
          <span className="text-lg font-black text-ink">
            人相鑑定<span className="neon-pink"> NEON</span>
          </span>
        </Link>
        <nav className="flex items-center gap-2 text-sm font-bold text-ink-soft">
          <span className="rounded-full border border-brand-blue/30 px-2.5 py-1 text-[11px] text-brand-blue">
            完全無料
          </span>
          <Link
            href="/upload"
            className="rounded-full bg-brand-gradient px-4 py-1.5 text-white shadow-[var(--shadow-glow-pink)]"
          >
            無料で鑑定
          </Link>
        </nav>
      </div>
    </header>
  );
}
