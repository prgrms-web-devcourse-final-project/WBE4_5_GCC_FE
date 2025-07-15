import { useUserStore } from '@/store/UserStore';
import { User } from '../../types/User';
import { axiosInstance } from './axiosInstance';
import { useRouter } from 'next/navigation';

export const handleSignIn = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post('/api/v1/signin', {
      email,
      password,
    });
    console.log('로그인 성공', response.data);
  } catch (error) {
    console.error('로그인 실패', error);
    throw error;
  }
};

// 이메일 중복 확인
export const emailCheck = async (email: string) => {
  try {
    const response = await axiosInstance.post('/api/v1/check', null, {
      params: { email },
    });
    console.log('사용가능한 이메일:', response.data);
  } catch (error) {
    console.error('이메일 중복:', error);
    throw error;
  }
};

// 닉네임 중복 확인
export const nicknameCheck = async (nickname: string) => {
  try {
    const response = await axiosInstance.post('/api/v1/check', null, {
      params: { nickname },
    });
    console.log('사용가능한 닉네임:', response.data);
  } catch (error) {
    console.error('닉네임 중복:', error);
    throw error;
  }
};

// 회원가입
export const handleSignUp = async (
  email: string,
  password: string,
  name: string,
  nickname: string,
  wantEmail: boolean,
  residenceExperience: string,
  interestedCategoryIds: string[],
) => {
  try {
    const response = await axiosInstance.post('/api/v1/signup', {
      email,
      password,
      name,
      nickname,
      interestedCategoryIds,
      residenceExperience,
      wantEmail,
    });
    console.log('회원가입 성공:', response.data);
  } catch (error) {
    console.log('회원가입 실패', error);
    throw error;
  }
};

// export const verifyEmail = async () => {
// }

export const me = async () => {
  const { setUser } = useUserStore.getState();
  try {
    const { data }: { data: User } = await axiosInstance.get('/api/v1/members');
    setUser({ ...data, isLoggedIn: true });
    return data;
  } catch (error) {
    console.log('유저 정보 불러오기 실패:', error);
  }
};

export const logout = async (router: ReturnType<typeof useRouter>) => {
  const resetUser = useUserStore.getState().resetUser;

  try {
    await axiosInstance.post('/api/v1/logout');
  } catch (error) {
    console.error('로그아웃 실패', error);
  } finally {
    resetUser();
    router.replace('/login');
  }
};
