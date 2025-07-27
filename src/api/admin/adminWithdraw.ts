import { axiosInstance } from '../axiosInstance';

// 회원 탈퇴 사유
export const AdminWithdraw = async () => {
  try {
    const response = await axiosInstance.get('/api/v1/admin/withdraw');
    console.log('회원 탈퇴 사유 조회 성공', response.data);
    return response.data;
  } catch (error) {
    console.error('회원 탈퇴 사유 조회 실패', error);
    throw error;
  }
};
