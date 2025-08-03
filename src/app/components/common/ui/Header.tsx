import logo from '/public/logo.png';
import Image from 'next/image';
import { Bell } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import coin from '/public/coin.svg';
import { useUserStore } from '@/store/UserStore';
import Notification from '../Notification';
import QuestPage from '../../main/Quest';
import {
  getNotificationList,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  checkHasUnread,
} from '@/api/notifications';
import type { Noti } from '../../../../../types/notifications';
import useNotificationWebSocket from '@/hooks/useNotifications';
import { useNotificationStore } from '@/store/NotificationStore';

const formatTimeAgo = (date: string) => {
  const notificationDate = new Date(date);
  const now = new Date();
  const diffInSeconds = Math.floor(
    (now.getTime() - notificationDate.getTime()) / 1000,
  );
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInSeconds / 3600);

  if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  } else if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  } else {
    return notificationDate.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  }
};

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [openNoti, setOpenNoti] = useState(false);
  const [notiList, setNotiList] = useState<Noti[]>([]);
  const [openQuest, setOpenQuest] = useState(false);
  const currentPoint = useUserStore((state) => state.points);
  const hasUnread = useNotificationStore((state) => state.hasUnread);
  const setHasUnread = useNotificationStore((state) => state.setHasUnread);

  const handleNewNotification = () => {
    const newNoti: Noti = {
      id: Date.now(),
      title: '새로운 알림이 도착했습니다.',
      date: new Date().toISOString(),
      new: true,
      type: 'ROUTINE',
    };
    setHasUnread(true); // 알림 빨간 점만 표시
    setNotiList((prev) => [newNoti, ...prev]);
  };

  useNotificationWebSocket(handleNewNotification);

  const handleOpenNoti = async () => {
    try {
      const list = await getNotificationList();
      const newNotis = list.map((item) => ({
        id: item.id,
        title: item.name,
        date: item.createdAt,
        type: item.type,
        new: true,
      }));

      setNotiList((prev) => {
        const prevIds = new Set(prev.map((p) => p.id));
        const uniqueNewNotis = newNotis.filter((n) => !prevIds.has(n.id));
        return [...uniqueNewNotis, ...prev];
      });
      setOpenNoti(true);
    } catch (error) {
      console.error('알림 목록 조회 실패', error);
    }
  };

  const handleNotificationClick = async (noti: Noti) => {
    try {
      await markNotificationAsRead(noti.id);
      setNotiList((prev) =>
        prev.map((item) =>
          item.id === noti.id ? { ...item, new: false } : item,
        ),
      );
      const unread = await checkHasUnread();
      setHasUnread(!unread);
    } catch (err) {
      console.error(`알림 읽음 처리 실패 (id: ${noti.id})`, err);
    }

    setOpenNoti(false);

    switch (noti.type) {
      case 'ROUTINE':
        router.push('/routine');
        break;
      case 'QUEST':
        setOpenQuest(true);
        break;
      case 'BADGE':
        router.push('/collection');
        break;
      default:
        router.push('/home');
    }
  };

  const handleAllRead = async () => {
    try {
      await markAllNotificationsAsRead();
      setNotiList((prev) => prev.map((item) => ({ ...item, new: false })));
      const unread = await checkHasUnread();
      setHasUnread(!unread);
    } catch (err) {
      console.error('모두 읽음 처리 실패', err);
    }
  };

  const isHome = pathname === '/home';
  const isAdmin = pathname === '/admin';
  const isRoutine = pathname === '/routine';
  const isReport = pathname === '/report';
  const isShop = pathname === '/shop';
  const isMypage = pathname === '/mypage';

  let title = '';
  if (isRoutine) title = '루틴';
  else if (isReport) title = '리포트';
  else if (isShop) title = '상점';
  else if (isMypage) title = '마이페이지';

  const showHeader = isHome || isAdmin || title;

  if (!showHeader) return null;

  return (
    <>
      <div className="fixed top-0 left-1/2 z-50 flex h-[64px] w-full max-w-[614px] -translate-x-1/2 items-center justify-between border-b border-gray-200 bg-white px-6 dark:border-[var(--dark-bg-tertiary)] dark:bg-[var(--dark-bg-primary)]">
        {isHome || isAdmin ? (
          <Image
            src={logo}
            alt="logo"
            width={90}
            height={60}
            onClick={() => router.push('/home')}
            className="h-auto cursor-pointer"
          />
        ) : (
          <div className="text-2xl font-bold dark:text-[var(--dark-gray-700)]">
            {title}
          </div>
        )}
        {isShop ? (
          <div className="mr-2 flex items-center gap-3 rounded-lg border border-[#c4c4c4] px-2 py-1">
            <Image src={coin} alt="coin" width={18} height={18} />
            <span className="text-[16px] font-semibold text-[#FFB84C]">
              {currentPoint}
            </span>
          </div>
        ) : (
          <div className="relative">
            <Bell
              className="cursor-pointer text-[#222222]"
              size={24}
              onClick={handleOpenNoti}
            />
            {/* {notiList.some((n) => n.new) &&  */}
            {hasUnread && (
              <span className="absolute top-[-3px] right-[-3px] h-1.5 w-1.5 rounded-full bg-[#D32F2F]" />
            )}
          </div>
        )}
      </div>

      {openNoti && (
        <Notification
          noti={notiList.map((item) => ({
            ...item,
            date: formatTimeAgo(item.date),
          }))}
          setOpenNoti={setOpenNoti}
          onClickNotification={handleNotificationClick}
          onClickAllRead={handleAllRead}
        />
      )}

      {openQuest && <QuestPage setOpenQuest={setOpenQuest} />}

      <div style={{ marginTop: 'env(safe-area-inset-top)' }} />
    </>
  );
}
