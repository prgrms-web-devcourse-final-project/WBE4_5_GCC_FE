'use client';

import { TopRoutine } from '../../../../types/report';

type Props = {
  top5: TopRoutine[];
};

const rankInfo = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣'];

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
              <span className="inline-flex h-[24px] min-w-[60px] items-center justify-center rounded border border-[#ffb84c] px-3 py-0.5 text-xs font-bold">
                {rankInfo[i]} {item.rank}
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
