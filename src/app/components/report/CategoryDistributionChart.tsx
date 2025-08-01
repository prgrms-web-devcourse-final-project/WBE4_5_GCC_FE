'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { CategoryCount } from '../../../../types/report';

type Props = {
  categoryCount: CategoryCount[];
};

const COLORS = ['#51B8B2', '#FFA552', '#FF7043', '#9E9E9E', '#AED581'];

export default function CategoryDistributionChart({ categoryCount }: Props) {
  const data = categoryCount.map(c => ({
    name: c.categoryName,
    value: c.totalCount,
  }));

  return (
    <div className="bg-white px-5 pt-7 mb-5">
      <h3 className="text-lg font-semibold text-[#222222] mb-4">카테고리 점유율</h3>
      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}