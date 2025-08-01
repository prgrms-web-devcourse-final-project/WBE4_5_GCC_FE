'use client';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import CalendarBar from '@/app/components/routine/CalendarBar';
import ProgressBar from '@/app/components/common/ProgressBar';
import Routine from '@/app/components/routine/Routine';
import CalendarBottomSheet from '@/app/components/routine/CalendarBottomSheet';
import { DayRoutine } from '../../../../types/routine';
import { useWeekRoutine } from '@/api/routine/getWeekRoutine';
import AlertModal from '@/app/components/common/alert/AlertModal';
import { format, startOfWeek } from 'date-fns';
import {
  useDeleteRoutine,
  useHandleRoutine,
} from '@/api/routine/handleRoutine';
import { useRoutineStore } from '@/store/RoutineStore';

export default function Page() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [checkDelete, setCheckDelete] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const dateStr: string = format(selectedDate, 'yyyy-MM-dd');
  const date = dateStr ? new Date(dateStr) : new Date();
  const monday = startOfWeek(date, { weekStartsOn: 1 });
  const mondayStr = format(monday, 'yyyy-MM-dd');
  const { data: weekData, isPending } = useWeekRoutine(dateStr);
  const filteredRoutines: DayRoutine[] = weekData?.routines?.[dateStr] ?? [];
  const total = filteredRoutines.length;
  const done = filteredRoutines.filter((r) => r.isDone).length;
  const percent = total ? Math.round((done / total) * 100) : 0;

  const { mutate } = useHandleRoutine(mondayStr, dateStr);
  const { mutate: handleDelete } = useDeleteRoutine(mondayStr, dateStr);

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
      <div className="flex min-h-screen flex-col items-center bg-[#F8F5F1] px-5 pt-4">
        <CalendarBar
          setIsOpen={setIsOpen}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        {isPending && (
          <div className="flex w-full max-w-md flex-col gap-4 border-t-10 border-t-[#FBFBFB] px-5 pb-11">
            <div className="h-[27px] w-[146px] animate-pulse rounded-[10px] bg-gray-200"></div>
            <div className="h-[24px] w-full animate-pulse rounded-[10px] bg-gray-200"></div>
            <div className="h-[86px] w-full animate-pulse rounded-[10px] bg-gray-200"></div>
            <div className="h-[86px] w-full animate-pulse rounded-[10px] bg-gray-200"></div>
            <div className="h-[86px] w-full animate-pulse rounded-[10px] bg-gray-200"></div>
            <div className="h-[86px] w-full animate-pulse rounded-[10px] bg-gray-200"></div>
            <div className="h-[86px] w-full animate-pulse rounded-[10px] bg-gray-200"></div>
          </div>
        )}
        {!isPending && (
          <div className="flex min-h-screen w-full max-w-md flex-col items-center rounded-[10px] bg-white p-4">
            <div className="mb-6 flex w-full flex-col justify-start space-y-4.5 select-none">
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
                wrapperClassName="h-6 bg-[#FFB84C]/25 mb-0 text-white"
                barClassName="h-6 bg-[#FFB84C] rounded-full text-white text-xs flex items-center justify-center"
              />
            </div>

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
                    onEditClick={() => {
                      useRoutineStore.getState().setRoutine({
                        routineId: routine.routineId,
                        scheduleId: routine.scheduleId,
                        categoryId: routine.categoryId,
                        majorCategory: routine.majorCategory,
                        subCategory: routine.subCategory,
                        name: routine.name,
                        triggerTime: routine.triggerTime,
                        isDone: routine.isDone,
                        isImportant: routine.isImportant,
                        date: routine.date,
                        initDate: routine.initDate,
                        repeatType: routine.repeatType,
                        repeatValue: routine.repeatValue,
                      });
                    }}
                    onDeleteClick={() => {
                      setCheckDelete(true);
                      setDeleteTargetId(routine.routineId);
                    }}
                    scheduleId={routine.scheduleId}
                  />
                ))}
              </div>
            ) : (
              <div className="mt-10 text-center text-gray-400 select-none">
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
      {checkDelete && (
        <AlertModal
          type="delete"
          title="루틴을 삭제하시겠어요?"
          onConfirm={() => {
            if (deleteTargetId) {
              handleDelete({ routineId: deleteTargetId });
              setDeleteTargetId(null);
              setCheckDelete(false);
            }
          }}
          cancelText="취소"
          onCancel={() => setCheckDelete(false)}
          isOpen={checkDelete}
        />
      )}
    </>
  );
}
