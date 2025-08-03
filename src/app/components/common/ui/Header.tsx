'use client';

import Image from 'next/image';
import { Bell } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

import logo from '/public/logo.png';
import coin from '/public/coin.svg';

import Notification from '../Notification';
import QuestPage from '../../main/Quest';
import { useUserStore } from '@/store/UserStore';
import {
  getNotificationList,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from '@/api/notifications';
import useNotificationWebSocket from '@/hooks/useNotifications';

import type { Noti } from '../../../../../types/notifications';

const formatTimeAgo = (date: string) => {
  const notificationDate = new Date(date);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - notificationDate.getTime()) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInSeconds / 3600);

  if (diffInMinutes < 60) return `${diffInMinutes}분 전`;
  if (diffInHours < 24) return `${diffInHours}시간 전`;

  return notificationDate.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const [openNoti, setOpenNoti] = useState(false);
  const [openQuest, setOpenQuest] = useState(false);
  const [notiList, setNotiList] = useState<Noti[]>([]);

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
    } catch (err) {
      console.error('알림 목록 조회 실패', err);
    }
  };

  const handleNotificationClick = async (noti: Noti) => {
    try {
      await markNotificationAsRead(noti.id);
      setNotiList((prev) =>
        prev.map((item) => (item.id === noti.id ? { ...item, new: false } : item)),
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

  const title = isRoutine
    ? '루틴'
    : isReport
      ? '리포트'
      : isShop
        ? '상점'
        : isMypage
          ? '마이페이지'
          : '';

  const showHeader = isHome || isAdmin || title;

  if (!showHeader) return null;

  return (
    <>
      <header className="fixed top-0 left-1/2 z-50 w-full max-w-[614px] -translate-x-1/2 bg-white/95 backdrop-blur-md px-5 border-b border-gray-200">
        <div className="flex h-[64px] items-center justify-between">
          {/* 로고 */}
          <Image
            src={logo}
            alt="logo"
            width={180}
            height={100}
            onClick={() => router.push('/')}
            className="h-auto cursor-pointer"
          />

          {/* 오른쪽 영역 */}
          {isShop ? (
            <div className="flex items-center gap-2 rounded-lg border border-[#c4c4c4] px-2 py-1">
              <Image src={coin} alt="coin" width={20} height={20} />
              <span className="text-base font-semibold text-[#FFB84C]">
                {currentPoint}
              </span>
            </div>
          ) : (
            <div className="relative">
              <Bell
                className="cursor-pointer text-[#222222] fill-black"
                size={26}
                onClick={handleOpenNoti}
              />
              {notiList.some((n) => n.new) && (
                <span className="absolute top-[-2px] right-[-2px] h-2 w-2 rounded-full bg-[#D32F2F]" />
              )}
            </div>
          )}
        </div>
      </header>

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

      {/* 헤더 공간 확보용 */}
      <div className="mb-[96px]" style={{ marginTop: 'env(safe-area-inset-top)' }} />
    </>
  );
}
