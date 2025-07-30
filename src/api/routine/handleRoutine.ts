import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  addRoutine,
  deleteRoutine,
  editRoutine,
  routineHandler,
} from './routine';
import { AddRoutine, EditRoutine } from '../../../types/routine';
import { WeekRoutineResponse } from './getWeekRoutine';
import { format } from 'date-fns';

// 루틴 추가
export function useAddRoutine() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ AddData }: { AddData: AddRoutine }) => addRoutine(AddData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['week-routine'],
        exact: false,
      });
    },
  });
}

// 루틴 완료 처리
export function useHandleRoutine(mondayStr: string, dateStr: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      scheduleId,
      isDone,
    }: {
      scheduleId: number;
      isDone: boolean;
    }) => routineHandler(scheduleId, isDone),
    // ✅ 요청 직전에 UI 먼저 업데이트
    onMutate: async ({ scheduleId, isDone }) => {
      await queryClient.cancelQueries({ queryKey: ['user-point'] });
      const previousPoints = queryClient.getQueryData<{ points: number }>([
        'user-point',
      ]);

      queryClient.setQueryData(['user-point'], (old: { points: number }) => {
        if (!old) return old;
        return {
          ...old,
          points: old.points + 50, // 완료 시 50점 추가
        };
      });

      const today = format(new Date(), 'yyyy-MM-dd');
      if (dateStr > today) {
        console.log('미래날짜는 완료 불가');
        return;
      }

      await queryClient.cancelQueries({
        queryKey: ['routine-week', mondayStr],
      });
      // 이전 데이터 백업 (롤백용)
      const previousData = queryClient.getQueryData<WeekRoutineResponse>([
        'routine-week',
        mondayStr,
      ]);
      // UI 먼저 업데이트
      queryClient.setQueryData<WeekRoutineResponse>(
        ['routine-week', mondayStr],
        (oldData) => {
          if (!oldData) return oldData;
          if (!oldData.routines[dateStr]) return oldData;
          return {
            ...oldData,
            routines: {
              ...oldData.routines,
              [dateStr]: oldData.routines[dateStr].map((r) =>
                r.scheduleId === scheduleId ? { ...r, isDone } : r,
              ),
            },
          };
        },
      );
      // context에 이전 상태 저장 → 실패 시 롤백
      return { previousData, previousPoints };
    },

    // ✅ 실패 시 롤백
    onError: (_error, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          ['routine-week', mondayStr],
          context.previousData,
        );
      }
      if (context?.previousPoints) {
        queryClient.setQueryData(['user-point'], context.previousPoints);
      }
    },

    // ✅ 성공/실패와 관계없이 서버 상태 동기화
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['routine-week', mondayStr],
      });
      queryClient.invalidateQueries({ queryKey: ['user-point'] });
    },
  });
}

// 루틴 삭제
export function useDeleteRoutine(mondayStr: string, dateStr: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ routineId }: { routineId: number }) =>
      deleteRoutine(routineId),

    onMutate: async ({ routineId }) => {
      await queryClient.cancelQueries({
        queryKey: ['routine-week', mondayStr],
      });

      const previousData = queryClient.getQueryData<WeekRoutineResponse>([
        'routine-week',
        mondayStr,
      ]);

      queryClient.setQueryData<WeekRoutineResponse>(
        ['routine-week', mondayStr],
        (oldData) => {
          if (!oldData) return oldData;
          if (!oldData.routines[dateStr]) return oldData;

          return {
            ...oldData,
            routines: {
              ...oldData.routines,
              [dateStr]: oldData.routines[dateStr].filter(
                (r) => r.routineId !== routineId, // ✅ 해당 routineId 제외
              ),
            },
          };
        },
      );
      return { previousData };
    },

    onError: (_error, _variables, context) => {
      // 🔥 실패 시 롤백
      if (context?.previousData) {
        queryClient.setQueryData(
          ['routine-week', mondayStr],
          context.previousData,
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['routine-week', mondayStr],
      });
    },

    retry: 0,
  });
}

// 루틴 수정
export function useEditRoutine(mondayStr: string, dateStr: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      routineId,
      editData,
    }: {
      routineId: number;
      editData: EditRoutine;
    }) => editRoutine(routineId, editData),
    onMutate: () => {
      queryClient.cancelQueries({
        queryKey: ['routine-week', mondayStr],
      });
      const previousData = queryClient.getQueryData<WeekRoutineResponse>([
        'routine-week',
        mondayStr,
      ]);
    },
  });
}
// export function useEditRoutine() {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: ({
//       routineId,
//       editData,
//     }: {
//       routineId: number;
//       editData: EditRoutine;
//     }) => editRoutine(routineId, editData),
//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ['week-routine'],
//         exact: false,
//       });
//     },
//     retry: 0,
//   });
// }
