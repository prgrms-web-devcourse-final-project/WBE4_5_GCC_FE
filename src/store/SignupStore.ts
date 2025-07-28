import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type SignUpState = {
  name: string;
  email: string;
  password: string;
  checkPassword: string;
  wantEmail: boolean;
  nickname: string;
  residenceExperience: string;
  categories: number[];
  regionDept1: string;
  regionDept2: string;
  regionDept3: string;

  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setNickname: (nickname: string) => void;
  setPassword: (password: string) => void;
  setCheckPassword: (checkPassword: string) => void;
  setWantEmail: (wantEmail: boolean) => void;
  setResidenceExperience: (option: string) => void;
  setCategories: (categories: number[]) => void;
  setRegionDept1: (value: string) => void;
  setRegionDept2: (value: string) => void;
  setRegionDept3: (value: string) => void;

  // 페이지 렌더링 스텝
  step: number;
  setStep: (step: number) => void;

  // 버튼 활성화 조건
  isNextEnabled: boolean;
  setIsNextEnabled: (enabled: boolean) => void;

  reset: () => void;
};

export const useSignUpStore = create<SignUpState>()(
  persist(
    (set) => ({
      name: '',
      email: '',
      password: '',
      checkPassword: '',
      wantEmail: false,
      nickname: '',
      residenceExperience: '',
      categories: [],
      regionDept1: '',
      regionDept2: '',
      regionDept3: '',
      setName: (name) => set({ name }),
      setEmail: (email) => set({ email }),
      setPassword: (password) => set({ password }),
      setCheckPassword: (checkPassword) => set({ checkPassword }),
      setWantEmail: (wantEmail) => set({ wantEmail }),
      setNickname: (nickname) => set({ nickname }),
      setResidenceExperience: (residenceExperience) =>
        set({ residenceExperience }),
      step: 1,
      setStep: (step) => set({ step }),
      isNextEnabled: false,
      setIsNextEnabled: (enabled) => set({ isNextEnabled: enabled }),
      setCategories: (categories) => set({ categories }),
      setRegionDept1: (regionDept1) => set({ regionDept1 }),
      setRegionDept2: (regionDept2) => set({ regionDept2 }),
      setRegionDept3: (regionDept3) => set({ regionDept3 }),

      reset: () =>
        set({
          name: '',
          email: '',
          password: '',
          checkPassword: '',
          wantEmail: false,
          nickname: '',
          residenceExperience: '',
          categories: [],
          regionDept1: '',
          regionDept2: '',
          regionDept3: '',
          step: 1,
          isNextEnabled: false,
        }),
    }),
    {
      name: 'signup-storage',
    },
  ),
);
