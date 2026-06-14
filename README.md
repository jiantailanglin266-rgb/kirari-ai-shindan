# 人相鑑定 NEON 🔮

AIが東洋の人相学（観相）であなたの運勢を読み解く、人相占いアプリ（MVP）。
ネオン看板トンマナ（ダーク背景×発光）×漢字の世界観。スマホファーストで、TikTok / Instagram / X でシェアされやすいエンタメ占いアプリです。

> 顔写真をアップするだけで、総合運勢・人相タイプ（漢字で全12種）・恋愛運・金運・開運ポイント・開運フェイスを一瞬で鑑定。
> 低スコアでも必ずポジティブに変換し、ユーザーを傷つけない設計です（エンタメ目的）。

## 技術スタック

- **Next.js 16**（App Router / Turbopack）+ **TypeScript**
- **Tailwind CSS v4**（CSSベースのデザイントークン）
- **shadcn/ui 互換**の自作UIプリミティブ（`class-variance-authority`）
- **Framer Motion**（アニメーション）
- **Supabase**（任意接続：履歴・画像管理）
- **html-to-image**（シェアカードのPNG書き出し）
- Vercel デプロイ前提

## 起動

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 本番ビルド
```

`.env.local` は `.env.example` をコピーして設定（未設定でもモックで全機能動作します）。

## ページ構成

| ルート | 内容 |
| --- | --- |
| `/` | LPトップ（ネオンロゴ・特徴・人相タイプ・料金ティザー・CTA） |
| `/upload` | 写真アップロード（カメラ撮影 / 画像選択 / 規約同意 / タイプ選択） |
| `/analyzing` | AI解析中演出（ステップ表示・スキャンアニメ） |
| `/result` | 鑑定結果（運勢スコア・レーダー・人相タイプ・恋愛/金運・開運アドバイス・開運フェイス・シェア） |
| `/pricing` | 料金プラン（無料/有料比較・モック決済） |
| `/terms` | 利用規約 |
| `/privacy` | プライバシーポリシー |

## 主なコンポーネント（`src/components/`）

`HeroSection` / `UploadBox` / `AnalysisLoading` / `ScoreCard` / `RankBadge` /
`RadarChart` / `ScoreBar` / `CircularGauge` / `MotetypeCard` / `BeautyAdviceCard` /
`BeautyStudio` / `BeforeAfterImage` / `ShareResultCard` / `PricingCard` /
`PricingView` / `PremiumGate` / `CTAButton` / `DisclaimerBox` / `SiteHeader` / `SiteFooter`

## データ & AI接続（差し替え可能な設計）

- 型定義: `src/types/diagnosis.ts`（`DiagnosisResult` など）
- ダミーデータ: `src/lib/mock/diagnosis.ts`（`generateMockDiagnosis()`）
- 顔解析: `src/lib/ai/analyzeFace.ts`
  - 現状は `mockAnalyzeFace()`。`NEXT_PUBLIC_USE_REAL_AI=true` で `analyzeFaceWithAI()`（スタブ）へ。
- 画像生成: `src/lib/ai/generateBeautyImage.ts`
  - 現状はモック画像URL。同フラグで本番実装へ差し替え可能。
- 決済: `src/lib/payment/checkout.ts`
  - 現状はモック。`NEXT_PUBLIC_USE_REAL_STRIPE=true` で Stripe（スタブ）へ。
- ページ間状態: `src/lib/store.ts`（sessionStorage。将来 Supabase へ）

### 本番APIへの繋ぎ方（例）

1. `app/api/analyze/route.ts` を作成し、画像を受けて解析結果を返す。
2. `analyzeFaceWithAI()` 内の `fetch("/api/analyze")` を有効化し、レスポンスを `DiagnosisResult` にマッピング。
3. `.env.local` に `NEXT_PUBLIC_USE_REAL_AI=true` を設定。

画像生成・決済も同じパターン（スタブ関数の中身を実装→フラグON）。

## 安全・コンプライアンス設計

- 実年齢推定 / 人種・民族判定 / 健康・病気・整形の断定は **行わない**
- 「ブサイク」「老けている」等のネガティブ表現は **使わない**（必ずポジティブ変換）
- 人相鑑定はエンタメ目的と明記（フッター・規約・鑑定画面）
- 未成年配慮（性的すぎる表現を避ける）
- アップロード画像はセッション内のみ保持、結果画面から削除可能
- 利用規約 / プライバシーポリシーを同梱

## グロース要素

SNSシェア（X / Instagram保存 / TikTok保存 / LINE）・今日の運勢・ガチャ風ランク演出・
「もう一度診断」「別タイプで加工」「3年後の自分」など、シェア＆再訪を促す導線を実装。
