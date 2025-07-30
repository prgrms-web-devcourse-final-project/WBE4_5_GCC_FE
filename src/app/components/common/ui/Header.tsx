import Image from 'next/image';
import { Bell } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import logo from '/public/Logo.svg';
import coin from '/public/coin.svg';
import { useUserStore } from '@/store/UserStore';
import Notification from '../Notification';
import QuestPage from '../../main/Quest';
import {
  getNotificationList,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from '@/api/notifications';
import type { Noti } from '../../../../../types/notifications';
import useNotificationWebSocket from '@/hooks/useNotifications';

const formatTimeAgo = (date: string) => {
  const notificationDate = new Date(date);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - notificationDate.getTime()) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInSeconds / 3600);

  if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  } else if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  } else {
    return notificationDate.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });
  }
};

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [openNoti, setOpenNoti] = useState(false);
  const [notiList, setNotiList] = useState<Noti[]>([]);
  const [openQuest, setOpenQuest] = useState(false);
  const currentPoint = useUserStore((state) => state.points);

  const handleNewNotification = () => {
    const newNoti: Noti = {
      id: Date.now(),
      title: '새로운 알림이 도착했습니다.',
      date: new Date().toISOString(),
      new: true,
      type: 'ROUTINE',
    };

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

      setNotiList((prev) => [...newNotis, ...prev]);
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
        router.push('/');
    }
  };

  const handleAllRead = async () => {
    try {
      await markAllNotificationsAsRead();
      setNotiList((prev) => prev.map((item) => ({ ...item, new: false })));
    } catch (err) {
      console.error('모두 읽음 처리 실패', err);
    }
  };

  const isHome = pathname === '/';
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
      <div className="fixed top-0 z-50 flex h-[56px] w-full items-center justify-between bg-white px-5 py-[18px] shadow-sm select-none">
        {isHome || isAdmin ? (
          <Image
            src={logo}
            alt="logo"
            width={116}
            onClick={() => router.push('/')}
            className="h-auto cursor-pointer"
          />
        ) : (
          <div className="text-xl font-semibold">{title}</div>
        )}
        {isShop ? (
          <div className="flex items-center space-x-1">
            <Image src={coin} alt="coin" width={14} height={14} />
            <span className="text-[12px] font-semibold text-[#FFB84C]">
              {currentPoint}
            </span>
          </div>
        ) : (
          <div className="relative">
            <Bell
              className="cursor-pointer text-[#222222]"
              size={20}
              onClick={handleOpenNoti}
            />
            {notiList.some((n) => n.new) && (
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

      <div className="mb-[96px]" style={{ marginTop: 'env(safe-area-inset-top)' }} />
    </>
  );
}
