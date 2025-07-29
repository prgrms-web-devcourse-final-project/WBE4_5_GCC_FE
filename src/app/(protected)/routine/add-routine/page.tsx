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
  const [notification, setNotification] = useState(false);
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
      // queryClient.invalidateQueries({
      //   queryKey: ['routine-week'],
      //   exact: false,
      // });
      router.push('/routine');
    }
  }, [isSuccess, router]);

  useEffect(() => {
    if (!cycle) {
      setCycleText('');
      return;
    }

    switch (true) {
      case !!cycle.daily:
        setCycleText(`매 ${cycle.daily}일 마다`);
        setRepeatType('DAILY');
        setRepeatTerm(cycle.daily!);
        break;
      case !!cycle.week:
        setCycleText(
          `${cycle.days} / ${
            cycle.week === '1' ? '매주' : `${cycle.week}주마다`
          }`,
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
  console.log(presetData);

  useEffect(() => {
    console.log('카테고리id 선택됨:', categoryId);
  });

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
            routines={presetData}
            onSelect={setRoutineName}
            onSelectTime={setDoWhen}
            isLoading={isLoading}
          />
          {/* section 2 */}
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
      {isPending && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#222222]/50">
          <div className="flex h-[200px] w-[335px] flex-col items-center justify-center rounded-[20px] bg-white">
            <LoadingSpinner />
            <p className="mt-4 text-[15px] text-black">루틴 추가 중...</p>
          </div>
        </div>
      )}
    </>
  );
}
