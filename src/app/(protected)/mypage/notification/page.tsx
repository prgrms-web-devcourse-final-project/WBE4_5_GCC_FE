'use client';

import { useEffect, useState } from 'react';
import SettingsItem from '@/app/components/mypage/SettingsItem';
import BackHeader from '@/app/components/common/ui/BackHeader';
import { getNotificationSettings, updateNotificationSettings } from '@/api/notifications';
import { NotificationSettings } from '../../../../../types/notifications';

export default function Page() {
  const [settings, setSettings] = useState<NotificationSettings>({
    isQuest: false,
    isRoutine: false,
    isBadge: false,
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await getNotificationSettings();
        setSettings(res);
      } catch (error) {
        console.error('❌ 알림 설정 조회를 실패: ', error);
      }
    };

    fetchSettings();
  }, []);

  const onToggle = async (key: keyof NotificationSettings, value: boolean) => {
    const prevSettings = settings;
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);

    try {
      await updateNotificationSettings(newSettings);
    } catch (error) {
      console.error(`❌ '${key}' 알림 설정 변경 실패:`, error);
      setSettings(prevSettings);
    }
  };

  return (
    <div className="flex min-h-screen flex-col gap-7">
      <BackHeader title="알림설정" />
      <div className="flex flex-col px-5">
        <SettingsItem
          label="루틴 리마인드 알림"
          type="toggle"
          checked={settings.isRoutine}
          onToggle={(checked) => onToggle('isRoutine', checked)}
        />

        <SettingsItem
          label="퀘스트 보상 알림"
          type="toggle"
          checked={settings.isQuest}
          onToggle={(checked) => onToggle('isQuest', checked)}
        />

        <SettingsItem
          label="업적 보상 알림"
          type="toggle"
          checked={settings.isBadge}
          onToggle={(checked) => onToggle('isBadge', checked)}
        />
      </div>
    </div>
  );
}
