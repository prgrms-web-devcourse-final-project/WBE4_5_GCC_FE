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
          className="relative cursor-pointer border-b border-dotted border-[#a47148] pb-[16px]"
          onClick={() => {
            // 클릭 시 처리 로직
          }}
        >
          {item.new && (
            <div className="absolute top-[6px] left-[-10px] h-[6px] w-[6px] rounded-full bg-[#d32f2f]" />
          )}
          <h1 className="text-[12px] font-medium">{item.title}</h1>
          <h2 className="text-[10px] font-medium text-[#9e9e9e]">
            {item.date}
          </h2>
        </div>
      ))}
    </>
  );
}
