export interface CategoryItem {
  categoryId: number;
  categoryName: string;
  emoji?: string;
  categoryType: 'MAJOR' | 'SUB';
  parentId?: number | null;
  memberId?: number | null;
  parentName?: string | null;
  subCategoryName?: string;
  createTime?: string;
  updateTime?: string | null;
}

export interface ShopItem {
  itemId: number;
  itemType: 'TOP' | 'BOTTOM' | 'ACCESSORY';
  itemDescription: string;
  itemKey: string;
  itemName: string;
  itemPoint: number;
  createTime?: string;
  updateTime?: string;
}
