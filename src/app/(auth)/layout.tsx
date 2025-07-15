'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/UserStore';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const hydrated = useUserStore.persist.hasHydrated();
  const router = useRouter();

  useEffect(() => {
    if (hydrated && isLoggedIn) {
      // 이미 로그인된 상태면 메인 페이지 등으로 보냄
      router.replace('/');
    }
  }, [hydrated, isLoggedIn, router]);

  if (!hydrated) return null;

  // 로그인되어있으면 children 보여주지 않음 (리다이렉트 중이므로)
  if (isLoggedIn) return null;

  return <>{children}</>;
}
