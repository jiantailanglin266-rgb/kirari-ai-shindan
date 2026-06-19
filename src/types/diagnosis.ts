/* ============================================================
   人相鑑定の結果の型定義
   ※ 将来 AI API のレスポンスをこの型にマッピングする想定。
   東洋の人相学（観相）をモチーフにした、エンタメ目的の運勢鑑定。
   ============================================================ */

/** 運勢ランク。SSS〜C。低くてもネガティブにしないこと。 */
export type Rank = "SSS" | "SS" | "S" | "A" | "B" | "C";

/** 人相タイプのレア度（バズ要素）。 */
export type Rarity = {
  /** 出現率（%） */
  percent: number;
  /** ★の数 1〜5 */
  stars: number;
  /** ラベル（ノーマル/レア/激レア/超激レア） */
  label: string;
};

/** 詳細スコア＝運勢（すべて 0〜100）。 */
export type DetailScores = {
  /** 恋愛運 */
  love: number;
  /** 金運 */
  money: number;
  /** 仕事運 */
  work: number;
  /** 健康運 */
  health: number;
  /** 人気運（対人運） */
  popularity: number;
  /** 知性 */
  intellect: number;
  /** 直感力 */
  intuition: number;
  /** 魅力運 */
  charm: number;
};

/** 運勢レポート。 */
export type LoveReport = {
  /** 第一印象（人相から） */
  firstImpression: string;
  /** 恋愛運 */
  oppositeSexImpression: string;
  /** 出会い運 */
  datingAppScore: string;
  /** 結婚運・晩年運 */
  seriousLovePotential: string;
  /** 人付き合い */
  approachability: string;
  /** 隠れた才能 */
  gapCharm: string;
};

/** 開運アドバイス。 */
export type BeautyAdvice = {
  /** 開運ヘア */
  hairstyle: string;
  /** 眉（対人運） */
  eyebrows: string;
  /** 開運カラー */
  fashion: string;
  /** 表情・血色 */
  skin: string;
  /** 開運の角度 */
  photoAngle: string;
  /** 開運アクション */
  profilePhoto: string;
};

/** 鑑定結果のメイン型。 */
export type DiagnosisResult = {
  id: string;
  createdAt: string;
  /** 総合運勢スコア 0〜100 */
  totalScore: number;
  rank: Rank;
  rankLabel: string;
  /** 人相タイプ名（例: 福相） */
  motetype: string;
  motetypeEmoji: string;
  motetypeDescription: string;
  /** 人相タイプのレア度（出現率・★） */
  rarity: Rarity;
  /** 一言の鑑定コメント */
  catchCopy: string;
  scores: DetailScores;
  loveReport: LoveReport;
  beautyAdvice: BeautyAdvice;
  /** 最も運勢が表れている顔のパーツ（観相のポイント） */
  celebrityVibe: string;
  /** 開運ポイント（必ずポジティブ変換） */
  improvementPoints: string[];
  /** SNSシェア用テキスト */
  shareText: string;
  hashtags: string[];
  /** 今日の運勢 */
  todayLuck: {
    score: number;
    message: string;
  };
};

/** 運勢ランクのメタ情報。 */
export const RANK_META: Record<Rank, { label: string; tagline: string }> = {
  SSS: { label: "神相", tagline: "千年に一度の大開運の相" },
  SS: { label: "福徳相", tagline: "福と人徳に満ちあふれた相" },
  S: { label: "吉相", tagline: "運気の流れがとても良い相" },
  A: { label: "開運相", tagline: "これから運が大きく開く相" },
  B: { label: "和顔相", tagline: "周りを和ませる愛され相" },
  C: { label: "大器相", tagline: "これから伸びる、伸びしろの相" },
};

