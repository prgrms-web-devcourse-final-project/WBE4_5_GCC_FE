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

interface BadgeInfo {
  badgeKey: string;
  badgeName: string;
  badgeTier: string;
}

interface UserStore {
  isLoggedIn: boolean;
  points: number;
  member: MemberInfo;
  badge: BadgeInfo;
  setIsLoggedIn: (value: boolean) => void;
  setPoints: (value: number) => void;
  setMember: (member: Partial<MemberInfo>) => void;
  setBadge: (badge: Partial<BadgeInfo>) => void;
  resetUser: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
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
      badge: {
        badgeKey: '',
        badgeName: '',
        badgeTier: '',
      },
      setIsLoggedIn: (value) => set({ isLoggedIn: value }),
      setMember: (member) =>
        set((state) => ({ member: { ...state.member, ...member } })),
      setBadge: (badge) =>
        set((state) => ({ badge: { ...state.badge, ...badge } })),
      setPoints: (value) => set({ points: value }),
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
          badge: {
            badgeKey: '',
            badgeName: '',
            badgeTier: '',
          },
        }),
    }),
    {
      name: 'user-storage',
    },
  ),
);
