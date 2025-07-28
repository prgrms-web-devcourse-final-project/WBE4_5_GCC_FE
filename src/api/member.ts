import { useUserStore } from '@/store/UserStore';
import { axiosInstance } from './axiosInstance';
import { Quest } from '../../types/User';

// 유저정보 불러오기
export const fetchProfile = async () => {
  try {
    const response = await axiosInstance.get('/api/v1/members');
    console.log('회원정보 불러오기 성공', response.data);
    const { setIsLoggedIn, setMember, setBadge } = useUserStore.getState();
    setIsLoggedIn(true);
    setMember(response.data.data.member);
    setBadge(response.data.data.badge);
    return response.data.data;
  } catch (error) {
    console.error('회원정보 불러오기 실패', error);
    throw error;
  }
};

// 유저 보유 포인트 불러오기
export const fetchUserPoint = async () => {
  try {
    const response = await axiosInstance.get('/api/v1/members/points');
    console.log('보유포인트 불러오기 성공', response.data);
    const { setPoints } = useUserStore.getState();
    setPoints(response.data.data.points);
    return response.data.data;
  } catch (error) {
    console.error('보유포인트 불러오기 실패', error);
    throw error;
  }
};

// 유저 보유 퀘스트 불러오기
export const fetchUserQuest = async (): Promise<Quest[]> => {
  try {
    const response = await axiosInstance.get('/api/v1/members/quests');
    console.log('보유퀘스트 불러오기 성공');
    return response.data.data;
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

// 아이템 장착하기
export const equipItem = async (itemKey: string) => {
  try {
    const response = await axiosInstance.patch(
      '/api/v1/members/items/equip',
      null,
      {
        params: { itemKey },
      },
    );
    console.log('아이템 장착 성공', response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 아이템 장착해제
export const unequipItem = async (itemKey: string) => {
  try {
    const response = await axiosInstance.patch(
      '/api/v1/members/items/unequip',
      null,
      {
        params: { itemKey },
      },
    );
    console.log('아이템 장착해제 성공', response.data);
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
