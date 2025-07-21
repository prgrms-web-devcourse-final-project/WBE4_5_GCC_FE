'use client';

import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import CalendarBar from '@/app/components/routine/CalendarBar';
import ProgressBar from '@/app/components/common/PrgressBar';
import Routine from '@/app/components/routine/Routine';
import CalendarBottomSheet from '@/app/components/routine/CalendarBottomSheet';
import { routineHandler } from '@/api/routine/routine';
import { DayRoutine } from '../../../../types/routine';
import { useWeekRoutine } from '@/api/routine/getWeekRoutine';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import LoadingSpinner from '@/app/components/common/ui/LoadingSpinner';

export default function Page() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const queryClient = useQueryClient();

  const dateStr: string = selectedDate.toISOString().split('T')[0];

  const { data: weekData, isPending } = useWeekRoutine(dateStr);
  useEffect(() => {
    console.log('weekData:', weekData);
  }, [weekData]);

  const filteredRoutines: DayRoutine[] = weekData?.routines?.[dateStr] ?? [];

  const total = filteredRoutines.length;
  const done = filteredRoutines.filter((r) => r.isDone).length;
  const percent = total ? Math.round((done / total) * 100) : 0;

  const { mutate } = useMutation({
    mutationFn: ({
      scheduleId,
      isDone,
    }: {
      scheduleId: number;
      isDone: boolean;
    }) => routineHandler(scheduleId, isDone),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['week-routine'] });
    },
  });

  // 루틴 추가로 이동
  const handleAddRoutine = () => {
    router.push('/routine/add-routine');
  };

  const goToToday = () => {
    const today = new Date();
    setSelectedDate(today);
  };

  const isToday = selectedDate.toDateString() === new Date().toDateString();

  return (
    <>
      <div className="flex min-h-screen flex-col items-center bg-white px-5">
        <CalendarBar
          setIsOpen={setIsOpen}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        {isPending && (
          <div className="mt-[50px] flex flex-col items-center justify-center gap-6">
            <LoadingSpinner />
            <p className="text-[20px] font-semibold">
              루틴을 불러오는 중입니다.
            </p>
          </div>
        )}
        {!isPending && (
          <div className="flex w-full max-w-md flex-col items-center justify-center border-t-10 border-t-[#FBFBFB] px-5 pb-11">
            {/* 날짜, 진행률 바 */}
            <div className="mb-6 flex w-full flex-col justify-start space-y-4.5">
              <div className="flex items-center justify-between">
                <span className="text-xl font-semibold">
                  {selectedDate instanceof Date
                    ? `${selectedDate.getFullYear()}년 ${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일`
                    : ''}
                </span>
                {!isToday && (
                  <button
                    className="cursor-pointer rounded-[5px] border border-[#FFB84C] bg-[#FFB84C] px-2 py-1 text-[12px] text-white"
                    onClick={goToToday}
                  >
                    Today
                  </button>
                )}
              </div>
              <ProgressBar
                currentStep={done}
                totalSteps={total}
                per={`${percent}%`}
                wrapperClassName="h-6 bg-[#FFB84C]/25 mb-0"
                barClassName="h-6 bg-[#FFB84C] rounded-full text-white text-xs flex items-center justify-center"
              />
            </div>

            {/* 루틴 카드 목록 */}
            {filteredRoutines && filteredRoutines.length > 0 ? (
              <div className="flex w-full flex-col space-y-3">
                {filteredRoutines.map((routine: DayRoutine) => (
                  <Routine
                    key={`${routine.routineId}-${routine.scheduleId}`}
                    title={routine.name}
                    category={routine.majorCategory}
                    time={routine.triggerTime}
                    isImportant={routine.isImportant}
                    isCompleted={routine.isDone}
                    onClick={() =>
                      mutate({
                        scheduleId: routine.scheduleId,
                        isDone: !routine.isDone,
                      })
                    }
                  />
                ))}
              </div>
            ) : (
              <div className="mt-10 text-center text-gray-400">
                해당 날짜에 루틴이 없습니다.
              </div>
            )}

            <button
              className="fixed right-0 bottom-25 mr-5 flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-full bg-[#222222] shadow-lg transition-colors duration-300 hover:bg-[#333333]"
              onClick={handleAddRoutine}
            >
              <Plus className="h-[30px] w-[30px] text-white" />
            </button>
          </div>
        )}
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
