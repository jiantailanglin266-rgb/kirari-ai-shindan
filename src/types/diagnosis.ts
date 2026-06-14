/* ============================================================
   診断結果の型定義
   ※ 将来 AI API のレスポンスをこの型にマッピングする想定。
   ============================================================ */

/** ランク。SSS〜C。低くてもネガティブにしないこと。 */
export type Rank = "SSS" | "SS" | "S" | "A" | "B" | "C";

/** 詳細スコア（すべて 0〜100）。 */
export type DetailScores = {
  /** 清潔感 */
  cleanliness: number;
  /** 目元の印象 */
  eyes: number;
  /** 親近感 */
  friendliness: number;
  /** 色気 */
  sexiness: number;
  /** 華やかさ / オーラ */
  aura: number;
  /** 知的さ */
  intelligence: number;
  /** 写真映え（ミステリアス度を含む華） */
  photogenic: number;
  /** 恋愛引力 */
  loveAttraction: number;
};

/** 恋愛診断レポート。 */
export type LoveReport = {
  firstImpression: string;
  oppositeSexImpression: string;
  datingAppScore: string;
  seriousLovePotential: string;
  approachability: string;
  gapCharm: string;
};

/** AI美容アドバイス。 */
export type BeautyAdvice = {
  hairstyle: string;
  eyebrows: string;
  fashion: string;
  skin: string;
  photoAngle: string;
  profilePhoto: string;
};

/** AI美化画像の生成モード。 */
export type BeautyMode =
  | "natural"
  | "kpop"
  | "model"
  | "clear"
  | "business"
  | "anime"
  | "future";

/** AI美化画像（モック or 生成）。 */
export type BeautyImage = {
  mode: BeautyMode;
  label: string;
  description: string;
  url: string;
  /** 有料機能かどうか（無料はナチュラルのみ等の出し分けに使用）。 */
  premium: boolean;
};

/** 診断結果のメイン型。 */
export type DiagnosisResult = {
  id: string;
  createdAt: string;
  /** 総合スコア（顔面魅力度）0〜100 */
  totalScore: number;
  rank: Rank;
  rankLabel: string;
  /** モテタイプ名（例: 韓国俳優系） */
  motetype: string;
  motetypeEmoji: string;
  motetypeDescription: string;
  /** 一言キャッチコピー */
  catchCopy: string;
  scores: DetailScores;
  loveReport: LoveReport;
  beautyAdvice: BeautyAdvice;
  /** 似ている芸能人風の雰囲気（断定しない・「〜風」表現） */
  celebrityVibe: string;
  /** 改善ポイント（必ずポジティブ変換） */
  improvementPoints: string[];
  beautyImages: BeautyImage[];
  /** SNSシェア用テキスト */
  shareText: string;
  hashtags: string[];
  /** 今日のモテ運 */
  todayLuck: {
    score: number;
    message: string;
  };
};

/** ランクのメタ情報。 */
export const RANK_META: Record<Rank, { label: string; tagline: string }> = {
  SSS: { label: "神級オーラ", tagline: "もはや別次元のきらめき" },
  SS: { label: "芸能人級", tagline: "画面の中から出てきたみたい" },
  S: { label: "モデル級", tagline: "視線を独り占めする華やかさ" },
  A: { label: "かなり魅力的", tagline: "ふとした瞬間に目を奪われる" },
  B: { label: "親しみやすい魅力", tagline: "一緒にいてホッとする愛され顔" },
  C: { label: "伸びしろ抜群", tagline: "これから一番盛れる原石タイプ" },
};

/** 美化モードのメタ情報。 */
export const BEAUTY_MODES: {
  mode: BeautyMode;
  label: string;
  description: string;
  emoji: string;
}[] = [
  { mode: "natural", label: "ナチュラル美化", description: "あなたのまま、透明感だけそっとUP", emoji: "🌿" },
  { mode: "kpop", label: "韓国アイドル風", description: "つやhada & 抜け感のK-beauty", emoji: "💗" },
  { mode: "model", label: "モデル風", description: "凛とした立体感とオーラ", emoji: "✨" },
  { mode: "clear", label: "透明感アップ", description: "もちもち美肌とうるみ目に", emoji: "💧" },
  { mode: "business", label: "爽やかビジネス風", description: "清潔感のある好印象スタイル", emoji: "🤍" },
  { mode: "anime", label: "アニメ風", description: "二次元みたいなキラキラ世界へ", emoji: "🎀" },
  { mode: "future", label: "3年後の垢抜けた自分", description: "理想を叶えた未来のあなた", emoji: "🚀" },
];
