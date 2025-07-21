import { useQuery } from '@tanstack/react-query';
import { WeekRoutineMap } from '../../../types/routine';
import { axiosInstance } from '../axiosInstance';

// API 요청 함수
const fetchWeekRoutine = async (date?: string): Promise<WeekRoutineMap> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await axiosInstance.get('/api/v1/routines/weekly', {
    params: { date },
  });
  return response.data.data;
};

// 커스텀 훅
export function useWeekRoutine(date?: string) {
  return useQuery({
    queryKey: ['routine-week', date],
    queryFn: () => fetchWeekRoutine(date),
    staleTime: 5000,
  });
}
