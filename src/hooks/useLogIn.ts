import { axiosInstance } from '@/api/api';
import { useMutation } from '@tanstack/react-query';

import { useRouter } from 'next/navigation';

interface LogInData {
  email: string;
  password: string;
}

export const useLogIn = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: LogInData) => {
      const response = await axiosInstance.post('/api/v1/login', data, {
        withCredentials: true,
      });
      return response.data;
    },
    onSuccess: () => {
      console.log('로그인 성공');
      router.push('/');
      return;
    },
    onError: () => {
      console.log('로그인 실패');
    },
  });
};
