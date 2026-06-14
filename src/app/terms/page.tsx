import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Card } from "@/components/ui/card";
import { LegalSection } from "@/components/LegalSection";

export const metadata: Metadata = {
  title: "利用規約",
};

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-6">
        <Link
          href="/"
          className="mb-4 inline-flex items-center gap-1 text-sm font-bold text-ink-soft hover:text-brand-purple"
        >
          <ArrowLeft className="h-4 w-4" /> もどる
        </Link>
        <h1 className="text-2xl font-black text-ink">利用規約</h1>
        <p className="mt-1 text-xs text-ink-soft">最終更新日: 2026年6月14日</p>

        <Card className="mt-4">
          <p className="text-sm leading-relaxed text-ink-soft">
            本利用規約（以下「本規約」）は、Kirari
            AI顔診断（以下「本サービス」）の利用条件を定めるものです。ユーザーは本サービスを利用することで、本規約に同意したものとみなします。
          </p>

          <LegalSection title="1. サービスの目的（エンタメ目的）">
            <p>
              本サービスはエンタメ目的の顔診断サービスです。診断結果は医学的・科学的・職業的な評価ではなく、いかなる事実・能力・価値を保証・断定するものでもありません。
            </p>
            <p>
              本サービスは、実年齢の推定、人種・民族の判定、健康状態・病気・整形等の判定を行いません。
            </p>
          </LegalSection>

          <LegalSection title="2. アップロード画像の取り扱い">
            <p>アップロードされた画像は、診断目的にのみ使用します。</p>
            <p>
              ユーザーの同意なく第三者に提供することはありません。画像はユーザーの操作により削除できます。
            </p>
          </LegalSection>

          <LegalSection title="3. 禁止事項">
            <p>以下の行為を禁止します。</p>
            <ul className="ml-4 list-disc space-y-1">
              <li>不適切・違法な画像、公序良俗に反する画像のアップロード</li>
              <li>他人の写真を、本人の許可なくアップロードする行為</li>
              <li>本サービスの運営を妨害する行為、不正アクセス等</li>
              <li>診断結果を用いて他者を中傷・差別する行為</li>
            </ul>
          </LegalSection>

          <LegalSection title="4. 知的財産権">
            <p>
              本サービスに関する著作権・商標権その他の知的財産権は、運営者または正当な権利者に帰属します。
            </p>
          </LegalSection>

          <LegalSection title="5. 料金・決済">
            <p>
              一部機能は有料です。料金・プランは
              <Link href="/pricing" className="font-bold text-brand-purple underline">
                料金ページ
              </Link>
              に表示します（提供初期はデモ決済の場合があります）。
            </p>
          </LegalSection>

          <LegalSection title="6. 免責事項">
            <p>
              本サービスは、診断結果の正確性・有用性について保証しません。本サービスの利用により生じた損害について、運営者は法令に反しない範囲で責任を負いません。
            </p>
          </LegalSection>

          <LegalSection title="7. 未成年の利用">
            <p>
              未成年の方が利用する場合は、保護者の同意のうえご利用ください。本サービスは性的・侮辱的な表現を避けて設計しています。
            </p>
          </LegalSection>

          <LegalSection title="8. 規約の変更">
            <p>
              運営者は、必要に応じて本規約を変更できます。変更後の規約は本ページに掲示した時点で効力を生じます。
            </p>
          </LegalSection>
        </Card>
      </main>
      <SiteFooter />
    </>
  );
}
