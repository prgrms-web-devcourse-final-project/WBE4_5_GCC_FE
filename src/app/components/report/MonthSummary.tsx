export default function MonthSummary() {
  const summaryData = [
    { label: '루틴 완료율', value: '84%', color: '#FFB84C' },
    { label: '총 루틴 수', value: '50개', color: '#222222' },
    { label: '가장 많이 수행', value: '건강 🏃🏻', color: '#222222' },
    { label: '누적 포인트', value: '2,150P', color: '#FFB84C' },
  ];

  return (
    <div className="bg-white px-5 py-7 mb-3">
      <h3 className="mb-4 text-lg font-semibold text-[#222222]">
        이번 주 나의 루틴 결과는?
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {summaryData.map((item, idx) => (
          <div
            key={idx}
            className="relative bg-[#FFF4D1] rounded-lg shadow-[0_1px_2px_rgba(0,0,0,0.05)] w-full min-h-[80px] px-4 py-3 flex justify-between items-start"
          >
            <p className="text-sm text-[#616161]">{item.label}</p>
            <p
              className="text-[20px] font-semibold self-end"
              style={{ color: item.color }}
            >
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}