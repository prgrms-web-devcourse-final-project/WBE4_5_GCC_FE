type Noti = {
  title: string;
  date: string;
  new: boolean;
};

export default function NotiContent({ noti }: { noti: Noti[] }) {
  return (
    <>
      {noti.map((item, idx) => (
        <div
          key={idx}
          className="relative cursor-pointer border-b border-dotted border-[#a47148] pt-[14px] pb-[14px]"
          onClick={() => {
            // 클릭 시 처리 로직
          }}
        >
          <div className="flex items-start gap-[10px]">
            <div
              className={`mt-1.5 h-[8px] w-[8px] rounded-full bg-[#d32f2f] ${item.new ? 'visible' : 'invisible'
                }`}
            />
            <div className="flex-1">
              <h1 className="text-[14px] font-medium text-[#3a2d18] mb-[2px]">
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
