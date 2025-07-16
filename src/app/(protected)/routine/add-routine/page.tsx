'use client';

import { useState } from 'react';

import Button from '@/app/components/common/ui/Button';
import ListSelector from '@/app/components/routine/ListSelector';
import ToggleSwitch from '@/app/components/common/ui/ToggleSwitch';
import CategorySelector from '@/app/components/routine/CategorySelector';
import InputRoutineName from '@/app/components/routine/InputRoutineName';
import CategoryBottomSheetContainer from '@/app/components/common/CategoryBottomSheetContainer';

import RepeatSelector from '@/app/components/routine/RepeatSelector';
import WhenSelector from '@/app/components/routine/WhenSelector';
import { CategoryItem } from '../../../../../types/types';

export default function page() {
  const [cycle, setCycle] = useState('');
  const [doWhen, setDoWhen] = useState('');
  const [startDate, setStartDate] = useState('');

  const [routineName, setRoutineName] = useState('');
  const [importance, setImportance] = useState(false);
  const [showCatModal, setShowCatModal] = useState(false);
  const [notification, setNotification] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(
    null,
  );

  const [isCycleOpen, setIsCycleOpen] = useState(false);
  const [isWhenDoOpen, setIsWhenDoOpen] = useState(false);

  const isSubmitEnabled =
    selectedCategory !== null &&
    routineName !== '' &&
    startDate !== '' &&
    cycle !== '' &&
    doWhen !== '';

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
          {/* section 2 */}
          <div>
            <ListSelector
              icon="🗓️"
              label="시작일"
              value={startDate}
              className="rounded-t-lg"
              onClick={() => console.log('시작일')}
            />
            <ListSelector
              icon="♾️"
              label="반복주기"
              value={cycle}
              placeholder="매일 / 매주 "
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

        <div className="fixed right-5 bottom-[70px] left-5">
          <Button
            type="submit"
            disabled={!isSubmitEnabled}
            onClick={() => console.log('확인')}
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

      {isCycleOpen && <RepeatSelector />}
      {isWhenDoOpen && <WhenSelector />}
    </>
  );
}
