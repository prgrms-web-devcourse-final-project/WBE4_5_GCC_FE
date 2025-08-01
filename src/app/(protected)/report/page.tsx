'use client';

import { useEffect, useState, useCallback } from 'react';
import { getWeeklyReport } from '@/api/report';
import { ReportData } from '../../../../types/report';

import AiAnalysis from '@/app/components/report/AiAnalysis';
import MonthSummary from '@/app/components/report/MonthSummary';
import CompletionRateChart from '@/app/components/report/CompletionRateChart';
import TopRoutineRanking from '@/app/components/report/TopRoutineRanking';
import CategoryDistributionChart from '@/app/components/report/CategoryDistributionChart';
import LoadingSpinner from '@/app/components/common/ui/LoadingSpinner';

import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Page() {
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [error, setError] = useState(false);

  const getWeekLabel = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const firstDayOfMonth = new Date(year, month, 1);
    const firstDayWeekday = firstDayOfMonth.getDay();
    const weekNumber = Math.ceil((day + firstDayWeekday) / 7);
    return `${year}년 ${month + 1}월 ${weekNumber}주차`;
  };

  const getWeekNumber = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const firstDayOfMonth = new Date(year, month, 1);
    const firstDayWeekday = firstDayOfMonth.getDay();
    const weekNumber = Math.ceil((day + firstDayWeekday) / 7);
    return { year, month, weekNumber };
  };

  const formattedDate = useCallback((date: Date) => {
    return new Date(Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    )).toISOString();
  }, []);

  const fetchReport = useCallback(async (date: Date) => {
    setLoading(true);
    setError(false);
    try {
      const data = await getWeeklyReport(formattedDate(date));
      setReportData(data);
    } catch (e) {
      console.error('❌ 리포트 불러오기 실패:', e);
      setReportData(null);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [formattedDate]);

  useEffect(() => {
    fetchReport(currentDate);
  }, [currentDate, fetchReport]);

  const moveWeek = (diff: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + diff * 7);
    setCurrentDate(newDate);
  };

  const hasValidData = (data: ReportData | null): data is ReportData => {
    if (!data) return false;

    const {
      aiComment,
      dayRoutineCount,
      top5,
      categoryCount,
      routineCount,
    } = data;

    if (!aiComment || aiComment.trim() === '') return false;
    if (!Array.isArray(dayRoutineCount) || dayRoutineCount.length === 0) return false;
    if (!Array.isArray(top5) || top5.length === 0) return false;
    if (!categoryCount || Object.keys(categoryCount).length === 0) return false;
    if (!routineCount) return false;

    return true;
  };

  const isNextDisabled = (() => {
    const now = new Date();
    const nowWeek = getWeekNumber(now);
    const currentWeek = getWeekNumber(currentDate);
    return (
      currentWeek.year > nowWeek.year ||
      (currentWeek.year === nowWeek.year && currentWeek.month > nowWeek.month) ||
      (currentWeek.year === nowWeek.year && currentWeek.month === nowWeek.month && currentWeek.weekNumber >= nowWeek.weekNumber - 1)
    );
  })();

  return (
    <div className="-mt-10 bg-[#f5f5f5]">
      <div className="flex items-center justify-center gap-4 py-6 bg-[#fff]">
        <button onClick={() => moveWeek(-1)} aria-label="이전 주">
          <ChevronLeft size={24} />
        </button>

        <h2 className="text-lg font-semibold">{getWeekLabel(currentDate)}</h2>

        <button
          onClick={() => moveWeek(1)}
          aria-label="다음 주"
          disabled={isNextDisabled}
          className={isNextDisabled ? 'opacity-30 cursor-not-allowed text-gray-400' : ''}
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center bg-[#fff]" style={{ minHeight: 'calc(100vh - 200px)' }}>
          <LoadingSpinner />
          <p className="mt-6 text-[#616161] text-[16px]">리포트를 불러오는 중입니다...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-12 bg-[#fff] text-[#9E9E9E]" style={{ minHeight: 'calc(100vh - 200px)' }}>
          <p className="text-base font-medium">루틴 데이터가 없어요 😢</p>
          <p className="text-sm mt-1">다른 주차를 선택해보세요.</p>
        </div>
      ) : !hasValidData(reportData) ? (
        <div className="flex flex-col items-center justify-center py-12 bg-[#fff] text-[#9E9E9E]" style={{ minHeight: 'calc(100vh - 200px)' }}>
          <p className="text-base font-medium">표시할 데이터가 없습니다 😢</p>
          <p className="text-sm mt-1">다른 주차를 선택해보세요.</p>
        </div>
      ) : (
        <>
          <AiAnalysis aiComment={reportData.aiComment} />
          <MonthSummary reportData={reportData} />
          <CompletionRateChart dayRoutineCount={reportData.dayRoutineCount} />
          <TopRoutineRanking top5={reportData.top5} />
          <CategoryDistributionChart categoryCount={reportData.categoryCount} />
        </>
      )}
    </div>
  );
}
