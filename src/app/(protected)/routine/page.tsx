'use client';

import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import CalendarBar from '@/app/components/routine/CalendarBar';
import ProgressBar from '@/app/components/common/PrgressBar';
import Routine from '@/app/components/routine/Routine';
import CalendarBottomSheet from '@/app/components/routine/CalendarBottomSheet';
import { routineHandler, UserRoutine } from '@/api/routine/routine';
import type { RoutineItem } from '../../../../types/routine';
import { useRoutineStore } from '@/store/RoutineStore';

export default function Page() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [routineData, setRoutineData] = useState<RoutineItem[] | null>(null);

  const setRoutines = useRoutineStore((state) => state.setRoutines);
  // const routines = useRoutineStore((state) => state.routineDateSet);

  useEffect(() => {
    const fetchRoutine = async () => {
      if (!(selectedDate instanceof Date)) return;

      const dateStr = `${selectedDate.getFullYear()}-${(
        selectedDate.getMonth() + 1
      )
        .toString()
        .padStart(
          2,
          '0',
        )}-${selectedDate.getDate().toString().padStart(2, '0')}`;
      try {
        const result = await UserRoutine(dateStr);
        console.log(dateStr);
        setRoutineData(result.routines);
        // setRoutines(result.date, result.routines);
      } catch (error) {
        console.error('루틴 불러오기 실패', error);
      }
    };

    fetchRoutine();
  }, [selectedDate, setRoutines]);

  // 루틴 추가로 이동
  const handleAdd = () => {
    router.push('/routine/add-routine');
  };

  return (
    <>
      <div className="flex min-h-screen flex-col items-center bg-white px-5">
        <CalendarBar
          setIsOpen={setIsOpen}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <div className="flex w-full max-w-md flex-col items-center justify-center border-t-10 border-t-[#FBFBFB] px-5 pb-11">
          {/* 날짜, 진행률 바 */}
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
              // per={`${currentStep} / ${totalSteps}`}
              wrapperClassName="h-6 bg-[#FFB84C]/25 mb-0"
              barClassName="h-6 bg-[#FFB84C] rounded-full text-white text-xs flex items-center justify-center"
            />
          </div>

          {/* 루틴 카드 목록 */}
          {routineData && (
            <div className="flex w-full flex-col space-y-3">
              {routineData.map((routine: RoutineItem) => (
                <Routine
                  key={`${routine.routineId}-${routine.scheduleId}`}
                  title={routine.name}
                  category={routine.majorCategory}
                  time={routine.triggerTime}
                  isImportant={routine.isImportant}
                  isCompleted={routine.isDone}
                  onClick={() =>
                    routineHandler(routine.scheduleId, !routine.isDone)
                  }
                />
              ))}
            </div>
          )}

          <button
            className="fixed right-0 bottom-25 mr-5 flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-full bg-[#222222] shadow-lg transition-colors duration-300 hover:bg-[#333333]"
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
