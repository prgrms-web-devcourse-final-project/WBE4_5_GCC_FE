import { User } from '../../types/User';
import { axiosInstance } from './axiosInstance';

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

export const handleSignUp = async (
  email: string,
  password: string,
  name: string,
  nickname: string,
  wantEmail: boolean,
  residenceExperience: string,
  interest_category: string[],
) => {
  try {
    const response = await axiosInstance.post('/api/v1/signup', {
      email,
      password,
      nickname,
      name,
      wantEmail,
      residenceExperience,
      interest_category,
    });
    console.log('회원가입 성공:', response.data);
  } catch (error) {
    console.log('회원가입 실패', error);
    throw error;
  }
};

export const me = async () => {
  const { data }: { data: User } =
    await axiosInstance.get('/api/v1/members/me');
  return data;
};

export const logout = async () => {
  return await axiosInstance.post('/api/v1/logout');
};
