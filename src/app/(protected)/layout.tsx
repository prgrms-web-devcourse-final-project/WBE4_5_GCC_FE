'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/UserStore';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  const router = useRouter();
  const hydrated = useUserStore.persist.hasHydrated();

  useEffect(() => {
    if (hydrated && !isLoggedIn) {
      router.replace('/login');
    }
  }, [hydrated, isLoggedIn, router]);

  if (!hydrated) return null;
  if (!isLoggedIn) return null;

  return <>{children}</>;
}
