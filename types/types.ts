export interface Category {
  icon: React.ReactNode | string;
  label: string;
}

export interface CategoryItem {
  categoryId: number;
  categoryName: string;
  categoryType: 'MAJOR' | 'SUB' | 'CUSTOM';
  parentName: string | null;
  subCategoryName?: string;
}
