const topRoutines = [
  { name: '건강', count: 24 },
  { name: '청소/정리', count: 20 },
  { name: '세탁/의류', count: 18 },
  { name: '쓰레기/환경', count: 14 },
  { name: '자기개발', count: 12 },
];

const rankInfo = [
  {
    label: 'Top1',
    bgColor: '#FFF7E6',
    borderColor: '#FFB84C',
    textColor: '#222',
    emoji: '🥇',
  },
  {
    label: 'Top2',
    bgColor: '#F3F4F6',
    borderColor: '#C0C0C0',
    textColor: '#222',
    emoji: '🥈',
  },
  {
    label: 'Top3',
    bgColor: '#FAF5E4',
    borderColor: '#CD7F32',
    textColor: '#222',
    emoji: '🥉',
  },
  {
    label: 'Top4',
    bgColor: '#F9FAFB',
    borderColor: '#E0E0E0',
    textColor: '#222',
    emoji: '',
  },
  {
    label: 'Top5',
    bgColor: '#F9FAFB',
    borderColor: '#E0E0E0',
    textColor: '#222',
    emoji: '',
  },
];

export default function TopRoutineRanking() {
  return (
    <div className="bg-white px-5 py-7 mb-3">
      <h3 className="text-lg font-semibold text-[#222222] mb-4">
        루틴 클리어 랭킹 Top 5
      </h3>
      <ul className="space-y-3">
        {topRoutines.map((routine, i) => (
          <li
            key={routine.name}
            className="flex items-center justify-between text-[14px] font-medium text-[#222222]"
          >
            <span className="flex items-center gap-3">
              <span
                className="inline-flex items-center rounded px-3 py-0.5 text-[12px] font-bold border"
                style={{
                  backgroundColor: rankInfo[i].bgColor,
                  color: rankInfo[i].textColor,
                  borderColor: rankInfo[i].borderColor,
                  borderWidth: '1.5px',
                  minWidth: 60,
                  height: 24,
                  justifyContent: 'center',
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {rankInfo[i].emoji && (
                  <span className="mr-1">{rankInfo[i].emoji}</span>
                )}
                {rankInfo[i].label}
              </span>
              {routine.name}
            </span>
            <span className="font-medium">{routine.count}회</span>
          </li>
        ))}
      </ul>
    </div>
  );
}