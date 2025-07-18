'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import LogoutModal from '../components/common/LogoutModal';
import SettingsItem from '../components/profile/SettingsItem';
import Button from '../components/common/ui/Button';
import Profile from '../components/main/Profile';

export default function Page() {
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [templateUse, setTemplateUse] = useState(false);

  return (
    <div className="flex min-h-screen flex-col items-center p-5">
      <div className="w-full max-w-md">
        <Profile />
        <Button
          className="mt-5 h-[48px] bg-[#222222] text-sm font-medium text-white"
          onClick={() => router.push('/profile/edit-character')}
        >
          캐릭터 꾸미기
        </Button>

        <div className="mt-11 bg-white">
          <SettingsItem
            label="비밀번호 변경"
            type="link"
            onClick={() => router.push('/profile/change-password')}
          />
          <SettingsItem
            label="주소 변경"
            type="link"
            onClick={() => router.push('/profile/change-address')}
          />
          <SettingsItem
            label="알림 설정"
            type="link"
            onClick={() => router.push('/profile/notification')}
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
            onClick={() => router.push('/profile/delete-account')}
          />
        </div>
      </div>

      {showLogoutModal && (
        <LogoutModal
          onClose={() => setShowLogoutModal(false)}
          onConfirm={() => {
            console.log('로그아웃');
            setShowLogoutModal(false);
          }}
        />
      )}
    </div>
  );
}
