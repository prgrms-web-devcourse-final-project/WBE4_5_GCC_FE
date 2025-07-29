'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const today = new Date();
const day = today.getDay();
const mondayOffset = day === 0 ? -6 : 1 - day; // 월요일 기준 offset
const monday = new Date(today);
monday.setDate(today.getDate() + mondayOffset);

const recent7DaysData = Array.from({ length: 7 }, (_, i) => {
  const date = new Date(monday);
  date.setDate(monday.getDate() + i);
  const label = `${date.getMonth() + 1}/${date.getDate()}`;
  return {
    date: label,
    percent: Math.floor(Math.random() * 100),
  };
});

export default function CompletionRateChart() {
  return (
    <div className="bg-white px-5 py-7 mb-3">
      <h3 className="mb-4 text-lg font-semibold text-[#222222]">
        주간 루틴 완료율
      </h3>
      <ResponsiveContainer width="100%" height={230}>
        <BarChart
          data={recent7DaysData}
          margin={{ top: 10, right: 0, left: -33, bottom: 0 }}
        >
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
          />
          <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
          <Tooltip />
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