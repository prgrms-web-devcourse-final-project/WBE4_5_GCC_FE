export interface CategoryItem {
  categoryId: number;
  categoryName: string;
  emoji?: string;
  categoryType: 'MAJOR' | 'SUB';
  parentId?: number | null;
  children?: CategoryItem[] | null; // MAJOR에만 사용
  createTime?: string;
  updateTime?: string | null;
  subCategoryName?: string | null;
}

export interface ShopItem {
  itemId: number;
  itemType: 'TOP' | 'BOTTOM' | 'ACCESSORY';
  itemDescription: string;
  itemKey: string;
  itemName: string;
  itemPoint?: number;
  itemPrice?: number;
  createTime?: string;
  updateTime?: string;
}

export interface Badge {
  badgeId: number;
  badgeKey: string;
  badgeName: string;
  categoryName: string;
  how: string;
  info: string;
  isReceived: boolean;
  receivedDate: string;
  requirement: number;
  tier: 'BRONZE' | 'SILVER' | 'GOLD' | 'TROPHY';
}

export interface Quest {
  questId: number;
  progressId: number;
  categoryId: number;
  questKey: string;
  questName: string;
  target: number;
  progress: number;
}

export interface EventQuest extends Quest {
  startAt: string;
  endAt: string;
}

export interface QuestResponse {
  weeklyQuests: Quest[];
  eventQuests: EventQuest[];
}
