'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { logout } from '@/api/api';
import SettingsItem from '@/app/components/mypage/SettingsItem';
import Profile from '@/app/components/main/Profile';
import Button from '@/app/components/common/ui/Button';
import LogoutModal from '@/app/components/common/LogoutModal';

export default function Page() {
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [templateUse, setTemplateUse] = useState(false);

  return (
    <div className="h-1vh flex flex-col items-center px-5">
      <div className="w-full max-w-md">
        <Profile />
        <Button
          className="mt-5 h-[48px] bg-[#222222] text-sm font-medium text-white"
          onClick={() => router.push('/mypage/edit-character')}
        >
          캐릭터 꾸미기
        </Button>

        <div className="mt-8 bg-white">
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
          onConfirm={() => {
            console.log('로그아웃');
            logout(router);
            setShowLogoutModal(false);
          }}
        />
      )}
    </div>
  );
}