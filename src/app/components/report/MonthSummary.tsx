'use client';

import { ReportData } from "../../../../types/report";

type Props = {
  reportData: ReportData;
};

export default function MonthSummary({ reportData }: Props) {
  const { completedCount, totalCount } = reportData.routineCount;
  const summaryData = [
    {
      label: '루틴 완료율',
      value: `${Math.round((completedCount / (totalCount || 1)) * 100)}%`,
      color: '#FFB84C',
    },
    {
      label: '총 루틴 수',
      value: `${totalCount}개`,
      color: '#222222',
    },
    {
      label: '가장 많이 수행',
      value: reportData.top5?.[0]?.categoryName ?? '--',
      color: '#222222',
    },
    {
      label: '누적 포인트',
      value: `${reportData.totalPoint ?? 0}P`,
      color: '#FFB84C',
    },
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
            <p className="text-[20px] font-semibold self-end" style={{ color: item.color }}>
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}