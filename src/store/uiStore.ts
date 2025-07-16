import { create } from 'zustand';

type UIState = {
  isBottomSheetOpen: boolean;
  setIsBottomSheetOpen: (open: boolean) => void;
  isCalendarBottomSheetOpen: boolean;
  setIsCalendarBottomSheetOpen: (open: boolean) => void;
};

export const useUIStore = create<UIState>((set) => ({
  isBottomSheetOpen: false,
  setIsBottomSheetOpen: (open) => set({ isBottomSheetOpen: open }),
  isCalendarBottomSheetOpen: false,
  setIsCalendarBottomSheetOpen: (open) =>
    set({ isCalendarBottomSheetOpen: open }),
}));
