'use client';

import { useState } from 'react';
import ReportLayout from '@/app/components/report/ReportLayout';
import MonthSummary from '@/app/components/report/MonthSummary';
import CompletionRateChart from '@/app/components/report/CompletionRateChart';
import CategoryDistributionChart from '@/app/components/report/CategoryDistributionChart';
import TopRoutineRanking from '@/app/components/report/TopRoutineRanking';

const months = ['2025-05', '2025-06', '2025-07'];

export default function ReportPage() {
  const [selectedIndex, setSelectedIndex] = useState(months.length - 1);

  const yearMonth = months[selectedIndex];
  const title = `${yearMonth.slice(0, 4)}년 ${yearMonth.slice(5)}월 루틴 리포트`;

  return (
    <ReportLayout
      title={title}
      months={months}
      selectedIndex={selectedIndex}
      onChange={setSelectedIndex}
    >
      <MonthSummary />
      <CompletionRateChart />
      <CategoryDistributionChart />
      <TopRoutineRanking />
    </ReportLayout>
  );
}