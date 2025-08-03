'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/UserStore';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    if (!isLoggedIn) {
      router.replace('/login');
    }
  }, [isLoggedIn, router]);

  return <>{hydrated ? children : null}</>;
}

//   useEffect(() => {
//     setHydrated(true);
//   }, []);

//   useEffect(() => {
//     if (hydrated && !isLoggedIn) {
//       router.replace('/login');
//     }
//   }, [hydrated, isLoggedIn, router]);

//   if (!hydrated) return null;
//   if (!isLoggedIn) return null;

//   return <>{children}</>;
// }
