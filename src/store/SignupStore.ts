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
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setNickName: (nickname: string) => void;
  setPassword: (password: string) => void;
  setCheckPassword: (checkPassword: string) => void;
  setWantEmail: (wantEmail: boolean) => void;
  setResidenceExperience: (option: string) => void;
  setCategories: (categories: number[]) => void;

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
      setName: (name) => set({ name }),
      setEmail: (email) => set({ email }),
      setPassword: (password) => set({ password }),
      setCheckPassword: (checkPassword) => set({ checkPassword }),
      setWantEmail: (wantEmail) => set({ wantEmail }),
      setNickName: (nickname) => set({ nickname }),
      setResidenceExperience: (residenceExperience) =>
        set({ residenceExperience }),
      step: 1,
      setStep: (step) => set({ step }),
      isNextEnabled: false,
      setIsNextEnabled: (enabled) => set({ isNextEnabled: enabled }),
      setCategories: (categories) => set({ categories }),

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
          step: 1,
          isNextEnabled: false,
        }),
    }),
    {
      name: 'signup-storage',
    },
  ),
);
