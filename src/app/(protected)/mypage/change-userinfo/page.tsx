'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/UserStore';

export default function ChangeUserInfoEntry() {
  const router = useRouter();
  const { isSocial } = useUserStore();

  useEffect(() => {
    if (isSocial) {
      router.replace('/mypage/change-userinfo/userinfo');
    } else {
      router.replace('/mypage/change-userinfo/check-password');
    }
  }, [isSocial, router]);

  return null;
}
