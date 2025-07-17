import { create } from 'zustand';

interface UserInfoStore {
  oldPassword: string | null;
  setOldPassword: (pw: string) => void;
}

export const useUserInfoStore = create<UserInfoStore>((set) => ({
  oldPassword: null,
  setOldPassword: (pw) => set({ oldPassword: pw }),
}));
