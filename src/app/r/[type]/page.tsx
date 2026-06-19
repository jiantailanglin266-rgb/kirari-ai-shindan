import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ResultView } from "@/components/ResultView";
import { FACE_TYPES, getTypeBySlug, rarityFromWeight } from "@/lib/faceTypes";
import { SITE } from "@/lib/site";

type Params = { type: string };

/** 12種のタイプ別ページを静的生成。 */
export function generateStaticParams(): Params[] {
  return FACE_TYPES.map((t) => ({ type: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { type } = await params;
  const ft = getTypeBySlug(type);
  if (!ft) return {};
  const rarity = rarityFromWeight(ft.weight);
  const title = `【${ft.name}】${ft.emoji}（${rarity.label}・出現率${rarity.percent}%）`;
  const description = `${ft.desc} あなたの人相タイプは何が出る？AIが顔から運勢を無料で人相鑑定🔮`;
  const ogImage = `${SITE.url}/og/${ft.slug}.png`;

  return {
    title,
    description,
    // 結果ページは検索インデックスしない（OGスクレイプは別途許可される）
    robots: { index: false, follow: true },
    alternates: { canonical: `${SITE.url}/r/${ft.slug}` },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      locale: SITE.locale,
      title: `${title}｜${SITE.name}`,
      description,
      images: [
        { url: ogImage, width: 1200, height: 630, alt: `${ft.name} - ${SITE.name}` },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title}｜${SITE.name}`,
      description,
      images: [ogImage],
    },
  };
}

export default async function ResultTypePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { type } = await params;
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <ResultView fallbackTypeSlug={type} />
      </main>
      <SiteFooter />
    </>
  );
}
