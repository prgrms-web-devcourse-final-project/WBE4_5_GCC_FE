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
