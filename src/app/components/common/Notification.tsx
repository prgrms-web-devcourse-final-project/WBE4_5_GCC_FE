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
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60"
      onClick={() => setOpenNoti(false)}
    >
      <div
        className="absolute z-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`flex h-[384px] w-[350px] px-5 flex-col rounded-[8px] border-[3px] border-[#A47148] bg-white ${className}`}
        >
          <div className="flex items-center justify-between border-b border-[#A47148] py-[14px] text-[15px] font-bold text-[#222]">
            <span>
              <span className="mr-1">🔔</span> 알림
            </span>
            <button className="text-[12px] font-medium text-[#9e9e9e] cursor-pointer">
              모두 읽기
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <NotiContent noti={noti} />
          </div>
        </div>
      </div>
    </div>
  );
}
