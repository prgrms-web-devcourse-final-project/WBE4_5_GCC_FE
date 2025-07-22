export interface CategoryItem {
  categoryId: number;
  categoryName: string;
  emoji: string;
  categoryType: 'MAJOR' | 'SUB';
  parentName?: string | null;
  subCategoryName?: string;
  createTime?: string;
  updateTime?: string | null;
}
