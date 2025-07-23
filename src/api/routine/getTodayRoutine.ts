import { useQuery } from '@tanstack/react-query';
import { fetchTodayRoutine } from './routine';

export function useTodayRoutine() {
  const today = new Date().toISOString().slice(0, 10); // '2025-07-20' 형식
  return useQuery({
    queryKey: ['routine-today', today],
    queryFn: () => fetchTodayRoutine(),
  });
}
