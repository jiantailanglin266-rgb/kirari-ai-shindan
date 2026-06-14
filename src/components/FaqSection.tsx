import { ChevronDown } from "lucide-react";
import { FAQS } from "@/lib/site";

export function FaqSection() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="mx-auto max-w-2xl px-4 py-8"
    >
      <h2
        id="faq-heading"
        className="text-center text-2xl font-black text-ink"
      >
        よくある<span className="text-gradient">質問</span>
      </h2>
      <p className="mt-2 text-center text-sm text-ink-soft">
        はじめての方へ。気になることをチェック🔮
      </p>

      <div className="mt-6 space-y-2.5">
        {FAQS.map((f) => (
          <details
            key={f.q}
            className="group glass rounded-2xl px-4 py-3 [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-bold text-ink">
              <span className="flex items-start gap-2">
                <span className="text-brand-blue" aria-hidden>
                  Q.
                </span>
                {f.q}
              </span>
              <ChevronDown
                className="h-5 w-5 shrink-0 text-brand-purple transition-transform group-open:rotate-180"
                aria-hidden
              />
            </summary>
            <p className="mt-2.5 pl-6 text-sm leading-relaxed text-ink-soft">
              {f.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
