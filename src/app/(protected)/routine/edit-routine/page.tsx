'use client';

import { useEffect, useState } from 'react';
import Button from '@/app/components/common/ui/Button';
import ListSelector from '@/app/components/routine/ListSelector';
import ToggleSwitch from '@/app/components/common/ui/ToggleSwitch';
import CategorySelector from '@/app/components/routine/CategorySelector';
import InputRoutineName from '@/app/components/routine/InputRoutineName';
import CategoryBottomSheetContainer from '@/app/components/common/CategoryBottomSheetContainer';

import RepeatSelector from '@/app/components/routine/RepeatSelector';
import WhenSelector from '@/app/components/routine/WhenSelector';
import { CategoryItem } from '../../../../../types/types';
import { useRouter } from 'next/navigation';
import { useRoutineStore } from '@/store/RoutineStore';
import { useEditRoutine } from '@/api/routine/handleRoutine';
import LoadingModal from '@/app/components/common/alert/LoadingModal';

export default function Page() {
  const {
    routineId,
    majorCategory,
    subCategory,
    name,
    triggerTime,
    isImportant,
    startRoutineDate,
  } = useRoutineStore();

  const router = useRouter();
  const [routineName, setRoutineName] = useState(name);
  const [startDate, setStartDate] = useState(startRoutineDate);
  const [cycle, setCycle] = useState<{ days: string; week: string } | null>(
    null,
  );
  const [doWhen, setDoWhen] = useState(triggerTime);
  const [notification, setNotification] = useState(false);
  const [importance, setImportance] = useState(isImportant);

  const [showCatModal, setShowCatModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(
    null,
  );

  const [isCycleOpen, setIsCycleOpen] = useState(false);
  const [isWhenDoOpen, setIsWhenDoOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const isSubmitEnabled =
    selectedCategory !== null &&
    routineName !== '' &&
    startDate !== '' &&
    cycle !== null &&
    doWhen !== '';

  const convertDaysToNumbers = (days: string) => {
    const dayMap: Record<string, string> = {
      월: '1',
      화: '2',
      수: '3',
      목: '4',
      금: '5',
      토: '6',
      일: '7',
    };

    return days
      .split(', ')
      .map((day) => dayMap[day])
      .filter(Boolean) // 혹시 모를 undefined 제거
      .join(',');
  };
  const getRepeatType = (days: string): 'DAILY' | 'WEEKLY' => {
    return days.split(', ').length === 7 ? 'DAILY' : 'WEEKLY';
  };

  const getRepeatValue = (days: string): string | undefined => {
    return days.split(', ').length === 7
      ? undefined
      : convertDaysToNumbers(days);
  };

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
      startDate,
      cycle,
      doWhen,
      importance,
    });
  }, [selectedCategory, routineName, startDate, cycle, doWhen, importance]);

  useEffect(() => {
    setRoutineName(name);
    setDoWhen(triggerTime);
    setImportance(isImportant);
    setStartDate(startRoutineDate);
  }, [name, triggerTime, isImportant, startRoutineDate]);

  return (
    <>
      <div className="h-1vh flex flex-col px-5 py-7">
        {/* 버튼 제외 콘텐츠 */}
        <div className="flex flex-col gap-6">
          {/* section 1 */}
          <div className="flex flex-col">
            <CategorySelector
              icon="🏷️"
              label="카테고리"
              value={selectedCategory}
              onClick={() => setShowCatModal(true)}
              storedMajorCategory={majorCategory}
              storedSubCategory={subCategory}
            />
            <InputRoutineName
              icon="🌱"
              label="루틴이름"
              placeholder={name}
              value={routineName}
              onChange={(e) => setRoutineName(e.target.value)}
            />
          </div>
          {/* section 2 */}
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
              value={
                cycle
                  ? `${cycle.days} / ${cycle.week === '1' ? '매주' : `${cycle.week}주마다`}`
                  : ''
              }
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
          {/* section 3 */}
          <div>
            <ToggleSwitch
              icon="🔔"
              label="알림"
              checked={notification}
              onToggle={setNotification}
              className="rounded-t-lg"
            />
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
                  majorCategory: selectedCategory!.categoryName,
                  subCategory: selectedCategory!.subCategoryName,
                  startRoutineDate: startDate,
                  triggerTime: doWhen,
                  isImportant: importance,
                  repeatType: getRepeatType(cycle!.days),
                  repeatValue: getRepeatValue(cycle!.days),
                  repeatInterval: parseInt(cycle!.week, 10), // string → number 변환
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
              console.log('선택된 카테고리:', value);
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
