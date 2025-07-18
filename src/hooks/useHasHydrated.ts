import { useUserStore } from '@/store/UserStore';

type PersistStore = typeof useUserStore & {
  persist: {
    hasHydrated: () => boolean;
  };
};

export const useHasHydrated = (): boolean => {
  return (useUserStore as PersistStore).persist?.hasHydrated?.() ?? false;
};

// import { useUserStore } from '@/store/UserStore';

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const useHasHydrated = (): boolean => {
//   return (useUserStore as any).persist?.hasHydrated?.() ?? false;
// };
