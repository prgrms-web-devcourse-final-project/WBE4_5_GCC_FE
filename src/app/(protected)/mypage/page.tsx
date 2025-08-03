'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { logout } from '@/api/auth';
import SettingsItem from '@/app/components/mypage/SettingsItem';
import Profile from '@/app/components/main/Profile';
import Button from '@/app/components/common/ui/Button';
import LogoutModal from '@/app/components/common/LogoutModal';
import { useUserStore } from '@/store/UserStore';
import { useQueryClient } from '@tanstack/react-query';

export default function Page() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [templateUse, setTemplateUse] = useState(false);

  return (
    <div className="flex min-h-screen flex-col items-center px-4">
      <div className="w-full max-w-[614px] rounded-lg px-6 py-6 shadow-md dark:bg-[var(--dark-bg-primary)]">
        <Profile />

        <Button
          className="mt-5 h-[48px] w-full text-base font-semibold text-white dark:bg-[var(--dark-gray-200)] dark:text-[var(--dark-bg-primary)]"
          onClick={() => router.push('/mypage/edit-character')}
        >
          캐릭터 꾸미기
        </Button>

        <div className="mt-8 flex flex-col space-y-4 bg-white dark:bg-[var(--dark-bg-primary)]">
          <SettingsItem
            label="회원정보 변경"
            type="link"
            onClick={() => router.push('/mypage/change-userinfo')}
          />
          <SettingsItem
            label="비밀번호 변경"
            type="link"
            onClick={() => router.push('/mypage/change-password')}
          />
          <SettingsItem
            label="알림 설정"
            type="link"
            onClick={() => router.push('/mypage/notification')}
          />
          <SettingsItem
            label="다크모드 설정"
            type="toggle"
            checked={darkMode}
            onToggle={setDarkMode}
          />
          <SettingsItem
            label="기본 루틴 템플릿 사용 설정"
            type="toggle"
            checked={templateUse}
            onToggle={setTemplateUse}
          />
          <SettingsItem
            label="로그아웃"
            type="link"
            onClick={() => setShowLogoutModal(true)}
          />
          <SettingsItem
            label="회원탈퇴"
            type="link"
            onClick={() => router.push('/mypage/delete-account')}
          />
        </div>
      </div>

      {showLogoutModal && (
        <LogoutModal
          onClose={() => setShowLogoutModal(false)}
          onConfirm={async () => {
            try {
              await logout();
            } catch (error) {
              console.warn('이미 로그아웃 상태거나 에러 발생:', error);
            } finally {
              useUserStore.getState().resetUser();
              queryClient.clear();
              router.replace('/login');
              setShowLogoutModal(false);
            }
          }}
        />
      )}
    </div>
  );
}
