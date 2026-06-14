import {
  BEAUTY_MODES,
  RANK_META,
  type BeautyImage,
  type DiagnosisResult,
  type Rank,
} from "@/types/diagnosis";
import { clampScore } from "@/lib/utils";

export type Gender = "female" | "male" | "neutral";

/** モテタイプ（女性向け）。 */
const FEMALE_TYPES = [
  { name: "清楚ヒロイン系", emoji: "🌷", desc: "ふんわり優しい雰囲気で、誰からも好かれる正統派ヒロイン。" },
  { name: "小悪魔アイドル系", emoji: "💘", desc: "目が合うとドキッとさせる、愛され上手の小悪魔タイプ。" },
  { name: "韓国女優系", emoji: "💄", desc: "透明感と洗練を兼ね備えた、今っぽさ全開のK-beauty顔。" },
  { name: "クールビューティー系", emoji: "🖤", desc: "凛とした横顔が美しい、近寄りがたい高嶺の花オーラ。" },
  { name: "愛され妹系", emoji: "🎀", desc: "思わず守りたくなる、親しみやすさ満点のあざと可愛い系。" },
  { name: "上品お姉さん系", emoji: "🥂", desc: "余裕と知性をまとった、憧れられる大人の魅力。" },
];

/** モテタイプ（男性向け）。 */
const MALE_TYPES = [
  { name: "王子様系", emoji: "👑", desc: "甘いマスクと品の良さで、みんなの理想を体現する正統派。" },
  { name: "韓国俳優系", emoji: "🌟", desc: "透明感と色気を両立した、画面映えするトレンド顔。" },
  { name: "爽やかスポーツ系", emoji: "🏄", desc: "健康的な清潔感で、第一印象の好感度がとにかく高い。" },
  { name: "ミステリアスCEO系", emoji: "🕶️", desc: "知的で落ち着いた佇まい、ギャップでグッとくる実力派。" },
  { name: "優しそうな彼氏系", emoji: "☕", desc: "安心感のある柔らかい雰囲気で、本命にされやすいタイプ。" },
  { name: "ワイルド兄貴系", emoji: "🔥", desc: "頼れる男気と色気で、ふいに胸を高鳴らせる存在感。" },
];

const CATCH_COPIES = [
  "ひと目で空気が変わる、主役級のきらめき。",
  "親しみやすさの中に、確かな色気が同居してる。",
  "見るほどに好きになる“じわ盛れ”フェイス。",
  "清潔感とオーラのバランスが神がかってる。",
  "ギャップで惹きつける、記憶に残る顔立ち。",
  "あなたの魅力、まだ全部出しきれてないタイプ。",
];

const CELEBRITY_VIBES = [
  "透明感のある今どき俳優風",
  "正統派アイドル風の親しみオーラ",
  "洗練された韓国スター風",
  "知的なアナウンサー風の好印象",
  "ナチュラル系モデル風の抜け感",
  "目力のある実力派女優風",
];

const HAIRSTYLES = [
  "顔まわりにレイヤーを入れて、輪郭をやわらかく見せるスタイル",
  "前髪に少し動きを出して、目元の印象をぐっと引き立てるスタイル",
  "トップにふんわり高さを出して、全体のバランスを整えるスタイル",
  "毛先をワンカールして、清潔感と抜け感を両立するスタイル",
];

const EYEBROWS = [
  "眉尻だけ軽く整えて、自然な並行〜やや上がり眉に",
  "毛流れを上向きに整えると、目元がぱっと明るく見えます",
  "眉頭をふんわりさせると、優しさと垢抜け感がアップ",
  "左右の高さをそろえるだけで、印象がぐっと洗練されます",
];

const FASHION = [
  "顔まわりに明るいカラーを置くと、肌の透明感が引き立ちます",
  "Iラインを意識したシルエットで、すっきり洗練度アップ",
  "首元が見えるネックラインで、清潔感と抜け感をプラス",
  "ベーシックカラー＋差し色のバランスで好印象に",
];

const SKIN = [
  "ツヤを少し足すだけで、健康的でみずみずしい印象に",
  "Tゾーンの光を意識すると、立体感と清潔感が出ます",
  "保湿で肌のキメを整えると、写真写りが格段にUP",
  "血色感をひとさじ足すと、ぐっと親しみやすい雰囲気に",
];

const PHOTO_ANGLES = [
  "カメラを目線より少し上に。自然と目が大きく華やかに写ります",
  "斜め45度＋あご少し引きで、輪郭がシャープに見えます",
  "やわらかい自然光を正面から。透明感がいちばん出る角度です",
  "顔の左右で“写りのいい側”を前に出すと一気に盛れます",
];

const PROFILE_PHOTOS = [
  "笑顔×自然光の上半身ショットが、好感度No.1のプロフ写真に",
  "背景をすっきりさせると、あなたの表情に視線が集中します",
  "目元がはっきり見える明るさで撮ると、信頼感が大きくUP",
  "リラックスした自然な表情の1枚が、いちばん“会いたく”なります",
];

const IMPROVEMENT_POINTS = [
  "今の魅力はそのままに、髪型で“抜け感”を足すと一段と垢抜けます",
  "目元の明るさを少し意識するだけで、印象がさらに華やぎます",
  "姿勢と表情を整えると、持ち前のオーラがもっと伝わります",
  "写真の撮り方を変えるだけで、本来の魅力がぐっと引き出せます",
  "清潔感のひと工夫で、第一印象の好感度がさらに伸びます",
];

const TODAY_LUCK = [
  "今日は笑顔がいつも以上に魅力的に伝わる日。連絡はあなたから◎",
  "ふとした表情に惹かれる人が現れる予感。鏡の前で笑顔の練習を",
  "新しい髪型・メイクに挑戦すると運気アップ。垢抜けのチャンス日",
  "落ち着いた色の服が吉。知的な魅力が際立ちます",
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rankFromScore(score: number): Rank {
  if (score >= 92) return "SSS";
  if (score >= 86) return "SS";
  if (score >= 79) return "S";
  if (score >= 71) return "A";
  if (score >= 63) return "B";
  return "C";
}

function buildBeautyImages(): BeautyImage[] {
  // モック画像（後で generateBeautyImage() の生成結果に差し替え可能）。
  return BEAUTY_MODES.map((m, i) => ({
    mode: m.mode,
    label: m.label,
    description: m.description,
    premium: m.mode !== "natural",
    // 画面用のプレースホルダ。実装初期はグラデの SVG/外部モック。
    url: `/mock/beauty-${m.mode}.svg`,
  })).slice(0, BEAUTY_MODES.length);
}

/** ダミーの診断結果を生成。後で AI レスポンスに置き換え可能。 */
export function generateMockDiagnosis(gender: Gender = "neutral"): DiagnosisResult {
  const totalScore = rand(68, 96);
  const rank = rankFromScore(totalScore);

  const typePool =
    gender === "female"
      ? FEMALE_TYPES
      : gender === "male"
        ? MALE_TYPES
        : [...FEMALE_TYPES, ...MALE_TYPES];
  const type = pick(typePool);

  // 詳細スコアは総合スコアの周辺で自然にばらつかせる。
  const base = totalScore;
  const jitter = () => clampScore(base + rand(-12, 10));

  const scores = {
    cleanliness: jitter(),
    eyes: jitter(),
    friendliness: jitter(),
    sexiness: jitter(),
    aura: jitter(),
    intelligence: jitter(),
    photogenic: jitter(),
    loveAttraction: jitter(),
  };

  const motetype = type.name;
  const rankMeta = RANK_META[rank];

  return {
    id: `diag_${Date.now().toString(36)}_${rand(1000, 9999)}`,
    createdAt: new Date().toISOString(),
    totalScore,
    rank,
    rankLabel: rankMeta.label,
    motetype,
    motetypeEmoji: type.emoji,
    motetypeDescription: type.desc,
    catchCopy: pick(CATCH_COPIES),
    scores,
    celebrityVibe: pick(CELEBRITY_VIBES),
    loveReport: {
      firstImpression: "話しかけやすく、それでいて記憶に残る——好印象の黄金バランス。",
      oppositeSexImpression: "一緒にいて安心できるのに、ふとした瞬間にドキッとさせる魅力。",
      datingAppScore: `映え度 ${rand(78, 97)}%。プロフ写真次第でマッチ率はさらに伸びます。`,
      seriousLovePotential: "“軽い人”より“本命”に選ばれやすい、信頼感のある雰囲気。",
      approachability: `話しかけやすさ ${rand(75, 95)}%。初対面でも距離が縮まりやすいタイプ。`,
      gapCharm: "ふだんの印象と、見せる笑顔のギャップが強い武器になります。",
    },
    beautyAdvice: {
      hairstyle: pick(HAIRSTYLES),
      eyebrows: pick(EYEBROWS),
      fashion: pick(FASHION),
      skin: pick(SKIN),
      photoAngle: pick(PHOTO_ANGLES),
      profilePhoto: pick(PROFILE_PHOTOS),
    },
    improvementPoints: [...IMPROVEMENT_POINTS]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3),
    beautyImages: buildBeautyImages(),
    shareText: `私は「${rank}ランク・${motetype}」でした！あなたのモテタイプは？`,
    hashtags: ["AI顔診断", "顔面偏差値", "モテ診断", "垢抜け診断", "AI盛れ顔"],
    todayLuck: {
      score: rand(72, 99),
      message: pick(TODAY_LUCK),
    },
  };
}
