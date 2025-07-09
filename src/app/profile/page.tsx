'use client'

import Button from "../components/common/Button";
import SettingsItem from "../components/common/SettingsItem";
import { useState } from "react";

export default function page () {
  const [darkMode, setDarkMode] = useState(false);
  const [templateUse, setTemplateUse] = useState(false);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-5">
      <div className="w-full max-w-md">
        <Button className="h-[48px] bg-[#222222] text-sm font-medium text-white">
          캐릭터 편집하기
        </Button>

        <div className="bg-white mt-11">
          <SettingsItem 
            label="비밀번호 변경"
            type="link"
            onClick={() => console.log('비밀번호 변경 페이지로 이동')}
          />
          <SettingsItem
            label="주소 변경"
            type="link"
            onClick={() => console.log('주소 변경 페이지로 이동')}
          />
          <SettingsItem
            label="알림 설정"
            type="link"
            onClick={() => console.log('알림 설정 페이지로 이동')}
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
            onClick={() => console.log('탈퇴 페이지로 이동')}
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