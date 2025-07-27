import { useQuery } from '@tanstack/react-query';
import { fetchWeekRoutine } from './routine';
import { startOfWeek, format } from 'date-fns';

export function useWeekRoutine(dateStr?: string) {
  const date = dateStr ? new Date(dateStr) : new Date();

  // 입력된 날짜의 주 월요일 구하기.
  const monday = startOfWeek(date, { weekStartsOn: 1 });
  const mondayStr = format(monday, 'yyyy-MM-dd');

  return useQuery({
    queryKey: ['routine-week', mondayStr],
    queryFn: () => fetchWeekRoutine(mondayStr),
    staleTime: 5000,
  });
}
