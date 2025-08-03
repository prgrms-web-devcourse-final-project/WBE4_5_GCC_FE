'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { DayRoutineCount } from '../../../../types/report';

type Props = {
  dayRoutineCount: DayRoutineCount[];
};

export default function CompletionRateChart({ dayRoutineCount }: Props) {
  const data = dayRoutineCount.map((item) => {
    const date = new Date(item.date);
    return {
      date: `${date.getMonth() + 1}/${date.getDate()}`,
      percent: Math.round(item.completionRate),
    };
  });

  return (
    <div className="mb-3 bg-white px-5 py-7 dark:bg-[var(--dark-bg-primary)]">
      <h3 className="mb-4 text-lg font-semibold text-[#222222] dark:text-[var(--dark-gray-700)]">
        주간 루틴 완료율
      </h3>
      <ResponsiveContainer width="100%" height={230}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 0, left: -33, bottom: 0 }}
        >
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
          <Tooltip formatter={(value) => `${value}%`} />
          <Bar
            dataKey="percent"
            fill="#FFB84C"
            barSize="5%"
            radius={[5, 5, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
