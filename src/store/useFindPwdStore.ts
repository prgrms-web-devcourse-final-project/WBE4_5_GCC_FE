import { create } from 'zustand';

type FindPwdState = {
  // 버튼 활성화 조건
  isNextEnabled: boolean;
  setIsNextEnabled: (enabled: boolean) => void;
};

export const useFindPwdStore = create<FindPwdState>()((set) => ({
  isNextEnabled: false,
  setIsNextEnabled: (enabled) => set({ isNextEnabled: enabled }),
}));
