'use client';

import { useState } from 'react';
import SettingsItem from '@/app/components/mypage/SettingsItem';
import BackHeader from '@/app/components/common/ui/BackHeader';

export default function Page() {
  const [routineNotification, setRoutineNotification] = useState(false);
  const [challenge, setChallenge] = useState(false);
  const [sendEmail, setSendEmail] = useState(false);

  return (
    <div className="flex min-h-screen flex-col gap-7">
      <BackHeader title="알림설정" />
      <div className="flex flex-col px-5">
        <SettingsItem
          label="루틴 리마인드 알림"
          type="toggle"
          checked={routineNotification}
          onToggle={setRoutineNotification}
        />

        <SettingsItem
          label="퀘스트 보상 알림"
          type="toggle"
          checked={challenge}
          onToggle={setChallenge}
        />

        <SettingsItem
          label="업적 보상 알림"
          type="toggle"
          checked={sendEmail}
          onToggle={setSendEmail}
        />
      </div>
    </div>
  );
}
