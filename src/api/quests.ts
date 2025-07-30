import { axiosInstance } from './axiosInstance';

// 퀘스트 보상수령
export const acceptQuest = async (questType: string, id: number) => {
  try {
    await axiosInstance.post(
      `/api/v1/members/quests?type=${questType}&id=${id}`,
    );
  } catch (error) {
    console.log('퀘스트 보상받기 실패', error);
    throw error;
  }
};
