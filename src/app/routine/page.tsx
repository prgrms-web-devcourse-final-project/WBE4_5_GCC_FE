'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Routine from '../components/routine/Routine';
import ProgressBar from '../components/common/PrgressBar';
import CalendarBar from '../components/routine/CalendarBar';
import CalendarBottomSheet from '../components/routine/CalendarBottomSheet';

type DatePiece = Date | null;
type SelectedDate = DatePiece | [DatePiece, DatePiece];

export default function Page() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<SelectedDate>(new Date());

  const handleAdd = () => {
    router.push("/routine/add-routine");
  }

  return (
    <>
      <div className="flex min-h-screen flex-col items-center bg-white py-4">
        <CalendarBar setIsOpen={setIsOpen} />
        <div className="flex w-full max-w-md flex-col items-center justify-center border-t-10 border-b-1 border-t-[#FBFBFB] border-b-[#CCCCCC] px-5 py-11">
          <div className="mb-6 flex w-full flex-col justify-start space-y-4.5">
            <span className="text-xl font-semibold">
              {selectedDate instanceof Date
                ? `${selectedDate.getFullYear()}년 ${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일`
                : ''}
            </span>
            <ProgressBar
              currentStep={1}
              totalSteps={5}
              per="20%"
              wrapperClassName="h-6 bg-[#FFB84C]/25 mb-0"
              barClassName="h-6 bg-[#FFB84C] rounded-full text-white text-xs flex items-center justify-center"
            />
          </div>
          <div className="flex w-full flex-col space-y-3">
            <Routine
              title="미지근한 물 한 잔 마시기"
              Icon="🏃🏻"
              category="건강"
              time="13:00"
              isImportant
              isCompleted
            />
            <Routine
              title="빨래 돌리기"
              Icon="🧺"
              category="세탁 / 의류"
              subCategory="잠옷"
              time="13:00"
            />
            <Routine
              title="도시락 싸기"
              Icon="🍳"
              category="요리"
              subCategory="회사 점심"
              time="13:00"
              isImportant
            />
            <Routine
              title="쓰레기 분리수거"
              Icon="♻️"
              category="쓰레기 / 환경"
              time="13:00"
            />
            <Routine
              title="저녁 조깅"
              Icon="🏃🏻"
              category="건강"
              subCategory=" 유산소 운동"
              time="13:00"
            />
          </div>
          <button 
            className="fixed right-0 bottom-15 mr-5 flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-full bg-[#222222] shadow-lg transition-colors duration-300 hover:bg-[#333333]"
            onClick={handleAdd}
          >
            <Plus className="h-[30px] w-[30px] text-white" />
          </button>
        </div>
      </div>

      {isOpen && (
        <CalendarBottomSheet
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      )}
    </>
  );
}
