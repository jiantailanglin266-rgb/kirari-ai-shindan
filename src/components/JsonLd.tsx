import { SITE, absUrl, FAQS } from "@/lib/site";

/** JSON-LD を埋め込む共通コンポーネント。 */
function JsonLdScript({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // 構造化データ。XSSの懸念がない静的データのみを渡すこと。
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** サイト全体の構造化データ（Organization / WebSite / WebApplication）。 */
export function SiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": absUrl("/#organization"),
        name: SITE.name,
        url: absUrl("/"),
        logo: absUrl(SITE.ogImage),
        description: SITE.description,
      },
      {
        "@type": "WebSite",
        "@id": absUrl("/#website"),
        name: SITE.name,
        url: absUrl("/"),
        inLanguage: "ja",
        publisher: { "@id": absUrl("/#organization") },
        description: SITE.description,
      },
      {
        "@type": "WebApplication",
        "@id": absUrl("/#webapp"),
        name: SITE.name,
        url: absUrl("/"),
        applicationCategory: "LifestyleApplication",
        operatingSystem: "Web",
        inLanguage: "ja",
        browserRequirements: "Requires JavaScript",
        description: SITE.description,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "JPY",
          name: "完全無料",
        },
      },
    ],
  };
  return <JsonLdScript data={data} />;
}

/** FAQ の構造化データ（FAQPage）。 */
export function FaqJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return <JsonLdScript data={data} />;
}
