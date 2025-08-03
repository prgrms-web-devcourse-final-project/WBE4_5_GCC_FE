import { useUserStore } from '@/store/UserStore';
import { axiosInstance } from './axiosInstance';
import axios, { AxiosError } from 'axios';

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
  // 로그인 성공 시 유저 상태 업데이트
  const { setIsLoggedIn } = useUserStore.getState();
  setIsLoggedIn(true);
  return response.data;
};

// logout - 로그아웃
export const logout = async () => {
  try {
    await axiosInstance.post('/api/v1/logout');
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      console.log('이미 로그아웃된 상태입니다.');
    } else {
      throw error;
    }
  }
};

// check - 중복 검사 (이메일)
export const checkEmail = async (email: string): Promise<boolean> => {
  try {
    await axiosInstance.post('/api/v1/check', { email });
    return false;
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === 409) {
      return true;
    }

    throw error;
  }
};
// check - 중복 검사 (닉네임)
export const checkNickname = async (nickname: string): Promise<boolean> => {
  const response = await axiosInstance.post('/api/v1/check', { nickname });
  return response.data?.data?.isDuplicated ?? true;
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
