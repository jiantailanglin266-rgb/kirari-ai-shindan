"use client";

import { useEffect, useState } from "react";
import { CTAButton } from "@/components/CTAButton";

/**
 * モバイル専用の固定CTAバー。
 * ヒーローを通り過ぎてから（=400px以上スクロール）下部にせり上がる。
 * CVR改善: 縦長ページのどこからでも0タップで鑑定を開始できる。
 */
export function StickyCta({
  label = "無料で鑑定する 🔮",
  href = "/upload",
}: {
  label?: string;
  href?: string;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 sm:hidden transition-transform duration-300 ${
        show ? "translate-y-0" : "translate-y-[130%]"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="glass-strong border-t border-white/15 px-4 pb-3 pt-2.5">
        <CTAButton href={href} size="lg" className="w-full" shine={false}>
          {label}
        </CTAButton>
      </div>
    </div>
  );
}
