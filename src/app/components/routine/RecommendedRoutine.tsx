import '../../styles/recommended-routine.css';

interface Preset {
  categoryId: number;
  emoji: string;
  isImportant: boolean;
  majorCategory: string;
  name: string;
  presetId: number;
  repeatType: string;
  repeatValue: string;
  triggerTime: string;
}

interface RecommendedRoutineProps {
  routines: Preset[];
  onNameSelect: (name: string) => void;
  isLoading: boolean;
  onRepeatTypeSelect: (type: string) => void;
  onRepeatValueSelect: (value: string) => void;
  onTriggerTimeSelect: (triggerTime: string) => void;
}

export default function RecommendedRoutine({
  routines,
  onNameSelect,
  onRepeatTypeSelect,
  onRepeatValueSelect,
  onTriggerTimeSelect,
  isLoading,
}: RecommendedRoutineProps) {
  return (
    <div className="flex w-full flex-col gap-2 rounded-lg border border-[#E0E0E0] bg-white px-4 py-4">
      <div className="flex items-center gap-2 text-xs font-medium text-[#222222]">
        <span>🐣</span>
        <span>입문자를 위한 추천 루틴</span>
      </div>

      {isLoading && (
        <div className="flex items-start px-5 text-left text-xs text-[#9e9e9e]">
          추천 루틴을 불러오는 중입니다
        </div>
      )}
      {routines && !isLoading && (
        <div className="routine-scroll flex gap-2 overflow-x-auto">
          {routines.map((routine, index) => (
            <button
              key={index}
              onClick={() => {
                onNameSelect(routine.name);
                onRepeatTypeSelect(routine.repeatType);
                onRepeatValueSelect(routine.repeatValue);
                onTriggerTimeSelect(routine.triggerTime);
              }}
              className="font-regular shrink-0 rounded-lg border border-[#e0e0e0] px-4 py-2 text-xs whitespace-nowrap text-[#616161]"
            >
              {routine.name}
            </button>
          ))}
        </div>
      )}
      {!routines && !isLoading && (
        <div className="flex flex-col items-start px-5 text-left text-xs">
          <span className="text-[#9E9E9E]">
            카테고리를 선택하면 추천 루틴을 볼 수 있어요!
          </span>
        </div>
      )}
    </div>
  );
}
