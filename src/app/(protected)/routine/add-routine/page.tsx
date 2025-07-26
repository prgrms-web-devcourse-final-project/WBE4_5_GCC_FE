'use client';

import { useEffect, useState } from 'react';
import Button from '@/app/components/common/ui/Button';
import ListSelector from '@/app/components/routine/ListSelector';
import ToggleSwitch from '@/app/components/common/ui/ToggleSwitch';
import CategorySelector from '@/app/components/routine/CategorySelector';
import InputRoutineName from '@/app/components/routine/InputRoutineName';
import CategoryBottomSheetContainer from '@/app/components/common/CategoryBottomSheetContainer';
import RecommendedRoutine from '@/app/components/routine/RecommendedRoutine';

import RepeatSelector from '@/app/components/routine/RepeatSelector';
import WhenSelector from '@/app/components/routine/WhenSelector';
import { CategoryItem } from '../../../../../types/general';
import { addRoutine } from '@/api/routine/routine';
import { AddRoutine } from '../../../../../types/routine';
import { useRouter } from 'next/navigation';
import { useAddRoutine } from '@/api/routine/handleRoutine';



export default function Page() {
  const router = useRouter();
  const [routineName, setRoutineName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [cycle, setCycle] = useState<{ days: string; week: string } | null>(
    null,
  );
  const [doWhen, setDoWhen] = useState('');
  const [notification, setNotification] = useState(false);
  const [importance, setImportance] = useState(false);

  const [showCatModal, setShowCatModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(
    null,
  );

  const [isCycleOpen, setIsCycleOpen] = useState(false);
  const [isWhenDoOpen, setIsWhenDoOpen] = useState(false);

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

  const { mutate, isPending, isSuccess } = useAddRoutine();

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
              placeholder="카테고리를 선택하세요"
              onClick={() => setShowCatModal(true)}
            />
            <InputRoutineName
              icon="🌱"
              label="루틴이름"
              placeholder="ex) 변기 청소하기"
              value={routineName}
              onChange={(e) => setRoutineName(e.target.value)}
            />
          </div>
          <RecommendedRoutine
            icon="🐣"
            label="입문자를 위한 추천 루틴"
            routines={["이불 세탁하기", "신발 관리하기", "셔츠 다림질하기", "계절 옷 정리하기"]}
            onSelect={setRoutineName}
          />
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
            disabled={!isSubmitEnabled}
            onClick={() =>
              mutate({
                AddData: {
                  name: routineName,
                  majorCategory: selectedCategory!.categoryName,
                  subCategory: selectedCategory?.subCategoryName,
                  startRoutineDate: startDate,
                  triggerTime: doWhen,
                  isImportant: importance,
                  // 아래 3개는 루틴 추가 주간 월간 일간 다 작업하고 추가하기
                  repeatType: 'DAILY',
                  repeatValue: '1',
                  repeatInterval: 1,
                },
              })
            }
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
    </>
  );
}
