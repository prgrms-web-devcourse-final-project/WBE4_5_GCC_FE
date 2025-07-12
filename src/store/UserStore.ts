import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserStore {
  email: string;
  name: string;
  nickname: string;
  residenceExperience: string;
  regionDept1: string;
  regionDept2: string;
  regionDept3: string;
  resetUser: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      email: '',
      name: '',
      nickname: '',
      residenceExperience: '',
      regionDept1: '',
      regionDept2: '',
      regionDept3: '',
      resetUser: () =>
        set({
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
