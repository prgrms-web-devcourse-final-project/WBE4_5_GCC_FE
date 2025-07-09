'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../components/common/Button";
import SettingsItem from "../components/common/SettingsItem";

export default function page () {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [templateUse, setTemplateUse] = useState(false);

  return (
    <div className="flex min-h-screen flex-col items-center p-5">
      <div className="w-full max-w-md">
        <Button
          className="h-[48px] bg-[#222222] text-sm font-medium text-white"
          onClick={() => router.push('/profile/edit-character')}
        >
          캐릭터 편집하기
        </Button>

        <div className="bg-white mt-11">
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
            label="탈퇴하기"
            type="link"
            onClick={() => router.push('/profile/delete-account')}
          />
          <SettingsItem
            label="로그아웃"
            type="action"
            onClick={() => console.log('로그아웃')}
          />
        </div>
      </div>
    </div>
  );
}