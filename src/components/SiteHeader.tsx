import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-2xl bg-brand-gradient text-white shadow-[var(--shadow-glow-pink)]">
            ✨
          </span>
          <span className="text-lg font-black text-ink">
            Kirari<span className="text-gradient"> AI</span>
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-sm font-bold text-ink-soft">
          <Link href="/pricing" className="rounded-full px-3 py-1.5 hover:bg-white/60">
            料金
          </Link>
          <Link
            href="/upload"
            className="rounded-full bg-brand-gradient px-4 py-1.5 text-white shadow-[var(--shadow-glow-pink)]"
          >
            無料診断
          </Link>
        </nav>
      </div>
    </header>
  );
}
