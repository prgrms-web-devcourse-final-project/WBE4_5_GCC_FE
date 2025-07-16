import { axiosInstance } from './axiosInstance';

// 아이템 조회
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

// 아이템 단건 조회
export const ItemByKey = async (key: string) => {
  try {
    const response = await axiosInstance.get(`/api/v1/items/${key}`);
    console.log('아이템 단건 불러오기 성공', response.data);
    return response.data;
  } catch (error) {
    console.error('아이템 단건 조회 실패', error);
    throw error;
  }
};

// 아이템 구매 - 포인트를 차감하고 아이템을 구매
export const ItemPurchaseByKey = async (key: string) => {
  try {
    const response = await axiosInstance.post(`/api/v1/items/${key}`);
    console.log('아이템 구매 불러오기 성공', response.data);
    return response.data;
  } catch (error) {
    console.error('아이템 구매 조회 실패', error);
    throw error;
  }
};
