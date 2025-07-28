import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/UserStore';
import { axiosInstance } from './axiosInstance';

// signup - 회원가입
export const signUp = async (email: string, password: string, name: string) => {
  const response = await axiosInstance.post('/api/v1/signup', {
    email,
    password,
    name,
  });
  return response.data;
};

// signin - 로그인
export const signIn = async (email: string, password: string) => {
  const response = await axiosInstance.post('/api/v1/signin', {
    email,
    password,
  });
  return response.data;
};

// logout - 로그아웃
export const logout = async (router: ReturnType<typeof useRouter>) => {
  const resetUser = useUserStore.getState().resetUser;
  await axiosInstance.post('/api/v1/logout');
  resetUser();
  router.replace('/login');
};

// check - 중복 검사 (이메일)
export const checkEmail = async (email: string) => {
  const response = await axiosInstance.post('/api/v1/check', {
    email,
  });
  return response.data;
};

// check - 중복 검사 (닉네임)
export const checkNickname = async (nickname: string) => {
  const response = await axiosInstance.post('/api/v1/check', {
    nickname,
  });
  return response.data;
};

// auth/email - 인증번호 발송
export const sendVerificationEmail = async (email: string) => {
  const response = await axiosInstance.post('/api/v1/auth/email', {
    email,
    code: null,
  });
  return response.data;
};

// auth/code - 인증번호 검증
export const verifyEmailCode = async (email: string, code: string) => {
  const response = await axiosInstance.post('/api/v1/auth/code', {
    email,
    code,
  });
  return response.data;
};
