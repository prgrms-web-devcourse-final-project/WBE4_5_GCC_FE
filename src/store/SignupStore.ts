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
    }),
    {
      name: 'signup-storage',
    }
  )
);
