import { useState } from 'react';
import BottomSheet from '../common/ui/BottomSheet';
// import { ChevronDown } from 'lucide-react';
import WeekPicker from './WeekPicker';
import ThreeToggle from './ThreeToggle';

// 날짜 선택 옵션
const options = ['월', '화', '수', '목', '금', '토', '일'];

interface RepeatSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (cycleText: string) => void;
}

export default function RepeatSelector({
  isOpen,
  onClose,
  onSubmit,
}: RepeatSelectorProps) {
  const [selectedIndex, setSelectedIndex] = useState<number[]>([]);
  const [selectedWeek, setSelectedWeek] = useState('1');
  const [selectedIdx, setSelectedIdx] = useState(1);

  const toggleIndex = (idx: number) => {
    setSelectedIndex((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx],
    );
  };

  const handleSubmit = () => {
    const selectedDays =
      selectedIndex.length === options.length
        ? '매일'
        : selectedIndex.length > 0
          ? selectedIndex
              .sort((a, b) => a - b)
              .map((i) => options[i])
              .join(', ')
          : '요일 미선택';

    const cycleText =
      selectedDays +
      ' / ' +
      (selectedWeek === '1' ? '매주' : `${selectedWeek}주마다`);

    onSubmit(cycleText);
    onClose();
  };

  return (
    <>
      <BottomSheet
        setIsOpen={onClose}
        isOpen={isOpen}
        className="max-h-[588px] px-5 py-8"
      >
        <div className="mb-4.5 flex items-center justify-start gap-2">
          <h2 className="text-xl font-semibold">♾️</h2>
          <h2 className="text-base font-semibold text-black">반복주기</h2>
        </div>
        <div className="flex flex-col">
          {/* 월간/주간/일간 선택 */}
          <ThreeToggle
            selectedIdx={selectedIdx}
            setSelectedIdx={setSelectedIdx}
          />
          <div className="mx-[5px] flex flex-col">
            {/* 요일 선택 */}
            <div className="my-[27px] flex flex-col">
              <span className="text-sm font-semibold">요일 선택</span>
              <div className="mt-[18px] mr-2 mb-[22px] ml-[18px] flex justify-between">
                {options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => toggleIndex(idx)}
                    className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-none text-xs transition-colors ${
                      selectedIndex.includes(idx)
                        ? 'bg-[#FFB84C] text-white'
                        : 'bg-[#F5F5F5] text-[#9E9E9E]'
                    } `}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <hr className="text-[#E0E0E0]" />
            </div>
            <div className="flex flex-col">
              <div className="flex w-full">
                <span className="text-sm font-semibold">반복주기</span>
                <div className="ml-auto flex items-center gap-1">
                  <span className="text-xs text-[#616161]">
                    {selectedIndex.length === options.length
                      ? '매일'
                      : selectedIndex.length > 0
                        ? selectedIndex
                            .sort((a, b) => a - b)
                            .map((i) => options[i])
                            .join(', ')
                        : '요일 미선택'}{' '}
                    / {selectedWeek === '1' ? '매주' : `${selectedWeek}주마다`}
                  </span>
                  {/* <ChevronDown className="h-3.5 w-3.5 cursor-pointer text-[#616161]" /> */}
                </div>
              </div>
              {/* 주 반복 설정 */}
              <div className="inline-flex w-fit items-center gap-2 self-center">
                <div className="w-[150px]">
                  <WeekPicker onChange={setSelectedWeek} />
                </div>
                <span className="pointer-events-none absolute bottom-42 left-2/5 translate-x-[60px] -translate-y-1/2 text-sm">
                  주마다
                </span>
              </div>
            </div>
          </div>
          {/* 확인 버튼 */}
          <button
            className="mt-5 rounded bg-[#FFB84C] px-4 py-2 text-white"
            onClick={handleSubmit}
          >
            확인
          </button>
        </div>
      </BottomSheet>
    </>
  );
}
