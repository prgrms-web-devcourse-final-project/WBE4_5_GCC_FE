'use client';

import { useEffect, useState } from 'react';
import Button from '@/app/components/common/ui/Button';
import ListSelector from '@/app/components/routine/ListSelector';
import ToggleSwitch from '@/app/components/common/ui/ToggleSwitch';

import InputRoutineName from '@/app/components/routine/InputRoutineName';
import CategoryBottomSheetContainer from '@/app/components/routine/category/CategoryBottomSheetContainer';
import RecommendedRoutine from '@/app/components/routine/RecommendedRoutine';

import RepeatSelector from '@/app/components/routine/RepeatSelector';
import WhenSelector from '@/app/components/routine/WhenSelector';
import { CategoryItem } from '../../../../../types/general';
import { useAddRoutine } from '@/api/routine/handleRoutine';
import LoadingSpinner from '@/app/components/common/ui/LoadingSpinner';
import CategorySelector from '@/app/components/routine/category/CategorySelector';
import { useRoutinePreset } from '@/api/routine/getRoutinePreset';
import { useRouter } from 'next/navigation';
// import { format, startOfWeek } from 'date-fns';

export default function Page() {
  const router = useRouter();
  const [routineName, setRoutineName] = useState('');
  const [initDate, setInitDate] = useState('');
  const [cycle, setCycle] = useState<{
    daily?: string;
    days?: string;
    week?: string;
    month?: string;
  } | null>(null);
  const [doWhen, setDoWhen] = useState('');
  // const [notification, setNotification] = useState(false);
  const [importance, setImportance] = useState(false);
  const [showCatModal, setShowCatModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(
    null,
  );
  const [isCycleOpen, setIsCycleOpen] = useState(false);
  const [isWhenDoOpen, setIsWhenDoOpen] = useState(false);
  const [cycleText, setCycleText] = useState('');
  const [repeatType, setRepeatType] = useState('');
  const [repeatValue, setRepeatValue] = useState('');
  const [repeatTerm, setRepeatTerm] = useState('');

  // const monday = startOfWeek(initDate, { weekStartsOn: 1 });
  // const mondayStr = format(monday, 'yyyy-MM-dd');

  const isSubmitEnabled =
    selectedCategory !== null &&
    routineName !== '' &&
    initDate !== '' &&
    cycle !== null &&
    doWhen !== '';

  useEffect(() => {
    console.log('폼 상태 변경됨:', {
      selectedCategory,
      routineName,
      initDate,
      cycle,
      doWhen,
      importance,
      repeatType,
      repeatValue,
      repeatTerm,
    });
  }, [
    selectedCategory,
    routineName,
    initDate,
    cycle,
    doWhen,
    importance,
    repeatType,
    repeatValue,
    repeatTerm,
  ]);

  const { mutate, isPending, isSuccess } = useAddRoutine();

  useEffect(() => {
    if (isSuccess) {
      router.push('/routine');
    }
  }, [isSuccess, router]);

  useEffect(() => {
    if (!cycle) {
      setCycleText('');
      return;
    }
    const convertNumbersToDays = (numbers: string) => {
      const numMap: Record<string, string> = {
        '1': '월',
        '2': '화',
        '3': '수',
        '4': '목',
        '5': '금',
        '6': '토',
        '7': '일',
      };
      return numbers
        .split(',')
        .map((num) => numMap[num.trim()])
        .filter(Boolean)
        .join(' ');
    };

    switch (true) {
      case !!cycle.daily:
        setCycleText(`매 ${cycle.daily}일 마다`);
        setRepeatType('DAILY');
        setRepeatTerm(cycle.daily!);
        break;
      case !!cycle.week:
        const dayText = convertNumbersToDays(cycle.days!);
        setCycleText(
          `${dayText} / ${cycle.week === '1' ? '매주' : `${cycle.week}주마다`}`,
        );
        setRepeatType('WEEKLY');
        setRepeatValue(cycle.days!);
        setRepeatTerm(cycle.week);
        break;
      case !!cycle.month:
        setCycleText(`매월 ${cycle.month}일 마다`);
        setRepeatType('MONTHLY');
        setRepeatTerm('1');
        setRepeatValue(cycle.month!);
        break;
      default:
        setCycleText('');
    }
  }, [cycle]);

  const categoryId = Number(selectedCategory?.categoryId);
  const { data: presetData, isLoading } = useRoutinePreset(categoryId);

  return (
    <>
      <div className="flex flex-col px-5 py-10 dark:bg-[var(--dark-bg-primary)]">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col">
            <CategorySelector
              icon="🏷️"
              label="카테고리"
              value={selectedCategory}
              placeholder="카테고리를 선택하세요"
              onClick={() => setShowCatModal(true)}
            />
            <InputRoutineName
              icon="🌱"
              label="루틴 이름"
              placeholder="ex) 변기 청소하기"
              value={routineName}
              onChange={(e) => setRoutineName(e.target.value)}
            />
          </div>
          <RecommendedRoutine
            routines={presetData}
            onNameSelect={setRoutineName}
            onTriggerTimeSelect={setDoWhen}
            onCycleSelect={setCycle}
            // onRepeatTypeSelect={setRepeatType}
            // onRepeatValueSelect={setRepeatValue}
            isLoading={isLoading}
          />
          <div>
            <ListSelector
              icon="🗓️"
              label="시작일"
              value={initDate}
              className="rounded-t-lg"
              setSelectedDate={setInitDate}
            />
            <ListSelector
              icon="♾️"
              label="반복주기"
              value={cycleText}
              placeholder="매일 / 매주"
              onClick={() => setIsCycleOpen(true)}
            />
            <ListSelector
              icon="✅"
              label="언제 할래요?"
              value={doWhen}
              placeholder="ex) 8:00/출근길"
              onClick={() => setIsWhenDoOpen(true)}
              className="rounded-b-lg"
            />
          </div>
          <div>
            <ToggleSwitch
              icon="⭐"
              label="중요도"
              checked={importance}
              onToggle={setImportance}
              className="rounded-lg"
            />
          </div>
        </div>

        <div className="fixed bottom-[70px] left-1/2 -translate-x-1/2 w-full max-w-[614px] px-5">
          <Button
            type="submit"
            disabled={!isSubmitEnabled}
            onClick={() => {
              mutate({
                AddData: {
                  name: routineName,
                  categoryId: selectedCategory!.categoryId,
                  initDate: initDate,
                  triggerTime: doWhen,
                  isImportant: importance,
                  repeatType: repeatType,
                  repeatValue: repeatValue,
                  repeatTerm: Number(repeatTerm),
                },
              });
            }}
            className="w-full py-8 text-xl font-semibold rounded-lg"
          >
            확인
          </Button>
        </div>


        {showCatModal && (
          <CategoryBottomSheetContainer
            onClose={() => setShowCatModal(false)}
            onSelectCategory={(value) => {
              setSelectedCategory(value);
              setShowCatModal(false);
            }}
          />
        )}
      </div>

      {isCycleOpen && (
        <RepeatSelector
          isOpen={isCycleOpen}
          onClose={() => setIsCycleOpen(false)}
          onSubmit={(cycleData) => {
            setCycle(cycleData);
          }}
        />
      )}
      {isWhenDoOpen && (
        <WhenSelector
          isOpen={isWhenDoOpen}
          onClose={() => setIsWhenDoOpen(false)}
          onSubmit={(value) => {
            setDoWhen(value);
          }}
        />
      )}
      {isPending && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#222222] dark:bg-[var(--dark-gray-200)]/50">
          <div className="flex h-[200px] w-[335px] flex-col items-center justify-center rounded-[20px] bg-white dark:bg-[var(--dark-bg-primary)]">
            <LoadingSpinner />
            <p className="mt-4 text-[15px] text-black">루틴 추가 중...</p>
          </div>
        </div>
      )}
    </>
  );
}
