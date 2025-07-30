export interface CategoryItem {
  categoryId: number;
  categoryName: string;
  categoryType: 'MAJOR' | 'SUB' | 'DEFAULT';
  emoji?: string;
  parentId?: number | null;
  children?: CategoryItem[] | null; // MAJOR에만 사용
  parentName?: string;
  createTime?: string;
  updateTime?: string | null;
  subCategoryName?: string | null;
}

export interface ShopItem {
  itemId: number;
  itemType: 'TOP' | 'BOTTOM' | 'ACCESSORY';
  itemDescription: string;
  itemName: string;
  isListed?: boolean; // 관리자
  isOwned?: boolean;
  itemKey: string;
  itemPoint?: number;
  itemPrice?: number;
  createTime?: string;
  updateTime?: string;
  isActive?: boolean; // 관리자
}

export interface Badge {
  badgeId: number;
  badgeKey: string;
  badgeName: string;
  tier: 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM';
  info: string;
  message: string;
  categoryName: string;
  requirement: number;
  status: 'ACHIEVABLE' | 'OWNED' | 'LOCKED';
  currentProgress: number;
  receivedDate: string | null;
  isEquipped: boolean;
  // 보상 수령
  pointAdded?: number;
  totalPoint?: number;
  receivedAt?: string;
}

export interface Quest {
  questId: number;
  progressId: number;
  categoryId: number;
  questKey: string;
  questName: string;
  target: number;
  points: number;
  progress: number;
  isRewarded: boolean;
}

export interface EventQuest extends Quest {
  startAt: string;
  endAt: string;
}

export interface QuestResponse {
  weeklyQuests: Quest[];
  eventQuests: EventQuest[];
}
