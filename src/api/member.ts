import { useUserStore } from '@/store/UserStore';
import { axiosInstance } from './axiosInstance';
import { QuestResponse } from '../../types/general';

// 유저정보 불러오기
export const fetchProfile = async () => {
  // 로그인 상태 확인
  // 로그인 상태가 아닐 경우, 유저 정보 저장하지 않음
  const { isLoggedIn } = useUserStore.getState();
  if (!isLoggedIn) return;

  try {
    const response = await axiosInstance.get('/api/v1/members');
    // 유저 정보와 배지 정보 저장
    const { setMember, setEquippedBadge } = useUserStore.getState();
    setMember(response.data.data.member);
    setEquippedBadge(response.data.data.equippedBadge);
    return response.data.data;
  } catch (error) {
    console.error('회원정보 불러오기 실패', error);
    throw error;
  }
};

// 유저 보유 포인트 불러오기
export const fetchUserPoint = async () => {
  // 로그인 상태 확인
  // 로그인 상태가 아닐 경우, 포인트 정보 저장하지 않음
  const { isLoggedIn } = useUserStore.getState();
  if (!isLoggedIn) return;

  try {
    const response = await axiosInstance.get('/api/v1/members/points');
    // 유저 포인트 정보 저장
    const { setPoints } = useUserStore.getState();
    setPoints(response.data.data.points);
    return response.data.data;
  } catch (error) {
    console.error('보유포인트 불러오기 실패', error);
    throw error;
  }
};

// 유저 보유 퀘스트 불러오기
export const fetchUserQuest = async (): Promise<QuestResponse> => {
  // 로그인 상태 확인
  // 로그인 상태가 아닐 경우, 포인트 정보 저장하지 않음
  const { isLoggedIn } = useUserStore.getState();
  if (!isLoggedIn) return { weeklyQuests: [], eventQuests: [] };

  try {
    const response = await axiosInstance.get('/api/v1/members/quests');
    return response.data.data as QuestResponse;
  } catch (error) {
    console.error('보유퀘스트 불러오기 실패', error);
    throw error;
  }
};

// 유저 보유 아이템 불러오기
export const fetchUserItem = async () => {
  // 로그인 상태 확인
  // 로그인 상태가 아닐 경우, 포인트 정보 저장하지 않음
  const { isLoggedIn } = useUserStore.getState();
  if (!isLoggedIn) return;

  try {
    const response = await axiosInstance.get('/api/v1/members/items');
    return response.data;
  } catch (error) {
    console.error('보유아이템 불러오기 실패', error);
    throw error;
  }
};

// 아이템 장착하기
export const equipItem = async (id: number) => {
  try {
    const response = await axiosInstance.patch(
      `/api/v1/members/items?id=${id}`,
    );
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
    return true;
  } catch (error) {
    throw error;
  }
};

// 비밀번호 변경
export const handleChangePassword = async (newPassword: string) => {
  try {
    await axiosInstance.patch('/api/v1/members/password', {
      newPassword,
    });
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
