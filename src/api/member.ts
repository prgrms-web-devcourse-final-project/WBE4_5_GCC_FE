import { useUserStore } from '@/store/UserStore';
import { axiosInstance } from './axiosInstance';

// 유저정보 불러오기
export const fetchProfile = async () => {
  try {
    const response = await axiosInstance.get('/api/v1/members');
    console.log('회원정보 불러오기 성공', response.data);
    const { setUser } = useUserStore.getState();
    setUser({
      ...response.data.data,
      isLoggedIn: true,
    });
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

// 유저 보유 아이템 불러오기
export const fetchUserItem = async () => {
  try {
    const response = await axiosInstance.get('/api/v1/members/items');
    console.log('보유아이템 불러오기 성공', response.data);
    return response.data;
  } catch (error) {
    console.error('보유아이템 불러오기 실패', error);
    throw error;
  }
};

// 기존 비밀번호 확인
export const handleConfirmPassword = async (password: string) => {
  try {
    const response = await axiosInstance.post(
      '/api/v1/members/password',
      null,
      {
        params: { password },
      },
    );
    console.log('비밀번호 확인 성공', response.data);
    return true;
  } catch (error) {
    console.error('비밀번호 확인 실패', error);
    throw error;
  }
};

// 비밀번호 변경
export const handleChangePassword = async (
  oldPassword: string,
  newPassword: string,
) => {
  try {
    const response = await axiosInstance.put('/api/v1/members/password', {
      oldPassword,
      newPassword,
    });
    console.log('비밀번호 변경 성공', response.data);
  } catch (error) {
    console.error('비밀번호 변경 실패', error);
    throw error;
  }
};
