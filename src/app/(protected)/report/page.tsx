'use client';

import { useEffect, useState } from 'react';
import { getWeeklyReport } from '@/api/report';
import { ReportData } from '../../../../types/report';

import AiAnalysis from '@/app/components/report/AiAnalysis';
import MonthSummary from '@/app/components/report/MonthSummary';
import CompletionRateChart from '@/app/components/report/CompletionRateChart';
import TopRoutineRanking from '@/app/components/report/TopRoutineRanking';
import CategoryDistributionChart from '@/app/components/report/CategoryDistributionChart';
import LoadingSpinner from '@/app/components/common/ui/LoadingSpinner';

export default function Page() {
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const today = new Date();
    const dateString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}T00:00:00`;

    const fetch = async () => {
      try {
        const data = await getWeeklyReport(dateString);
        setReportData(data);
      } catch (e) {
        console.error('❌ 리포트 불러오기 실패:', e);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center" style={{ minHeight: 'calc(100vh - 56px)' }}>
        <LoadingSpinner />
        <p className="mt-6 text-[#616161] text-sm">리포트를 불러오는 중입니다...</p>
      </div>
    );
  }

  if (!reportData) return null;

  return (
    <div className="-mt-10 bg-[#f5f5f5]">
      <AiAnalysis aiComment={reportData.aiComment} />
      <MonthSummary reportData={reportData} />
      <CompletionRateChart dayRoutineCount={reportData.dayRoutineCount} />
      <TopRoutineRanking top5={reportData.top5} />
      <CategoryDistributionChart categoryCount={reportData.categoryCount} />
    </div>
  );
}