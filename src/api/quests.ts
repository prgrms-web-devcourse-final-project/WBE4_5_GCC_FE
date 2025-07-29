import { axiosInstance } from './axiosInstance';

// 퀘스트 보상수령
export const acceptQuest = async (key: string) => {
  try {
    const response = await axiosInstance.post(`/api/v1/members/quests/${key}`);
    console.log('퀘스트 보상받기 성공', response.data);
  } catch (error) {
    console.log('퀘스트 보상받기 실패', error);
    throw error;
  }
};
