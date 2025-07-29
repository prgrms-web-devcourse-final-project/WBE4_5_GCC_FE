import { useQuery } from '@tanstack/react-query';
import { getPreset } from './routine';

export function useRoutinePreset(categoryId: number) {
  return useQuery({
    queryKey: ['routine-preset', categoryId],
    queryFn: () => getPreset(categoryId),
    enabled: !!categoryId,
  });
}
