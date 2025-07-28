import { CategoryItem } from '../../types/general';
import { axiosInstance } from './axiosInstance';

interface CategoryPayload {
  categoryName: string;
  categoryType: 'MAJOR' | 'SUB';
  emoji: string | null;
  parentName: string | null;
}

// 카테고리 조회 - 사용 ㅇ
export const getCategories = async (): Promise<CategoryItem[]> => {
  try {
    const response = await axiosInstance.get('/api/v1/categories');
    console.log('카테고리 불러오기 성공', response.data.data);
    return response.data.data.categories;
  } catch (error) {
    console.error('카테고리 불러오기 실패', error);
    throw error;
  }
};

// 특정 카테고리 조회
export const CategoryById = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/api/v1/categories/${id}`);
    console.log('특정 카테고리 불러오기 성공', response.data);
    return response.data;
  } catch (error) {
    console.error('특정 카테고리 조회 실패', error);
    throw error;
  }
};

// 카테고리 생성 - 사용 ㅇ
export const CreateCategory = async (payload: CategoryPayload) => {
  try {
    const response = await axiosInstance.post('/api/v1/categories', payload);
    console.log('카테고리 생성 성공', response.data);
    return response.data;
  } catch (error) {
    console.error('카테고리 생성 실패', error);
    throw error;
  }
};

// 카테고리 수정 - 사용 ㅇ

export const EditCategoryById = async (
  id: number,
  payload: CategoryPayload,
) => {
  try {
    const response = await axiosInstance.patch(
      `/api/v1/categories/${id}`,
      payload,
    );
    console.log('특정 카테고리 수정 성공', response.data);
    return response.data;
  } catch (error) {
    console.error('특정 카테고리 수정 실패', error);
    throw error;
  }
};

// 카테고리 삭제 - 사용 ㅇ
export const DeleteCategoryById = async (id: number | null) => {
  try {
    const response = await axiosInstance.delete(`/api/v1/categories/${id}`);
    console.log('카테고리 삭제 성공', response.data);
    return response.data;
  } catch (error) {
    console.error('특정 카테고리 삭제 실패', error);
    throw error;
  }
};
