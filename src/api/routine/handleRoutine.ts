import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  addRoutine,
  deleteRoutine,
  editRoutine,
  routineHandler,
} from './routine';
import { AddRoutine, EditRoutine } from '../../../types/routine';

// 루틴 추가
export function useAddRoutine() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ AddData }: { AddData: AddRoutine }) => addRoutine(AddData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['week-routine'] });
    },
  });
}

// 루틴 완료 처리
export function useHandleRoutine() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      routineId,
      isDone,
    }: {
      routineId: number;
      isDone: boolean;
    }) => routineHandler(routineId, isDone),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['week-routine'] });
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
      queryClient.invalidateQueries({ queryKey: ['week-routine'] });
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
      queryClient.invalidateQueries({ queryKey: ['week-routine'] });
    },
  });
}
