import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface MemberInfo {
  email: string;
  name: string;
  nickname: string;
  residenceExperience: string;
  regionDept1: string;
  regionDept2: string;
  regionDept3: string;
}

interface UserStore {
  isLoggedIn: boolean;
  points: number;
  equippedBadge: string;
  member: MemberInfo;
  setIsLoggedIn: (value: boolean) => void;
  setPoints: (value: number) => void;
  setEquippedBadge: (value: string) => void;
  setMember: (member: Partial<MemberInfo>) => void;
  resetUser: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      points: 0,
      equippedBadge: '',
      member: {
        email: '',
        name: '',
        nickname: '',
        residenceExperience: '',
        regionDept1: '',
        regionDept2: '',
        regionDept3: '',
      },
      setIsLoggedIn: (value) => set({ isLoggedIn: value }),
      setMember: (member) =>
        set((state) => ({
          member: {
            ...state.member,
            ...member,
            regionDept1: member.regionDept1 ?? '',
            regionDept2: member.regionDept2 ?? '',
            regionDept3: member.regionDept3 ?? '',
          },
        })),
      setPoints: (value) => set({ points: value }),
      setEquippedBadge: (value) => set({ equippedBadge: value }),
      resetUser: () =>
        set({
          isLoggedIn: false,
          points: 0,
          member: {
            email: '',
            name: '',
            nickname: '',
            residenceExperience: '',
            regionDept1: '',
            regionDept2: '',
            regionDept3: '',
          },
          equippedBadge: '',
        }),
    }),
    {
      name: 'user-storage',
    },
  ),
);
