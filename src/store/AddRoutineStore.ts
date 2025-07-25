import { persist } from 'zustand/middleware';
import { AddRoutine } from '../../types/routine';
import { create } from 'zustand';

interface AddDataStore extends AddRoutine {
  setData: (routine: AddRoutine) => void;
  resetData: () => void;
}
export const useAddRoutineStore = create<AddDataStore>()(
  persist(
    (set) => ({
      name: '',
      majorCategory: '',
      subCategory: '',
      startRoutineDate: '',
      triggerTime: '',
      isImportant: false,
      repeatType: 'DAILY',
      repeatValue: '',
      repeatInterval: 1,
      setData: (routine: AddRoutine) => set(() => ({ ...routine })),
      resetData: () =>
        set(() => ({
          name: '',
          majorCategory: '',
          subCategory: '',
          startRoutineDate: '',
          triggerTime: '',
          isImportant: false,
          repeatType: 'DAILY',
          repeatValue: '',
          repeatInterval: 1,
        })),
    }),
    {
      name: 'add-routine-data',
    },
  ),
);
