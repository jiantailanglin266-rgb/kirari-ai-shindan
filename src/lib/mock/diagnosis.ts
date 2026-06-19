import { RANK_META, type DiagnosisResult, type Rank } from "@/types/diagnosis";
import { FACE_TYPES, rarityFromWeight, type FaceType } from "@/lib/faceTypes";
import { clampScore } from "@/lib/utils";

/** いちばん知りたい運（任意）。 */
export type Focus = "love" | "money" | "all";

/** 重み付きでタイプを抽選。 */
function pickWeightedType() {
  const total = FACE_TYPES.reduce((s, t) => s + t.weight, 0);
  let r = Math.random() * total;
  for (const t of FACE_TYPES) {
    r -= t.weight;
    if (r <= 0) return t;
  }
  return FACE_TYPES[0];
}

const CATCH_COPIES = [
  "ひと目で場の空気を変える、主役級の運気をまとった相。",
  "和やかさの奥に、芯の強さと幸運がしっかり宿っている相。",
  "観るほどに味が出る、じわじわ運が満ちていく相。",
  "人徳と直感のバランスが見事に整った、稀有な吉相。",
  "ギャップで人を惹きつける、記憶に残る印象的な相。",
  "持ち前の運、まだ全部開ききっていない伸びしろの相。",
];

/** 最も運勢が表れている顔のパーツ（観相のポイント）。 */
const FACE_POINTS = [
  "目元に、人を惹きつける強い恋愛運が表れています",
  "鼻筋に、堅実に財を築く金運の良さが出ています",
  "額の広さに、若いうちから運が開ける明るさが宿ります",
  "口元に、晩年まで続く愛情運と人望が表れています",
  "眉の流れに、対人運の良さと穏やかな人柄が出ています",
  "輪郭の柔らかさに、周囲に恵まれる包容力が表れています",
  "頬の張りに、人気を集める華やかな運気が出ています",
];

const HAIRSTYLES = [
  "おでこ（額）を少し見せると、運気の入り口が開いて全体運がアップ",
  "顔まわりに動きを出すと、対人運と華やかさが引き立ちます",
  "トップにふんわり高さを出すと、上昇運のバランスが整います",
  "毛先を内へまとめると、金運・家庭運が安定して見えます",
];

const EYEBROWS = [
  "眉尻を軽く整えて自然な並行眉に。対人運がぐっと上がります",
  "毛流れを上向きに整えると、仕事運と行動力が高まって見えます",
  "眉頭をふんわりさせると、優しさと人望が増す相に",
  "左右の高さをそろえると、判断運・金運のバランスが整います",
];

const FASHION = [
  "顔まわりに明るい色を置くと、運気の血色が良く見えます",
  "差し色に紫を効かせると、直感力・人気運の後押しに",
  "首元を見せると、対人運と清らかさ（清明相）がアップ",
  "ベーシック＋金や白の差し色で、金運を引き寄せる装いに",
];

const SKIN = [
  "ツヤをひとさじ足すと、健康運と若々しい運気が宿ります",
  "Tゾーンに光を意識すると、立体感と上昇運が出ます",
  "保湿で肌のキメを整えると、運の通り道が滑らかに",
  "血色感を足すと、人を引き寄せる親しみ運がアップ",
];

const PHOTO_ANGLES = [
  "カメラを目線より少し上に。目元の恋愛運がいちばん映えます",
  "斜め45度＋あご少し引きで、輪郭の晩年運が整って見えます",
  "やわらかい自然光を正面から。清明相の透明感が際立ちます",
  "“写りの良い側”を前に。福相の柔らかさが引き立ちます",
];

const PROFILE_PHOTOS = [
  "笑顔×自然光の一枚で、福を呼ぶ愛され運が最大化します",
  "背景をすっきりさせると、あなたの相の良さに視線が集まります",
  "目元がはっきり見える明るさで、信頼運・人望が伝わります",
  "肩の力を抜いた自然な表情が、いちばん運を引き寄せます",
];

const IMPROVEMENT_POINTS = [
  "今の良い相はそのままに、額を見せると運の入り口がさらに開きます",
  "目元を明るく保つと、恋愛運・人気運が一段と高まります",
  "姿勢と笑顔を整えると、持ち前の吉相がもっと伝わります",
  "口角を上げる習慣で、晩年運と人望がさらに育ちます",
  "眉を整えるひと工夫で、対人運と第一印象が伸びます",
];

const TODAY_LUCK = [
  "今日は笑顔が福を呼ぶ日。連絡や挨拶はあなたから動くと吉。",
  "直感が冴える一日。ピンときた誘いには乗ってみると good。",
  "新しい髪型・装いで運気アップ。開運のチャンス日です。",
  "落ち着いた色＋金の差し色が吉。金運・信頼運が高まります。",
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

/** ダミーの鑑定結果を生成。後で AI レスポンスに置き換え可能。 */
export function generateMockDiagnosis(
  focus: Focus = "all",
  forced?: FaceType,
): DiagnosisResult {
  const totalScore = rand(68, 96);
  const rank = rankFromScore(totalScore);
  const type = forced ?? pickWeightedType();
  const rarity = rarityFromWeight(type.weight);

  const base = totalScore;
  const jitter = () => clampScore(base + rand(-12, 10));

  const scores = {
    love: jitter(),
    money: jitter(),
    work: jitter(),
    health: jitter(),
    popularity: jitter(),
    intellect: jitter(),
    intuition: jitter(),
    charm: jitter(),
  };

  // 「重視する運」を少しだけ底上げ（演出）。
  if (focus === "love") scores.love = clampScore(scores.love + rand(4, 10));
  if (focus === "money") scores.money = clampScore(scores.money + rand(4, 10));

  const rankMeta = RANK_META[rank];

  return {
    id: `diag_${Date.now().toString(36)}_${rand(1000, 9999)}`,
    createdAt: new Date().toISOString(),
    totalScore,
    rank,
    rankLabel: rankMeta.label,
    motetype: type.name,
    motetypeEmoji: type.emoji,
    motetypeDescription: type.desc,
    rarity,
    catchCopy: pick(CATCH_COPIES),
    scores,
    celebrityVibe: pick(FACE_POINTS),
    loveReport: {
      firstImpression: "話しかけやすく、それでいて記憶に残る——好印象の黄金バランスの相。",
      oppositeSexImpression: "安心感の奥にふとした色気。本命として惹かれられる恋愛運の持ち主。",
      datingAppScore: `出会い運 ${rand(78, 97)}%。第一印象の良さで良縁を引き寄せます。`,
      seriousLovePotential: "年を重ねるほど運が育つ晩年吉相。結婚運・家庭運に恵まれる相。",
      approachability: `人付き合いの運 ${rand(75, 95)}%。初対面でも距離が縮まりやすい相。`,
      gapCharm: "ふだんの印象と、見せる一面のギャップが大きな武器になる相です。",
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
    shareText: `私の人相は【${type.name}】(出現率${rarity.percent}%・${rarity.label})でした！総合運勢${totalScore}点🔮 あなたの人相タイプは？`,
    hashtags: ["人相鑑定NEON", "AI人相占い", `${type.name}`, "無料占い", "顔タイプ診断"],
    todayLuck: {
      score: rand(72, 99),
      message: pick(TODAY_LUCK),
    },
  };
}
