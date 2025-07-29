import { useQuery } from '@tanstack/react-query';
import { fetchWeekRoutine } from './routine';
import { startOfWeek, format } from 'date-fns';
import { DayRoutine } from '../../../types/routine';
export interface WeekRoutineResponse {
  routines: Record<string, DayRoutine[]>;
}
export function useWeekRoutine(dateStr?: string) {
  const date = dateStr ? new Date(dateStr) : new Date();

  // 입력된 날짜의 주 월요일 구하기.
  const monday = startOfWeek(date, { weekStartsOn: 1 });
  const mondayStr = format(monday, 'yyyy-MM-dd');

  return useQuery<WeekRoutineResponse>({
    queryKey: ['routine-week', mondayStr],
    queryFn: () => fetchWeekRoutine(mondayStr),
    staleTime: 0,
  });
}
