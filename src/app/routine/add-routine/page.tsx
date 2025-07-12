'use client';

import { useState } from "react";
import Button from "@/app/components/common/ui/Button";
import ListSelector from "@/app/components/routine/ListSelector";
import ToggleSwitch from "@/app/components/common/ui/ToggleSwitch";
import CategorySelector from "@/app/components/routine/CategorySelector";
import InputRoutineName from "@/app/components/routine/InputRoutineName";

export default function page () {
  const [cycle, setCycle] = useState('');
  const [doWhen, setDoWhen] = useState('');
  const [startDate, setStartDate] = useState('');
  const [routineName, setRoutineName] = useState('');
  const [importance, setImportance] = useState(false);
  const [notification, setNotification] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const isSubmitEnabled = selectedCategory !== '' && routineName !== '' && startDate !== '' && cycle !== '' && doWhen !== '';

  return (
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
            onClick={() => console.log("카테고리 선택 바텀시트 등장")}
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
            placeholder="2025. 7. 11."
            onClick={() => console.log("달력 모달 등장")}
            className="rounded-t-lg"
          />
          <ListSelector
            icon="♾️"
            label="반복주기"
            value={cycle}
            placeholder="매일 / 매주 "
            onClick={() => console.log("반복 주기 바텀시트 등장")}
          />
          <ListSelector
            icon="✅"
            label="언제 할래요?"
            value={doWhen}
            placeholder="ex) 8:00/출근길"
            onClick={() => console.log("언제 할래요? 바텀시트 등장")}
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

      <div className="fixed bottom-[70px] left-5 right-5">
        <Button 
          type='submit' 
          disabled={!isSubmitEnabled}
          onClick={() => console.log('확인')}
        >
          확인
        </Button>
      </div>
    </div>
  );
}