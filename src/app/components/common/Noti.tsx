import { Noti } from '../../../../types/notifications';

export default function NotiContent({
  noti,
  onClickNotification,
}: {
  noti: Noti[];
  onClickNotification?: (item: Noti) => void;
}) {
  return (
    <>
      {noti.map((item) => (
        <div
          key={item.id}
          className="relative cursor-pointer border-b-2 border-dotted border-[#A47148] pt-[8px] pb-[14px]"
          onClick={() => onClickNotification?.(item)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              onClickNotification?.(item);
            }
          }}
          aria-label={`알림: ${item.title}, 날짜: ${item.date}`}
        >
          <div className="flex items-start gap-[10px]">
            <div
              className={`mt-1.5 h-[8px] w-[8px] rounded-full bg-[#d32f2f] ${item.new ? 'visible' : 'invisible'
                }`}
            />
            <div className="flex-1">
              <h1 className="text-[14px] font-medium text-[#222] mb-[2px]">
                {item.title}
              </h1>
              <h2 className="text-[12px] text-[#9e9e9e]">{item.date}</h2>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
