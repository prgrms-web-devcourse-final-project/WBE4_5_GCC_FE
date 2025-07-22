import { axiosInstance } from '../axiosInstance';

// 카테고리 목록 조회 - 사용 ㅇ
export const AdminCategories = async () => {
  try {
    const response = await axiosInstance.get('/api/v1/admin/categories');
    console.log('카테고리 목록 불러오기 성공', response.data);
    return response.data;
  } catch (error) {
    console.error('카테고리 목록 불러오기 실패', error);
    throw error;
  }
};

// 카테고리 생성
interface AdminCategoryPayload {
  categoryName: string;
  categoryType: string;
  //emoji: string;
}

export const CreateAdminCategories = async (payload: AdminCategoryPayload) => {
  try {
    const response = await axiosInstance.post(
      '/api/v1/admin/categories',
      payload,
    );
    console.log('카테고리 생성 성공', response.data);
    return response.data;
  } catch (error) {
    console.error('카테고리 생성 실패', error);
    throw error;
  }
};
