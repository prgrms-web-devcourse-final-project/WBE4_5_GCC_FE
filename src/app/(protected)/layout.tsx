'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/UserStore';
import { useHasHydrated } from '@/hooks/useHasHydrated';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  const router = useRouter();
  const hydrated = useHasHydrated();

  useEffect(() => {
    if (hydrated && !isLoggedIn) {
      console.log(isLoggedIn);
      router.replace('/login');
    }
  }, [hydrated, isLoggedIn, router]);

  if (!hydrated) return null;
  if (!isLoggedIn) return null;

  return <>{children}</>;
}
