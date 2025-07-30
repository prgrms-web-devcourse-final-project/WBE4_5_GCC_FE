import { axiosInstance } from './axiosInstance';
import {
  NotificationSettings,
  NotificationListItem,
} from '../../types/notifications';

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

// GET notify - 알림 목록 조회
export const getNotificationList = async (): Promise<
  NotificationListItem[]
> => {
  const res = await axiosInstance.get<{ data: NotificationListItem[] }>(
    '/api/v1/notify',
  );
  return res.data.data;
};

// PATCH notify/{id} - 단일 알림 읽음 처리
export const markNotificationAsRead = async (id: number): Promise<void> => {
  await axiosInstance.patch(`/api/v1/notify/${id}`);
};

// PATCH notify/all - 모든 알림 읽음 처리
export const markAllNotificationsAsRead = async (): Promise<void> => {
  await axiosInstance.patch('/api/v1/notify/all');
};
