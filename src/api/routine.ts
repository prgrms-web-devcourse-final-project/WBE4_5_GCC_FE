import { axiosInstance } from './axiosInstance';

// 오늘 루틴 불러오기
export const UserRoutine = async () => {
  try {
    const response = await axiosInstance.get('/api/v1/routines');
    console.log('루틴 불러오기 성공', response.data);
  } catch (error) {
    console.error('루틴 불러오기 실패', error);
    throw error;
  }
};
