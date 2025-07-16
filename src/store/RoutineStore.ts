import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface RoutineItem {
  routineId: number;
  scheduleId: number;
  majorCategory: string;
  subCategory: string | null;
  name: string;
  triggerTime: string;
  isDone: boolean;
  isImportant: boolean;
}
interface RoutineStoreState {
  // 날짜별 루틴 리스트 저장
  routineDateSet: Record<string, RoutineItem[]>;

  setRoutines: (date: string, routines: RoutineItem[]) => void;
  updateRoutineStatus: (
    date: string,
    scheduleId: number,
    isDone: boolean,
  ) => void;
}

export const useRoutineStore = create<RoutineStoreState>()(
  persist(
    (set, get) => ({
      // 루틴이 저장되는 빈 객체
      routineDateSet: {},

      // 날짜와 루틴 배열 한 세트를 저장
      setRoutines: (date, routines) =>
        set((state) => ({
          routineDateSet: { ...state.routineDateSet, [date]: routines },
        })),

      updateRoutineStatus: (date, scheduleId, isDone) =>
        set((state) => {
          // 없는 날짜에 대한 루틴을 업데이트할때는 오류가 있을 수 있어서 [] 빈 배열 처리를 해줬다.
          const routines = state.routineDateSet[date] || [];

          const updated = routines.map((routine) =>
            routine.scheduleId === scheduleId
              ? { ...routine, isDone }
              : routine,
          );
          return {
            routineDateSet: { ...state.routineDateSet, [date]: updated },
          };
        }),
    }),
    {
      name: 'routine-storage', // localStorage key 이름
    },
  ),
);

interface whatToAdd {
  categoryId: number;
  content: string;
  triggerTime?: string;
  isImportant?: boolean;
  repeatType?: string;
  repeatValue?: string;
}

export const addRoutineStore = create<whatToAdd>()(
  persist(
    (set, get) => ({
      categoryId: 0,
      content: '',
      triggerTime: '',
      isImportant: false,
      repeatType: '',
      repeatValue: '',
    }),
    {
      name: 'add-routine-storage',
    },
  ),
);
