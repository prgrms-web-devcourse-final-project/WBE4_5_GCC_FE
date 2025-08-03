'use client';

import { TopRoutine } from '../../../../types/report';

type Props = {
  top5: TopRoutine[];
};

const rankInfo = ['🥇', '🥈', '🥉', '', ''];
const rankColors = ['#FFD700', '#C0C0C0', '#CD7F32']; // 금, 은, 동

export default function TopRoutineRanking({ top5 }: Props) {
  return (
    <div className="mb-3 bg-white px-5 py-7 dark:bg-[var(--dark-bg-primary)]">
      <h3 className="mb-4 text-lg font-semibold text-[#222222] dark:text-[var(--dark-gray-700)]">
        루틴 클리어 랭킹 Top 5
      </h3>
      <ul className="space-y-3">
        {top5.map((item, i) => (
          <li
            key={item.categoryName}
            className="flex justify-between text-sm font-medium"
          >
            <span className="flex items-center gap-3">
              <span
                className="inline-flex h-[24px] min-w-[60px] items-center justify-center rounded border px-3 py-0.5 text-xs font-bold"
                style={{
                  borderColor: i < 3 ? rankColors[i] : '#9e9e9e',
                  color: i < 3 ? rankColors[i] : '#616161',
                }}
              >
                {rankInfo[i]} Top {item.rank}
              </span>
              {item.categoryName}
            </span>
            <span>{item.completedCount}회</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
