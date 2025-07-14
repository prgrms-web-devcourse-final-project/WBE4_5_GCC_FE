'use client';

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';

const data = [
  { name: '청소/정리', value: 10 },
  { name: '세탁/의류', value: 5 },
  { name: '요리', value: 8 },
  { name: '쓰레기/환경', value: 3 },
  { name: '건강', value: 4 },
  { name: '자기개발', value: 5 },
  { name: '소비', value: 8 },
  { name: '외출', value: 3 },
  { name: '행정', value: 1 },
];

const COLORS = [
  '#51B8B2',
  '#FFA552',
  '#FF7043',
  '#9E9E9E',
  '#AED581',
  '#64B5F6',
  '#BA68C8',
  '#FFD54F',
  '#4DD0E1',
];

export default function CategoryDistributionChart() {
  return (
    <div className="bg-[#fbfbfb] p-4 rounded-xl mb-8">
      <h3 className="text-lg font-semibold text-[#222222] mb-4">
        📊 카테고리 점유율
      </h3>
      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}