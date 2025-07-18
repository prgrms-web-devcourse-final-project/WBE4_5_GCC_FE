import { useQuery } from '@tanstack/react-query';
import { WeekRoutineMap } from '../../../types/routine';
import { axiosInstance } from '../axiosInstance';

// API 요청 함수
const fetchWeekRoutine = async (date?: string): Promise<WeekRoutineMap> => {
  const response = await axiosInstance.get('/api/v1/routines/weekly', {
    params: { date },
  });
  console.log('주간 데이터 로드:', response.data.data);
  return response.data.data;
};

// 커스텀 훅
export function useWeekRoutine(date?: string) {
  return useQuery({
    queryKey: ['weekRoutine', date],
    queryFn: () => fetchWeekRoutine(date),
  });
}

// 호출할때
const { data } = useWeekRoutine('2025-07-18');
