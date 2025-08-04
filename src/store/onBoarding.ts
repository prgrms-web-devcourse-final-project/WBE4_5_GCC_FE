import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type OnBoardingStore = {
  step: number;
  setStep: (step: number) => void;
  resetStep: () => void;
};

export const useOnBoardingStore = create<OnBoardingStore>()(
  persist(
    (set) => ({
      step: 1,
      setStep: (step) => set({ step }),
      resetStep: () =>
        set({
          step: 1,
        }),
    }),
    {
      name: 'onBoarding-storage',
    },
  ),
);
