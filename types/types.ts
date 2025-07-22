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
