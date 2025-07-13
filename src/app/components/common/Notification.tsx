import NotiContent from './Noti';

type Noti = {
  title: string;
  date: string;
  new: boolean;
};

export default function Notification({
  setOpenNoti,
  className,
  noti,
}: {
  setOpenNoti: (value: boolean) => void;
  className?: string;
  noti: Noti[];
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={() => setOpenNoti(false)}
    >
      <div
        className="absolute z-100 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`mx-auto flex h-[569px] w-full min-w-[350px] flex-col gap-4 overflow-scroll rounded-[8px] border-3 border-[#A47148] bg-white px-4 py-[18px] ${className}`}
        >
          <div className="mb-[14px] border-b border-[#a47148] pb-[14px]">
            🔔 알림
          </div>
          <div className="flex flex-col gap-[18px] pr-[18px] pl-[27px]">
            <NotiContent noti={noti} />
          </div>
        </div>
      </div>
    </div>
  );
}
