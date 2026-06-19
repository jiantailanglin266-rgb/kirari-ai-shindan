import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { UploadBox } from "@/components/UploadBox";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "写真をアップロード",
  description:
    "顔写真をアップロード／撮影して、AI人相鑑定をはじめましょう。完全無料・登録不要・何回でもOK。重視する運（恋愛運・金運・総合運）も選べます。",
  alternates: { canonical: `${SITE.url}/upload` },
};

export default function UploadPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-md flex-1 px-4 py-6">
        <Link
          href="/"
          className="mb-4 inline-flex items-center gap-1 text-sm font-bold text-ink-soft hover:text-brand-purple"
        >
          <ArrowLeft className="h-4 w-4" /> もどる
        </Link>
        <h1 className="text-2xl font-black text-ink">写真をアップロード</h1>
        <p className="mt-1 mb-5 text-sm text-ink-soft">
          顔写真をアップ／撮影して、人相鑑定をはじめましょう🔮
        </p>
        <UploadBox />
      </main>
    </>
  );
}
