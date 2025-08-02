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
    <div className="w-full max-w-[614px] mx-auto bg-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow overflow-auto">{children}</main>
      {showBottomNav && <BottomNav />}
    </div>
  );
}
