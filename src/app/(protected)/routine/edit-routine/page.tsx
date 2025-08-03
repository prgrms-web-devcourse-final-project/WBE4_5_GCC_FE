'use client';

import { useEffect, useState } from 'react';
import Button from '@/app/components/common/ui/Button';
import ListSelector from '@/app/components/routine/ListSelector';
import ToggleSwitch from '@/app/components/common/ui/ToggleSwitch';

import InputRoutineName from '@/app/components/routine/InputRoutineName';
import CategoryBottomSheetContainer from '@/app/components/routine/category/CategoryBottomSheetContainer';

import RepeatSelector from '@/app/components/routine/RepeatSelector';
import WhenSelector from '@/app/components/routine/WhenSelector';

import { useRouter } from 'next/navigation';
import { useRoutineStore } from '@/store/RoutineStore';
import { useEditRoutine } from '@/api/routine/handleRoutine';
import LoadingModal from '@/app/components/common/alert/LoadingModal';
import { CategoryItem } from '../../../../../types/general';
import CategorySelector from '@/app/components/routine/category/CategorySelector';
import { format, startOfWeek } from 'date-fns';

export default function Page() {
  const {
    routineId,
    name,
    triggerTime,
    categoryId,
    majorCategory,
    subCategory,
    isImportant,
    initDate,
    repeatType,
    repeatValue,
    repeatTerm,
  } = useRoutineStore();
  const router = useRouter();
  const [routineName, setRoutineName] = useState(name);
  const [startDate, setStartDate] = useState(initDate);
  const [doWhen, setDoWhen] = useState(triggerTime);
  const [importance, setImportance] = useState(isImportant);
  const [showCatModal, setShowCatModal] = useState(false);
  const [isCycleOpen, setIsCycleOpen] = useState(false);
  const [isWhenDoOpen, setIsWhenDoOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [cycleText, setCycleText] = useState('');

  const [newRepeatType, setNewRepeatType] = useState(repeatType);
  const [newRepeatValue, setNewRepeatValue] = useState(repeatValue);
  const [newRepeatTerm, setNewRepeatTerm] = useState(repeatTerm);

  const today = format(new Date(), 'yyyy-MM-dd');
  const monday = startOfWeek(today, { weekStartsOn: 1 });
  const mondayStr = format(monday, 'yyyy-MM-dd');
  const [cycle, setCycle] = useState<{
    daily?: string | null;
    days?: string | null;
    week?: string | null;
    month?: string | null;
  } | null>(null);

  // ✅ 카테고리 초기값 세팅
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem>({
    categoryName: majorCategory,
    subCategoryName: subCategory ?? undefined,
    categoryId: categoryId,
    categoryType: 'MAJOR',
  });

  const isSubmitEnabled =
    selectedCategory !== null &&
    routineName !== '' &&
    startDate !== '' &&
    cycle !== null &&
    doWhen !== '';

  // 수정 처리
  const { mutate, isSuccess } = useEditRoutine(mondayStr, today);

  useEffect(() => {
    if (isSuccess) {
      router.push('/routine');
    }
  }, [isSuccess, router]);

  useEffect(() => {
    if (repeatType === 'DAILY') {
      setCycle({
        daily: repeatValue && repeatValue.trim() !== '' ? repeatValue : '1',
      });
    } else if (repeatType === 'WEEKLY') {
      setCycle({
        days: repeatValue && repeatValue.trim() !== '' ? repeatValue : '1',
        week: '1',
      });
    } else if (repeatType === 'MONTHLY') {
      setCycle({
        month: repeatValue && repeatValue.trim() !== '' ? repeatValue : '1',
      });
    }
  }, [repeatType, repeatValue]);

  useEffect(() => {
    setRoutineName(name);
    setDoWhen(triggerTime);
    setImportance(isImportant);
    setStartDate(initDate);
  }, [name, triggerTime, isImportant, initDate]);

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
    if (cycle.daily) {
      const daily = cycle.daily.trim() !== '' ? cycle.daily : '1';
      setCycleText(`매 ${daily}일 마다`);
      setNewRepeatType('DAILY');
      setNewRepeatTerm(Number(daily));
      setNewRepeatValue('');
    } else if (cycle.week) {
      const dayText = convertNumbersToDays(cycle.days!);
      setCycleText(
        `${dayText} / ${cycle.week === '1' ? '매주' : `${cycle.week}주마다`}`,
      );
      setNewRepeatType('WEEKLY');
      setNewRepeatValue(cycle.days || '1');
      setNewRepeatTerm(Number(cycle.week) || 1);
    } else if (cycle.month) {
      setCycleText(`매월 ${cycle.month}일 마다`);
      setNewRepeatType('MONTHLY');
      setNewRepeatTerm(1);
      setNewRepeatValue(cycle.month || '1');
    }
  }, [cycle]);

  useEffect(() => {
    console.log('폼 상태 변경됨:', {
      selectedCategory,
      routineName,
      initDate,
      cycle,
      doWhen,
      importance,
      newRepeatType,
      newRepeatValue,
      repeatTerm,
    });
  }, [
    selectedCategory,
    routineName,
    initDate,
    cycle,
    doWhen,
    importance,
    newRepeatType,
    newRepeatValue,
    repeatTerm,
  ]);
  return (
    <>
      <div className="flex min-h-screen flex-col bg-[#fff] px-5 py-7 pt-4">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col">
            <CategorySelector
              icon="🏷️"
              label="카테고리"
              value={selectedCategory}
              onClick={() => setShowCatModal(true)}
            />
            <InputRoutineName
              icon="🌱"
              label="루틴이름"
              placeholder={name}
              value={routineName}
              onChange={(e) => setRoutineName(e.target.value)}
            />
          </div>
          <div>
            <ListSelector
              icon="🗓️"
              label="시작일"
              value={startDate}
              className="rounded-t-lg"
              setSelectedDate={setStartDate}
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

        <div className="fixed right-5 bottom-[120px] left-5 flex justify-center">
          <Button
            type="submit"
            className="bg-[#ffb84c]"
            disabled={!isSubmitEnabled}
            onClick={() => {
              mutate({
                routineId: routineId,
                editData: {
                  name: routineName,
                  categoryId: categoryId,
                  initDate: startDate,
                  triggerTime: doWhen,
                  isImportant: importance,
                  repeatType: newRepeatType,
                  repeatValue: newRepeatValue,
                  repeatTerm: newRepeatTerm,
                },
              });
              setIsEditing(true);
            }}
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

      {isEditing && <LoadingModal isOpen={isEditing} />}
    </>
  );
}
