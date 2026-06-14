import type { Rarity } from "@/types/diagnosis";

/**
 * 人相タイプ定義（全12種）。
 * weight = 出現率(%)・合計100。slug = URL用キー（結果別OGPページ /r/<slug> に使用）。
 * mock 生成・タイプ別OGページ・OG画像生成で共用する単一の真実源。
 */
export type FaceType = {
  slug: string;
  name: string;
  emoji: string;
  weight: number;
  desc: string;
};

export const FACE_TYPES: FaceType[] = [
  { slug: "fukuso", name: "福相", emoji: "🍑", weight: 18, desc: "福を呼び込む、誰からも好かれる愛され人相。笑うと運気が上がる。" },
  { slug: "jiai", name: "慈愛相", emoji: "🌸", weight: 14, desc: "包容力で人を癒やす、人徳にあふれた温かな相。" },
  { slug: "chisho", name: "智将相", emoji: "🦉", weight: 12, desc: "知略と冷静さを備えた、参謀タイプの聡明な相。" },
  { slug: "touka", name: "桃花相", emoji: "🌷", weight: 11, desc: "恋愛と良縁に恵まれる、モテ運の強い華やかな相。" },
  { slug: "kinun", name: "金運相", emoji: "💰", weight: 10, desc: "お金に好かれ、コツコツ財を成していく堅実な相。" },
  { slug: "shosai", name: "商才相", emoji: "🎴", weight: 9, desc: "機を見て利を生む、ひらめきと商才に富んだ相。" },
  { slug: "bujin", name: "武人相", emoji: "🔥", weight: 8, desc: "行動力と勝負強さに満ちた、頼れる行動派の相。" },
  { slug: "hougan", name: "鳳眼", emoji: "🦚", weight: 6, desc: "気品と鋭い直感。芸術・人気運に恵まれる華やかな相。" },
  { slug: "taiki", name: "大器晩成相", emoji: "🌅", weight: 5, desc: "人生の後半で大きく花ひらく、底力のある相。" },
  { slug: "tenpin", name: "天稟相", emoji: "⭐", weight: 4, desc: "生まれ持った華で、自然と人を惹きつける才能の相。" },
  { slug: "senpu", name: "仙風相", emoji: "🌙", weight: 2, desc: "浮世離れした独自の魅力を放つ、神秘的な相。" },
  { slug: "ryu", name: "龍相", emoji: "🐉", weight: 1, desc: "強い上昇気流をまとう、出世とカリスマの大器。最高峰の超激レア相。" },
];

/** 出現率からレア度（★とラベル）を求める。 */
export function rarityFromWeight(weight: number): Rarity {
  let stars: number;
  let label: string;
  if (weight <= 2) {
    stars = 5;
    label = "超激レア";
  } else if (weight <= 5) {
    stars = 4;
    label = "激レア";
  } else if (weight <= 9) {
    stars = 3;
    label = "レア";
  } else if (weight <= 13) {
    stars = 2;
    label = "アンコモン";
  } else {
    stars = 1;
    label = "ノーマル";
  }
  return { percent: weight, stars, label };
}

export function getTypeBySlug(slug: string): FaceType | undefined {
  return FACE_TYPES.find((t) => t.slug === slug);
}

export function getSlugByName(name: string): string {
  return FACE_TYPES.find((t) => t.name === name)?.slug ?? "fukuso";
}
