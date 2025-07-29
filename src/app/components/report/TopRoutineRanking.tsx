const topRoutines = [
  { name: '건강 🏃🏻', count: 24 },
  { name: '청소/정리 🧹', count: 20 },
  { name: '세탁/의류 🧺', count: 18 },
  { name: '쓰레기/환경 ♻️', count: 14 },
  { name: '자기개발 💡', count: 12 },
];

export default function TopRoutineRanking() {
  return (
    <div className="bg-white px-5 py-7 mb-3">
      <h3 className="text-lg font-semibold text-[#222222] mb-4">
        루틴 클리어 랭킹 Top 5
      </h3>
      <ul className="space-y-2">
        {topRoutines.map((routine, i) => (
          <li
            key={routine.name}
            className="flex justify-between text-[14px] text-[#616161]"
          >
            <span>
              {i + 1}. {routine.name}
            </span>
            <span>{routine.count}회</span>
          </li>
        ))}
      </ul>
    </div>
  );
}