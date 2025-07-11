import { axiosInstance } from '@/api/api';
import { useSignUpStore } from '@/store/SignupStore';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

interface SignUpData {
  email: string;
  password: string;
  name: string;
  nickname: string;
  wantEmail: boolean;
  residenceExperience: string;
  interest_category: string[];
}

export const useSignUp = () => {
  const reset = useSignUpStore((state) => state.reset);
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: SignUpData) => {
      const response = await axiosInstance.post('/api/v1/signup', data, {
        withCredentials: true,
      });
      return response.data;
    },
    onSuccess: () => {
      console.log('회원가입 성공!');
      router.push('/login');
      reset();
    },
    onError: () => {
      console.log('회원가입 실패');
    },
  });
};
