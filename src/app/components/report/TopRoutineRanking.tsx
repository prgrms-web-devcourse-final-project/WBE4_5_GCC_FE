'use client';

import { TopRoutine } from "../../../../types/report";

type Props = {
  top5: TopRoutine[];
};

const rankInfo = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣'];

export default function TopRoutineRanking({ top5 }: Props) {
  return (
    <div className="bg-white px-5 py-7 mb-3">
      <h3 className="text-lg font-semibold text-[#222222] mb-4">루틴 클리어 랭킹 Top 5</h3>
      <ul className="space-y-3">
        {top5.map((item, i) => (
          <li key={item.categoryName} className="flex justify-between text-sm font-medium">
            <span className="flex items-center gap-3">
              <span className="inline-flex items-center rounded px-3 py-0.5 border text-xs font-bold border-[#FFB84C] min-w-[60px] h-[24px] justify-center">
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