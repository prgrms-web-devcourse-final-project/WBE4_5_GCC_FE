import { create } from 'zustand';

interface UserEditState {
  nickname: string;
  setNickname: (nickname: string) => void;
  nicknameChecked: boolean;
  setNicknameChecked: (checked: boolean) => void;
  nicknameCheckStatus: true | false | null;
  setNicknameCheckStatus: (status: true | false | null) => void;
}

export const useUserEditStore = create<UserEditState>((set) => ({
  nickname: '',
  setNickname: (nickname) => set({ nickname }),
  nicknameChecked: false,
  setNicknameChecked: (checked) => set({ nicknameChecked: checked }),
  nicknameCheckStatus: null,
  setNicknameCheckStatus: (status) => set({ nicknameCheckStatus: status }),
}));
