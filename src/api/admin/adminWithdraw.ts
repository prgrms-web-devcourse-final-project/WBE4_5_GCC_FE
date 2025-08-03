import { axiosInstance } from '../axiosInstance';

// 회원 탈퇴 사유 조회
export const AdminWithdrawReason = async (
  startDate: string,
  endDate: string,
) => {
  try {
    const response = await axiosInstance.get('/api/v1/admin/withdraw/reasons', {
      params: {
        startDate,
        endDate,
      },
    });
    console.log('회원 탈퇴 사유 조회 성공', response.data);
    return response.data.data;
  } catch (error) {
    console.error('회원 탈퇴 사유 조회 실패', error);
    throw error;
  }
};

// 회원 탈퇴 사유 기간별 대시보드
export const AdminWithdraw = async (startDate: string, endDate: string) => {
  try {
    const response = await axiosInstance.get('/api/v1/admin/withdraw', {
      params: {
        startDate,
        endDate,
      },
    });
    console.log('회원 탈퇴 사유 대시보드 조회 성공', response.data);
    return response.data.data;
  } catch (error) {
    console.error('회원 탈퇴 사유 대시보드 조회 실패', error);
    throw error;
  }
};
