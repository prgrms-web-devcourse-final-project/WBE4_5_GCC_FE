'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/UserStore';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const hydrated = useUserStore.persist.hasHydrated();
  const [hydrated, setHydrated] = useState(false);
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const router = useRouter();

  useEffect(() => {
    // 클라이언트 환경에서만 실행됨
    if (useUserStore.persist?.hasHydrated) {
      const hasHydrated = useUserStore.persist.hasHydrated();
      setHydrated(hasHydrated);
    } else {
      // persist가 없으면 기본 true (hydrate 필요 없으면)
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (hydrated && isLoggedIn) {
      router.replace('/');
    }
  }, [hydrated, isLoggedIn, router]);

  if (!hydrated) return null;
  if (isLoggedIn) return null;

  return <>{children}</>;
}
