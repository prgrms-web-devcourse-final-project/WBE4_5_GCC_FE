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
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 px-4"
      onClick={() => {
        setOpenNoti(false);
        enableScroll();
      }}
    >
      <div
        className="w-full max-w-[360px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`flex flex-col h-[50vh] rounded-[8px] border-[3px] border-[#A47148] bg-white shadow-xl ${className}`}
        >
          <div className="flex items-center justify-between border-b-2 border-[#d3bba7] px-5 pt-5 pb-4 text-[15px] font-bold text-[#222]">
            <span>
              <span className="mr-1">🔔</span> 알림
            </span>
            <button
              className="mr-2 text-[12px] font-medium text-[#616161] cursor-pointer"
              onClick={handleAllReadClick}
              aria-label="모든 알림 읽음 처리"
            >
              모두 읽기
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-5 py-3 space-y-2">
            <NotiContent noti={noti} onClickNotification={onClickNotification} />
          </div>
        </div>
      </div>
    </div>
  );
}
