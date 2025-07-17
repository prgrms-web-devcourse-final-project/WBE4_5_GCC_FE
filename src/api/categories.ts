import { axiosInstance } from './axiosInstance';

// 카테고리 조회 - 사용 ㅇ
export const Categories = async () => {
  try {
    const response = await axiosInstance.get('/api/v1/categories');
    console.log('카테고리 불러오기 성공', response.data);
    return response.data;
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
interface CreateCategoryPayload {
  categoryName: string;
  categoryType: 'MAJOR' | 'SUB';
  parentName?: string; // SUB일 때만 필요
}

export const CreateCategory = async (payload: CreateCategoryPayload) => {
  try {
    const response = await axiosInstance.post('/api/v1/categories', payload);
    console.log('카테고리 생성 성공', response.data);
    return response.data;
  } catch (error) {
    console.error('카테고리 생성 실패', error);
    throw error;
  }
};

// 특정 카테고리 수정 - 사용 ㅇ
interface EditCategoryPayload {
  categoryName: string;
  categoryType: 'MAJOR' | 'SUB';
  parentName: string | null;
}

export const EditCategoryById = async (
  id: number,
  payload: EditCategoryPayload,
) => {
  try {
    const response = await axiosInstance.put(
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
