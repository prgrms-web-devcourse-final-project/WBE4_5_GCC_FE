import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../axiosInstance';
import { CategoryItem } from '../../../types/general';

// 카테고리 목록 조회
export const AdminCategories = async (): Promise<CategoryItem[]> => {
  try {
    const response = await axiosInstance.get('/api/v1/categories');
    console.log('카테고리 목록 불러오기 성공', response.data.data.categories);
    return response.data.data.categories;
  } catch (error) {
    console.error('카테고리 목록 불러오기 실패', error);
    throw error;
  }
};

export function UseAdminCategory() {
  return useQuery({
    queryKey: ['admin-category'],
    queryFn: AdminCategories,
  });
}

// 카테고리 생성
interface AdminCategoryPayload {
  categoryName: string;
  emoji: string;
}

export const CreateAdminCategories = async (payload: AdminCategoryPayload) => {
  const response = await axiosInstance.post(
    '/api/v1/admin/categories',
    payload,
  );
  console.log('카테고리 생성 성공', response.data);
  return response.data;
};

// 카테고리 삭제
export const DeleteAdminCategoryById = async (id: number) => {
  try {
    const response = await axiosInstance.delete(
      `/api/v1/admin/categories/${id}`,
    );
    console.log('카테고리 삭제 성공', response.data);
    return response.data;
  } catch (error) {
    console.error('카테고리 삭제 실패', error);
    throw error;
  }
};

// 카테고리 수정
export const EditAdminCategoryById = async (
  id: string,
  payload: AdminCategoryPayload,
) => {
  const response = await axiosInstance.patch(
    `/api/v1/admin/categories/${id}`,
    payload,
  );
  console.log('카테고리 수정 성공', response.data);
  return response.data;
};
