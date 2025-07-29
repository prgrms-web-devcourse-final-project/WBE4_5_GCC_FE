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
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 px-4"
      onClick={() => setOpenNoti(false)}
    >
      <div className="w-full max-w-[360px]" onClick={(e) => e.stopPropagation()}>
        <div
          className={`flex flex-col max-h-[50vh] rounded-[8px] border-[3px] border-[#A47148] bg-white shadow-xl ${className}`}
        >
          <div className="flex items-center justify-between border-b-2 border-[#d3bba7] px-5 pt-5 pb-4 text-[15px] font-bold text-[#222]">
            <span>
              <span className="mr-1">🔔</span> 알림
            </span>
            <button className="mr-2 text-[12px] font-medium text-[#616161] cursor-pointer">
              모두 읽기
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-5 py-3 mb-5 space-y-2">
            <NotiContent noti={noti} />
          </div>
        </div>
      </div>
    </div>
  );
}
