import { useQuery } from '@tanstack/react-query';
import { DayRoutine } from '../../../types/routine';
import { axiosInstance } from '../axiosInstance';

const fetchTodayRoutine = async (): Promise<DayRoutine[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await axiosInstance.get('/api/v1/routines/today');
  console.log('오늘 루틴 로드:', response.data.data);
  return response.data.data;
};

export function useTodayRoutine() {
  const today = new Date().toISOString().slice(0, 10); // '2025-07-20' 형식
  return useQuery({
    queryKey: ['routine-today', today],
    queryFn: () => fetchTodayRoutine(),
  });
}
