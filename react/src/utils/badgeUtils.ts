export interface BadgeInfo {
  name: string;
  icon: string;
  description: string;
  pointThreshold: number;
}

export const badges: BadgeInfo[] = [
  { name: '芽 (새싹)', icon: '🌱', description: '環境保護の第一歩を踏み出しました。', pointThreshold: 100 },
  { name: '葉 (葉っぱ)', icon: '🌿', description: '持続可能な行動で葉を咲かせました。', pointThreshold: 300 },
  { name: '木 (木)', icon: '🌳', description: '環境を支える重要な存在です。', pointThreshold: 500 },
  { name: '花 (花)', icon: '🌸', description: 'エコな努力が満開に咲きました。', pointThreshold: 1000 },
];

export const getBadge = (points: number): { badge: BadgeInfo; next: BadgeInfo | null } => {
  let current = badges[0];
  let next: BadgeInfo | null = null;

  for (let i = 0; i < badges.length; i++) {
    if (points < badges[i].pointThreshold) {
      next = badges[i];
      break;
    }
    current = badges[i];
  }

  return { badge: current, next };
};