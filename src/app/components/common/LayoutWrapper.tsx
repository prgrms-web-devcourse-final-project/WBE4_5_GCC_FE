'use client';

import { usePathname } from 'next/navigation';
import { useUIStore } from '@/store/uiStore';
import Header from './ui/Header';
import BottomNav from './ui/BottomNav';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  const isBottomSheetOpen = useUIStore((state) => state.isBottomSheetOpen);
  const isCalendarBottomSheetOpen = useUIStore(
    (state) => state.isCalendarBottomSheetOpen,
  );

  const hiddenBottomNavRoutes = [
    '/login',
    '/find-password',
    '/signup',
    '/signup/complete',
    '/find-password/reset',
    '/collection',
    // '/admin',
    '/routine/add-routine',
    '/routine/edit-category',
    '/routine/add-category',
    '/',
  ];

  const isMypageSubRoute =
    pathname.startsWith('/mypage/') && pathname !== '/mypage';

  const isAdminSubRoute =
    pathname.startsWith('/admin/') && pathname !== '/admin';

  const showBottomNav =
    !hiddenBottomNavRoutes.includes(pathname) &&
    !isBottomSheetOpen &&
    !isCalendarBottomSheetOpen &&
    !isMypageSubRoute &&
    !isAdminSubRoute;

  return (
    <div className="mx-auto flex h-screen w-full max-w-[614px] flex-col bg-white">
      <Header />
      <main className="flex-grow pt-[54px] dark:bg-[var(--dark-bg-secondary)]">
        {children}
      </main>
      {showBottomNav && <BottomNav />}
    </div>
  );
}
