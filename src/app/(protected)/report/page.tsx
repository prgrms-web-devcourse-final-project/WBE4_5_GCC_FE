'use client';

import MonthSummary from '@/app/components/report/MonthSummary';
import CompletionRateChart from '@/app/components/report/CompletionRateChart';
import CategoryDistributionChart from '@/app/components/report/CategoryDistributionChart';
import TopRoutineRanking from '@/app/components/report/TopRoutineRanking';
import AiAnalysis from '@/app/components/report/AiAnalysis';

export default function ReportPage() {

  return (
    <div className="-mt-10 bg-[#f5f5f5]">
      <AiAnalysis />
      <MonthSummary />
      <CompletionRateChart />
      <TopRoutineRanking />
      <CategoryDistributionChart />
    </div>
  );
}