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
    console.log('보유퀘스트 불러오기 성공');
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

// 유저 장착 아이템 불러오기
export const fetchEquippedItem = async () => {
  try {
    const response = await axiosInstance.get('/api/v1/members/items/equipped');
    console.log('장착아이템 불러오기 성공', response.data);
    return response.data;
  } catch (error) {
    console.error('장착아이템 불러오기 실패', error);
    throw error;
  }
};

// 장착 아이템 바꾸기
export const changeItem = async (oldItemKey: string, newItemKey: string) => {
  try {
    const response = await axiosInstance.patch('/api/v1/members/items', {
      oldItemKey,
      newItemKey,
    });
    console.log('아이템 변경 성공', response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 기존 비밀번호 확인
export const handleConfirmPassword = async (password: string) => {
  try {
    await axiosInstance.post('/api/v1/members/password', null, {
      params: { password },
    });
    console.log('비밀번호 확인 성공');
    return true;
  } catch (error) {
    throw error;
  }
};

// 비밀번호 변경
export const handleChangePassword = async (newPassword: string) => {
  try {
    const response = await axiosInstance.patch('/api/v1/members/password', {
      newPassword,
    });
    console.log('비밀번호 변경 성공', response.data);
  } catch (error) {
    console.error('비밀번호 변경 실패', error);
    throw error;
  }
};

// 유저정보 변경하기
export const handleChangeProfile = async (
  name: string,
  nickname: string,
  residenceExperience?: string,
  regionDept1?: string,
  regionDept2?: string,
  regionDept3?: string,
) => {
  try {
    const response = await axiosInstance.patch('/api/v1/members', {
      name,
      nickname,
      residenceExperience,
      regionDept1,
      regionDept2,
      regionDept3,
    });
    console.log('회원정보 변경 성공', response.data);
  } catch (error) {
    console.error('회원정보 변경 실패', error);
    throw error;
  }
};

// 회원 탈퇴
export const deleteMember = async (withdrawType: string, etcReason: string) => {
  try {
    const response = await axiosInstance.delete('/api/v1/members', {
      data: { withdrawType, etcReason },
    });
    console.log('회원탈퇴 성공', response.data);
  } catch (error) {
    throw error;
  }
};
