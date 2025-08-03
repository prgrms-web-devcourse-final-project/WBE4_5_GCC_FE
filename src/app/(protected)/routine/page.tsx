'use client';
export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { format, startOfWeek } from 'date-fns';

import CalendarBar from '@/app/components/routine/CalendarBar';
import ProgressBar from '@/app/components/common/ProgressBar';
import Routine from '@/app/components/routine/Routine';
import CalendarBottomSheet from '@/app/components/routine/CalendarBottomSheet';
import AlertModal from '@/app/components/common/alert/AlertModal';

import { DayRoutine } from '../../../../types/routine';
import { useWeekRoutine } from '@/api/routine/getWeekRoutine';
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

  const dateStr = format(selectedDate, 'yyyy-MM-dd');
  const date = new Date(dateStr);
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

  return (
    <>
      <div className="mt-7 flex min-h-screen w-full flex-col items-center bg-white">
        <CalendarBar
          setIsOpen={setIsOpen}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />

        <div className="w-full max-w-[614px] flex-1 px-6 pb-[120px]">
          {isPending ? (
            <div className="mt-8 flex animate-pulse flex-col gap-5">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div
                  key={idx}
                  className="h-[96px] w-full rounded-[12px] bg-gray-200"
                />
              ))}
            </div>
          ) : (
            <>
              <div className="mt-3 mb-6 flex items-center justify-between">
                <span className="text-2xl font-medium dark:text-[var(--dark-gray-700)]">
                  {format(selectedDate, 'yyyy년 M월 d일')}
                </span>
                {/* {!isToday && (
                  <button
                    onClick={goToToday}
                    className="rounded-md border border-[#FFB84C] bg-[#FFB84C] px-3 py-1.5 text-base text-white"
                  >
                    Today
                  </button>
                )} */}
              </div>

              <ProgressBar
                currentStep={done}
                totalSteps={total}
                per={`${percent}%`}
                wrapperClassName="h-10 bg-[#FFB84C]/20 mb-8"
                barClassName="h-10 bg-[#FFB84C] rounded-full text-white text-xl font-bold flex items-center justify-center text-center leading-[2.75rem]"
              />

              {filteredRoutines.length > 0 ? (
                <div className="flex flex-col space-y-5">
                  {filteredRoutines.map((routine) => (
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
                        useRoutineStore.getState().setRoutine({ ...routine });
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
                <div className="mt-32 flex flex-col items-center justify-center text-center text-gray-400 select-none">
                  <span className="text-xl font-medium">
                    루틴이 없습니다 😢
                  </span>
                  <span className="mt-2 text-base">
                    오른쪽 아래 버튼으로 루틴을 추가해보세요!
                  </span>
                </div>
              )}
            </>
          )}
        </div>

        {!isPending && (
          <button
            onClick={handleAddRoutine}
            className="fixed right-6 bottom-24 z-50 flex h-[64px] w-[64px] cursor-pointer items-center justify-center rounded-full bg-[#222222] shadow-lg transition-colors duration-300 hover:bg-[#333333] dark:bg-[var(--dark-gray-200)] hover:dark:bg-[var(--dark-bg-tertiary)]"
          >
            <Plus className="h-7 w-7 text-white dark:text-[var(--dark-bg-primary)]" />
          </button>
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
