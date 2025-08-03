import NotiContent from './Noti';
import { Noti } from '../../../../types/notifications';
import React from 'react';

export default function Notification({
  setOpenNoti,
  className = '',
  noti,
  onClickNotification,
  onClickAllRead,
}: {
  setOpenNoti: (value: boolean) => void;
  className?: string;
  noti: Noti[];
  onClickNotification?: (item: Noti) => void;
  onClickAllRead?: () => void;
}) {
  const handleAllReadClick = () => {
    onClickAllRead?.();
  };

  const disableScroll = () => {
    document.body.style.overflow = 'hidden';
  };

  const enableScroll = () => {
    document.body.style.overflow = 'auto';
  };

  React.useEffect(() => {
    disableScroll();
    return () => enableScroll();
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[999] flex items-center justify-center bg-[#222222]/50 px-4 dark:bg-[var(--dark-gray-200)]/60"
      onClick={() => {
        setOpenNoti(false);
        enableScroll();
      }}
    >
      <div
        className="w-full max-w-[420px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`flex h-[50vh] flex-col rounded-[8px] border-[3px] border-[#A47148] bg-white shadow-xl dark:bg-[var(--dark-bg-primary)] ${className}`}
        >
          <div className="flex items-center justify-between border-b-2 border-[#d3bba7] px-5 pt-5 pb-4 text-xl font-bold text-[#222222] dark:text-[var(--dark-gray-700)]">
            <span>
              <span className="mr-1">🔔</span> 알림
            </span>
            <button
              className="mr-2 cursor-pointer text-base font-medium text-[#616161]"
              onClick={handleAllReadClick}
              aria-label="모든 알림 읽음 처리"
            >
              모두 읽기
            </button>
          </div>
          <div className="flex-1 space-y-2 overflow-y-auto px-5 py-3">
            <NotiContent
              noti={noti}
              onClickNotification={onClickNotification}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
