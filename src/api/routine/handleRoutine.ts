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
      queryClient.invalidateQueries({
        queryKey: ['week-routine'],
        exact: false,
      });
    },
  });
}

// 루틴 완료 처리
export function useHandleRoutine() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      scheduleId,
      isDone,
    }: {
      scheduleId: number;
      isDone: boolean;
    }) => routineHandler(scheduleId, isDone),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['week-routine'],
        exact: false,
      });
    },
  });
}
//   return useMutation({
//     mutationFn: ({
//       scheduleId,
//       isDone,
//     }: {
//       scheduleId: number;
//       isDone: boolean;
//     }) => routineHandler(scheduleId, isDone),

//     // ✅ 낙관적 업데이트
//     onMutate: async ({ scheduleId, isDone }) => {
//       // 1️⃣ 기존 데이터 백업
//       await queryClient.cancelQueries({ queryKey: ['routine-week'] });
//       const previousData = queryClient.getQueryData<WeekRoutineResponse>([
//         'routine-week',
//       ]);
//       // 2️⃣ 낙관적으로 해당 루틴의 isDone 업데이트
//       queryClient.setQueryData(
//         ['routine-week'],
//         (oldData: WeekRoutineResponse) => {
//           if (!oldData) return oldData;
//           return {
//             ...oldData,
//             routines: {
//               ...oldData.routines,
//               [dateStr!]: oldData.routines[dateStr!].map((r: DayRoutine) =>
//                 r.scheduleId === scheduleId ? { ...r, isDone } : r,
//               ),
//             },
//           };
//         },
//       );
//       return { previousData };
//     },
//     // ❌ 에러 시 롤백
//     onError: (_err, _variables, context) => {
//       if (context?.previousData) {
//         queryClient.setQueryData(['routine-week'], context.previousData);
//       }
//     },
//     // ✅ 서버와 최종 동기화
//     onSettled: () => {
//       queryClient.invalidateQueries({ queryKey: ['routine-week'] });
//     },
//   });
// }

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
