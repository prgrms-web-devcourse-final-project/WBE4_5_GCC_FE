import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserStore {
  isLoggedIn: boolean;
  email: string;
  name: string;
  nickname: string;
  userPoint: number;
  residenceExperience: string;
  regionDept1: string;
  regionDept2: string;
  regionDept3: string;
  setIsLoggedIn: (value: boolean) => void;
  setUserPoint: (value: number) => void;
  setUser: (user: Partial<Omit<UserStore, 'setUser' | 'resetUser'>>) => void;
  resetUser: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      point: 0,
      email: '',
      name: '',
      nickname: '',
      residenceExperience: '',
      regionDept1: '',
      regionDept2: '',
      regionDept3: '',
      userPoint: 0,
      setIsLoggedIn: (value) => set({ isLoggedIn: value }),
      setUser: (user) => set((state) => ({ ...state, ...user })),
      setUserPoint: (value) => set({ userPoint: value }),
      resetUser: () =>
        set({
          isLoggedIn: false,
          email: '',
          name: '',
          nickname: '',
          residenceExperience: '',
          regionDept1: '',
          regionDept2: '',
          regionDept3: '',
          userPoint: 0,
        }),
    }),
    {
      name: 'user-storage',
    },
  ),
);
