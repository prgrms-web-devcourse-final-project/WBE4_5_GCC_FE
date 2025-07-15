import { axiosInstance } from './axiosInstance';

// 유저정보 불러오기
export const fetchProfile = async () => {
  try {
    const response = await axiosInstance.get('/api/v1/members');
    console.log('회원정보 불러오기 성공', response.data);
    return response.data;
  } catch (error) {
    console.error('회원정보 불러오기 실패', error);
    throw error;
  }
};

// 유저 보유 포인트 불러오기
export const fetchUserPoint = async () => {
  try {
    const response = await axiosInstance.get('/api/v1/members/point');
    console.log('보유포인트 불러오기 성공', response.data);
    return response.data;
  } catch (error) {
    console.error('보유포인트 불러오기 실패', error);
    throw error;
  }
};

// 유저 보유 퀘스트 불러오기
export const fetchUserQuest = async () => {
  try {
    const response = await axiosInstance.get('/api/v1/members/quests');
    console.log('보유퀘스트 불러오기 성공', response.data);
    return response.data;
  } catch (error) {
    console.error('보유퀘스트 불러오기 실패', error);
    throw error;
  }
};
