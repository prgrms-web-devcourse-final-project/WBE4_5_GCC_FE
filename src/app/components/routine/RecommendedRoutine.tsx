'use client';

import '../../styles/recommended-routine.css';

interface RecommendedRoutineProps {
    icon: React.ReactNode;
    label: string;
    routines: string[];
    onSelect: (routine: string) => void;
}

export default function RecommendedRoutine({
    icon,
    label,
    routines,
    onSelect,
}: RecommendedRoutineProps) {
    const hasRoutines = routines.length > 0;

    return (
        <div className="w-full border border-[#E0E0E0] rounded-lg px-4 py-4 bg-white flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs font-medium text-[#222222]">
                <span>{icon}</span>
                <span>{label}</span>
            </div>

            {hasRoutines ? (
                <div className="routine-scroll flex gap-2 overflow-x-auto">
                    {routines.map((routine, index) => (
                        <button
                            key={index}
                            onClick={() => onSelect(routine)}
                            className="px-4 py-2 border border-[#e0e0e0] text-xs font-regular text-[#616161] rounded-lg whitespace-nowrap shrink-0"
                        >
                            {routine}
                        </button>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col px-5 items-start text-left text-xs">
                    <span className="text-[#9E9E9E]">카테고리를 선택하면 추천 루틴을 볼 수 있어요!</span>
                </div>
            )}
        </div>
    );
}
