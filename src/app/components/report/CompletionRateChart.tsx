'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = Array.from({ length: 31 }, (_, i) => ({
  day: `${i + 1}일`,
  percent: Math.floor(Math.random() * 100),
}));

export default function CompletionRateChart() {
  return (
    <div className="mb-8 rounded-xl bg-[#fbfbfb] p-4 overflow-x-auto">
      <h3 className="mb-4 text-lg font-semibold text-[#222222]">
        📈 7월 일별 루틴 완료율
      </h3>
      <ResponsiveContainer width={1000} height={300}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
        >
          <XAxis
            dataKey="day"
            interval={0}
            padding={{ left: 10, right: 10 }}
            tick={{ fontSize: 12 }}
            angle={-30}
            textAnchor="end"
          />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="percent"
            stroke="#A47148"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}