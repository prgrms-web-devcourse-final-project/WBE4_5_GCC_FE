'use client'

import { usePathname } from "next/navigation"
import { useUIStore } from "@/store/uiStore";
import Header from "./ui/Header";
import BottomNav from "./ui/BottomNav";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  const isBottomSheetOpen = useUIStore((state) => state.isBottomSheetOpen);
  const isCalendarBottomSheetOpen = useUIStore((state) => state.isCalendarBottomSheetOpen);

  const hiddenBottomNavRoutes = [
    '/login',
    '/find-password',
    '/signup',
    'signup-complete',
    '/find-password/reset',
    '/collection',
  ];

  const isMypageSubRoute = pathname.startsWith('/mypage/') && pathname !== '/mypage';

  const showBottomNav = !hiddenBottomNavRoutes.includes(pathname) && !isBottomSheetOpen && !isCalendarBottomSheetOpen && !isMypageSubRoute

  return (
    <>
      <Header />
      <main>{children}</main>
      {showBottomNav && <BottomNav />}
    </>
  );
}