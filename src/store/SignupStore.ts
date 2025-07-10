import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type SignUpState = {
  name: string;
  email: string;
  password: string;
  checkPassword: string;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setCheckPassword: (checkPassword: string) => void;
  
  // 페이지 렌더링 스텝
  step: number;
  setStep: (step:number) => void

  // 버튼 활성화 조건
  isNextEnabled : boolean;
  setIsNextEnabled : (enabled : boolean) => void
};

export const useSignUpStore = create<SignUpState>()(
  persist(
    (set) => ({
      name: '',
      email: '',
      password: '',
      checkPassword: '',
      setName: (name) => set({ name }),
      setEmail: (email) => set({ email }),
      setPassword: (password) => set({ password }),
      setCheckPassword: (checkPassword) => set({ checkPassword }),
      reset: () =>
        set({ name: '', email: '', password: '', checkPassword: '' }),

      step: 1,
      setStep: (step) => set( {step} ),
      
      isNextEnabled: false,
      setIsNextEnabled: (enabled) => set ( {isNextEnabled: enabled} )
    }),
    {
      name: 'signup-storage',
    }
  )
);
