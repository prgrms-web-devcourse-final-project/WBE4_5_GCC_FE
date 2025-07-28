import { create } from 'zustand';

type FindPwdState = {
  // 버튼 활성화 조건
  isNextEnabled: boolean;
  newPassword: string;
  setIsNextEnabled: (enabled: boolean) => void;
  setNewPassword: (password: string) => void;
};

export const useFindPwdStore = create<FindPwdState>()((set) => ({
  isNextEnabled: false,
  newPassword: '',
  setIsNextEnabled: (enabled) => set({ isNextEnabled: enabled }),
  setNewPassword: (password) => set({ newPassword: password }),
}));
