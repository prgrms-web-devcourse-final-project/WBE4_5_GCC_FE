// routineStore.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface RoutineItem {
  routineId: number;
  scheduleId: number;
  categoryId: number;
  majorCategory: string;
  subCategory?: string | null;
  name: string;
  triggerTime: string;
  isDone: boolean;
  isImportant: boolean;
  date: string;
  initDate: string;
  repeatType: string;
  repeatValue: string;
}

interface RoutineStore extends RoutineItem {
  setRoutine: (routine: RoutineItem) => void;
  resetRoutine: () => void;
}

export const useRoutineStore = create<RoutineStore>()(
  persist(
    (set) => ({
      routineId: 0,
      scheduleId: 0,
      majorCategory: '',
      subCategory: '',
      categoryId: 1,
      name: '',
      triggerTime: '',
      isDone: false,
      isImportant: false,
      date: '',
      initDate: '',
      repeatType: '',
      repeatValue: '',
      setRoutine: (routine: RoutineItem) => set(() => ({ ...routine })),
      resetRoutine: () =>
        set(() => ({
          routineId: 0,
          scheduleId: 0,
          categoryId: 1,
          majorCategory: '',
          subCategory: '',
          name: '',
          triggerTime: '',
          isDone: false,
          isImportant: false,
          date: '',
          initDate: '',
          repeatType: '',
          repeatValue: '',
        })),
    }),
    { name: 'routine-storage' },
  ),
);
