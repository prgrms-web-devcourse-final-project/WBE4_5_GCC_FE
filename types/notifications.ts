export interface NotificationSettings {
  isQuest: boolean;
  isRoutine: boolean;
  isBadge: boolean;
}

export type NotificationListItem = {
  id: number;
  type: 'ROUTINE' | 'QUEST' | 'BADGE';
  name: string;
  updateAt: string;
  createdAt: string;
};

export type Noti = {
  id: number;
  title: string;
  date: string;
  new: boolean;
  type: 'ROUTINE' | 'QUEST' | 'BADGE';
};
