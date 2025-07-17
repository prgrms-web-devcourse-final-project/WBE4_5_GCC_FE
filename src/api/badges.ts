import { axiosInstance } from './axiosInstance';

// 업적 조회
export const Badges = async () => {
  try {
    const response = await axiosInstance.get('/api/v1/badges');
    console.log('업적 불러오기 성공', response.data);
    return response.data;
  } catch (error) {
    console.error('업적 불러오기 실패', error);
    throw error;
  }
};

// 업적 단건 조회
export const BadgeByKey = async (key: string) => {
  try {
    const response = await axiosInstance.get(`/api/v1/badges/${key}`);
    console.log('업적 단건 불러오기 성공', response.data);
    return response.data;
  } catch (error) {
    console.error('업적 단건 조회 실패', error);
    throw error;
  }
};

// 업적 보상 수령
export const BadgeRewardByKey = async (key: string) => {
  try {
    const response = await axiosInstance.post(`/api/v1/badges/${key}`);
    console.log('업적 보상 수령 불러오기 성공', response.data);
    return response.data;
  } catch (error) {
    console.error('업적 보상 수령 조회 실패', error);
    throw error;
  }
};
