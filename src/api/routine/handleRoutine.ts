import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  addRoutine,
  deleteRoutine,
  editRoutine,
  routineHandler,
} from './routine';
import { AddRoutine, EditRoutine } from '../../../types/routine';
import { WeekRoutineResponse } from './getWeekRoutine';

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
    onSuccess: (_data, variables) => {
      const { scheduleId, isDone } = variables;
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
    },
  });
}

// 루틴 삭제
export function useDeleteRoutine() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ routineId }: { routineId: number }) =>
      deleteRoutine(routineId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['week-routine'],
        exact: false,
      });
    },
  });
}

// 루틴 수정
export function useEditRoutine() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      routineId,
      editData,
    }: {
      routineId: number;
      editData: EditRoutine;
    }) => editRoutine(routineId, editData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['week-routine'],
        exact: false,
      });
    },
  });
}
