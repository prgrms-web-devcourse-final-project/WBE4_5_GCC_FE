import { axiosInstance } from '../axiosInstance';

// 카테고리 목록 조회
export const AdminCategories = async () => {
  try {
    const response = await axiosInstance.get('/api/v1/admin/categories');
    console.log('아이템 불러오기 성공', response.data);
    return response.data;
  } catch (error) {
    console.error('아이템 불러오기 실패', error);
    throw error;
  }
};
