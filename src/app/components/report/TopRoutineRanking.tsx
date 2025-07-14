const topRoutines = [
  { name: '건강 🏃🏻', count: 24 },
  { name: '청소/정리 🧹', count: 20 },
  { name: '세탁/의류 🧺', count: 18 },
  { name: '쓰레기/환경 ♻️', count: 14 },
  { name: '자기개발 💡', count: 12 },
];

export default function TopRoutineRanking() {
  return (
    <div className="bg-[#fbfbfb] p-4 rounded-xl mb-8">
      <h3 className="text-lg font-semibold text-[#222222] mb-4">
        🏅 TOP 5 루틴 랭킹
      </h3>
      <ul className="space-y-2">
        {topRoutines.map((routine, i) => (
          <li
            key={routine.name}
            className="flex justify-between text-sm text-[#616161]"
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