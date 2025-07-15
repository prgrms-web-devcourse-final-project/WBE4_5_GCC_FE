import { axiosInstance } from './axiosInstance';

// 아이템 조회 (카테고리 모르겠음)
export const Items = async () => {
  try {
    const response = await axiosInstance.get('/api/v1/items');
    console.log('아이템 불러오기 성공', response.data);
    return response.data;
  } catch (error) {
    console.error('아이템 불러오기 실패', error);
    throw error;
  }
};
