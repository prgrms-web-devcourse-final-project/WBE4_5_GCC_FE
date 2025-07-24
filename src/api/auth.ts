import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/UserStore';
import { axiosInstance } from './axiosInstance';
import { SignUpData } from '../../types/Auth';

// signup - 회원가입
export const signUp = async (data: SignUpData) => {
  try {
    const response = await axiosInstance.post('/api/v1/signup', data);
    console.log('회원가입 성공:', response.data);
  } catch (error) {
    console.log('회원가입 실패', error);
    throw error;
  }
};

// signin - 로그인
export const signIn = async (email: string, password: string) => {
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

// logout - 로그아웃
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

// check - 중복 검사 (이메일)
export const checkEmail = async (email: string) => {
  try {
    const response = await axiosInstance.post('/api/v1/check', {
      email,
    });
    console.log('사용가능한 이메일:', response.data);
    return response.data;
  } catch (error) {
    console.error('이메일 중복:', error);
    throw error;
  }
};

// check - 중복 검사 (닉네임)
export const checkNickname = async (nickname: string) => {
  const response = await axiosInstance.post('/api/v1/check', {
    nickname,
  });
  return response.data;
};

// // auth/email - 인증번호 발송
// export const sendVerificationEmail = async (email: string) => {
//   return axiosInstance
//     .post('/api/v1/auth/email', {
//       email,
//     })
//     .then((res) => res.data);
// };
export const sendVerificationEmail = async (email: string) => {
  return axiosInstance
    .post('/api/v1/auth/email', {
      email,
      code: null,
    })
    .then((res) => {
      console.log('✅ 인증 이메일 발송 성공:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.error('❌ 인증 이메일 발송 실패:', err);
      throw err;
    });
};

// auth/code - 인증번호 검증
export const verifyEmailCode = async (email: string, code: string) => {
  return axiosInstance
    .post('/api/v1/auth/code', {
      email,
      code,
    })
    .then((res) => res.data);
};
