import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Routine {
  scheduleId: number;
  routineId: number;
  majorCategory: string;
  subCategory: string | null;
  name: string;
  triggerTime: string;
  isDone: boolean;
  isImportant: boolean;
}

interface RoutineStore {
  date: string;
  routines: Routine[];
  setRoutines: (date: string, routines: Routine[]) => void;
}

export const useRoutineStore = create<RoutineStore>()(
  persist((set) => ({}), {
    name: 'routine-storage',
  }),
);
