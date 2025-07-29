import { axiosInstance } from './axiosInstance';

export interface NotificationSettings {
  isQuest: boolean;
  isRoutine: boolean;
  isBadge: boolean;
}

// GET settings/notifications - 알림 설정 조회
export const getNotificationSettings =
  async (): Promise<NotificationSettings> => {
    const { data } = await axiosInstance.get('/api/v1/settings/notifications');
    return data.data.notification;
  };

// PUT settings/notifications - 알림 설정 변경
export const updateNotificationSettings = async (
  settings: NotificationSettings,
): Promise<void> => {
  await axiosInstance.put('/api/v1/settings/notifications', settings);
};
