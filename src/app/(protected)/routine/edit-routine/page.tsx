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
  const [repeatTerm, setRepeatTerm] = useState('');

  useEffect(() => {
    if (repeatType === 'DAILY') {
      setCycle({ daily: repeatValue });
    } else if (repeatType === 'WEEKLY') {
      setCycle({ days: repeatValue, week: '1' });
    } else if (repeatType === 'MONTHLY') {
      setCycle({ month: repeatValue });
    }
  }, [repeatType, repeatValue]);

  // ✅ 카테고리 초기값 세팅
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem>({
    categoryName: majorCategory,
    subCategoryName: subCategory ?? undefined,
    categoryId: 0,
    categoryType: 'MAJOR',
  });

  // ✅ cycle 초기값 세팅
  const [cycle, setCycle] = useState<{
    daily?: string;
    days?: string;
    week?: string;
    month?: string;
  } | null>(null);

  const isSubmitEnabled =
    selectedCategory !== null &&
    routineName !== '' &&
    startDate !== '' &&
    cycle !== null &&
    doWhen !== '';

  // 수정 처리
  const { mutate, isSuccess } = useEditRoutine();

  useEffect(() => {
    if (isSuccess) {
      router.push('/routine');
    }
  }, [isSuccess, router]);

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

    switch (true) {
      case !!cycle.daily:
        setCycleText(`매 ${cycle.daily}일 마다`);
        setNewRepeatType('DAILY');
        setRepeatTerm(cycle.daily!);
        break;
      case !!cycle.week:
        const dayText = convertNumbersToDays(cycle.days!);
        setCycleText(
          `${dayText} / ${cycle.week === '1' ? '매주' : `${cycle.week}주마다`}`,
        );
        setNewRepeatType('WEEKLY');
        setNewRepeatValue(cycle.days!);
        setRepeatTerm(cycle.week);
        break;
      case !!cycle.month:
        setCycleText(`매월 ${cycle.month}일 마다`);
        setNewRepeatType('MONTHLY');
        setRepeatTerm('1');
        setNewRepeatValue(cycle.month!);
        break;
      default:
        setCycleText('');
    }
  }, [cycle]);
  return (
    <>
      <div className="h-1vh flex flex-col px-5 py-7">
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
              className="rounded-b-lg"
            />
          </div>
        </div>

        <div className="fixed right-5 bottom-[120px] left-5">
          <Button
            type="submit"
            className="bg-[#FFB84C]"
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
                  repeatTerm: Number(repeatTerm),
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
