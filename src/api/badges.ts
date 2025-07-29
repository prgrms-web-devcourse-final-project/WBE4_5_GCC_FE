import { axiosInstance } from './axiosInstance';

// 업적 조회
export const getBadges = async (page: number, size: number) => {
  try {
    const response = await axiosInstance.get('/api/v1/badges', {
      params: {
        page,
        size,
      },
    });
    const data = response.data.data;
    console.log('업적 불러오기 성공', data.content);
    return {
      badges: data.content,
      totalPages: data.totalPages,
    };
  } catch (error) {
    console.error('업적 불러오기 실패', error);
    throw error;
  }
};

// 업적 단건 조회
export const BadgeByKey = async (key: string) => {
  try {
    const response = await axiosInstance.get(`/api/v1/badges/${key}`);
    console.log('업적 단건 불러오기 성공', response.data);
    return response.data;
  } catch (error) {
    console.error('업적 단건 조회 실패', error);
    throw error;
  }
};

// 업적 보상 수령
export const BadgeRewardByKey = async (key: string) => {
  try {
    const response = await axiosInstance.post('/api/v1/badges', null, {
      params: { badgeKey: key },
    });
    console.log('업적 보상 수령 불러오기 성공', response.data);
    return response.data;
  } catch (error) {
    console.error('업적 보상 수령 조회 실패', error);
    throw error;
  }
};

// 보유업적 조회
export const fetchUserBadge = async () => {
  try {
    const response = await axiosInstance.get('/api/v1/members/badges');
    console.log('보유업적 조회 성공', response.data);
    return response.data;
  } catch (error) {
    console.error('보유업적 조회 실패', error);
    throw error;
  }
};

// 배지 장착/해제
export const equipBadge = async (badgeKey: string) => {
  try {
    const response = await axiosInstance.patch(`/api/v1/badges`, null, {
      params: {
        badgeKey,
      },
    });

    console.log('배지 장착 성공', response.data);
    return response.data;
  } catch (error) {
    console.error('배지 장착 실패', error);
    throw error;
  }
};
