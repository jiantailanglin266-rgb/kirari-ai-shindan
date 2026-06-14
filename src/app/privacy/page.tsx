import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Card } from "@/components/ui/card";
import { LegalSection } from "@/components/LegalSection";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
};

export default function PrivacyPage() {
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
        <h1 className="text-2xl font-black text-ink">プライバシーポリシー</h1>
        <p className="mt-1 text-xs text-ink-soft">最終更新日: 2026年6月14日</p>

        <Card className="mt-4">
          <p className="text-sm leading-relaxed text-ink-soft">
            人相鑑定
            NEON（以下「本サービス」）は、ユーザーのプライバシーを尊重し、個人情報・画像データを適切に取り扱います。
          </p>

          <LegalSection title="1. 取得する情報">
            <ul className="ml-4 list-disc space-y-1">
              <li>ユーザーがアップロードする顔写真等の画像</li>
              <li>診断タイプ等、ユーザーが入力する任意の情報</li>
              <li>サービス改善のための匿名のアクセス情報</li>
            </ul>
          </LegalSection>

          <LegalSection title="2. 画像の利用目的と保存">
            <p>
              アップロードされた画像は、AI診断を行う目的にのみ使用します。現在の構成では、画像はユーザーの端末内（ブラウザのセッション）に一時的に保持され、診断後に
              <Link href="/result" className="font-bold text-brand-purple underline">
                結果ページ
              </Link>
              の削除ボタン、またはブラウザを閉じることで削除できます。
            </p>
            <p>
              将来サーバー保存を行う場合も、診断目的の範囲に限定し、保存期間・削除方法を明示します。
            </p>
          </LegalSection>

          <LegalSection title="3. やらないこと（安全への配慮）">
            <p>本サービスは、以下を行いません。</p>
            <ul className="ml-4 list-disc space-y-1">
              <li>実年齢の推定</li>
              <li>人種・民族の判定</li>
              <li>健康状態・病気・整形の有無の判定</li>
              <li>ユーザーを傷つける表現での評価</li>
            </ul>
          </LegalSection>

          <LegalSection title="4. 第三者提供">
            <p>
              法令に基づく場合を除き、ユーザーの同意なく個人情報・画像を第三者に提供しません。
            </p>
          </LegalSection>

          <LegalSection title="5. 外部サービス">
            <p>
              本サービスは、AI解析・画像生成・決済・分析等のために外部サービスを利用する場合があります。各外部サービスのプライバシーポリシーが適用されます。
            </p>
          </LegalSection>

          <LegalSection title="6. お問い合わせ">
            <p>
              本ポリシーに関するお問い合わせは、サービス内のお問い合わせ窓口までご連絡ください。
            </p>
          </LegalSection>
        </Card>
      </main>
      <SiteFooter />
    </>
  );
}
