import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserStore {
  isLoggedIn: boolean;
  point: number;
  email: string;
  name: string;
  nickname: string;
  residenceExperience: string;
  regionDept1: string;
  regionDept2: string;
  regionDept3: string;
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
      setUser: (user) => set((state) => ({ ...state, ...user })),
      resetUser: () =>
        set({
          isLoggedIn: false,
          point: 0,
          email: '',
          name: '',
          nickname: '',
          residenceExperience: '',
          regionDept1: '',
          regionDept2: '',
          regionDept3: '',
        }),
    }),
    {
      name: 'user-storage',
    },
  ),
);

// persist 안쓰고 로컬스토리지에 저장하는것도 한번 해보자
// 토큰이 만료되었을때 처리도 해줘야한다.
