import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/api/api';
import { User } from '../../types/User';

// (): Promise<User>  : 결과로 User 타입의 값을 Promise로 감싸서 리턴한다.
//    -> 이 함수는 나중에 User 타입 데이터를 주기로 약속!
// 그러기 위해서는 User 타입을 정해줘야겠지. /tpes/index.d.ts 이런 식
const fetchUser = async (): Promise<User> => {
  const response = await axiosInstance.get('/api/v1/members/me');
  return response.data;
};

export const useUserQuery = () => {
  return useQuery({
    queryKey: ['user'], // 쿼리의 이름 (고유 식별자), 이 키로 refetch,캐시,유지,동기화 가능
    queryFn: fetchUser, // 서버에서 데이터를 받아오는 함수
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지.
    retry: false, // 실패 시 재시도 하지 않도록 설정 (선택)
  });
};

// 컴포넌트에서는 이렇게 사용
// const { data: user, isPending, isError } = useUserQuery();
