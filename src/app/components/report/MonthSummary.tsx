export default function MonthSummary() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-[#fbfbfb] rounded-xl p-4 shadow-sm">
        <p className="text-sm text-[#616161]">루틴 완료율</p>
        <p className="text-xl font-bold text-[#FFB84C]">84%</p>
      </div>
      <div className="bg-[#fbfbfb] rounded-xl p-4 shadow-sm">
        <p className="text-sm text-[#616161]">총 루틴 수</p>
        <p className="text-xl font-bold text-[#444444]">50개</p>
      </div>
      <div className="bg-[#fbfbfb] rounded-xl p-4 shadow-sm">
        <p className="text-sm text-[#616161]">가장 많이 수행</p>
        <p className="text-xl font-bold text-[#444444]">건강 🏃🏻</p>
      </div>
      <div className="bg-[#FAFAFA] rounded-xl p-4 shadow-sm">
        <p className="text-sm text-[#616161]">누적 포인트</p>
        <p className="text-xl font-bold text-[#A47148]">2,150P</p>
      </div>
    </div>
  );
}