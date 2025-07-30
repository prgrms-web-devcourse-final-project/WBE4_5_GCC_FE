'use client';
import Profile from './components/main/Profile';
import Routine from './components/routine/Routine';
import { useState } from 'react';

import quest from '/public/quest.svg';
import acheivement from '/public/acheivement.svg';
import FloatingButton from './components/common/FloatingButton';
import Donut from './components/common/ui/Donut';
import { useRouter } from 'next/navigation';
import Quest from './components/main/Quest';
import { DayRoutine } from '../../types/routine';
import AlertModal from './components/common/alert/AlertModal';
import { useWeekRoutine } from '@/api/routine/getWeekRoutine';
import { format, startOfWeek } from 'date-fns';
import { useRoutineStore } from '@/store/RoutineStore';
import {
  useDeleteRoutine,
  useHandleRoutine,
} from '@/api/routine/handleRoutine';

export default function Main() {
  const [openQuest, setOpenQuest] = useState(false);
  const [checkDelete, setCheckDelete] = useState(false);
  const router = useRouter();
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const { data: weekData, isPending: weekLoading } = useWeekRoutine();
  const today = format(new Date(), 'yyyy-MM-dd');
  const filteredRoutines: DayRoutine[] = weekData?.routines?.[today] ?? [];
  const total = filteredRoutines.length;
  const done = filteredRoutines.filter((r) => r.isDone).length;
  const successRate = total ? Math.round((done / total) * 100) : 0;
  const now = new Date();
  const todayStr = `${now.getFullYear()}년 ${now.getMonth() + 1}월 ${now.getDate()}일`;
  const monday = startOfWeek(today, { weekStartsOn: 1 });
  const mondayStr = format(monday, 'yyyy-MM-dd');

  const { mutate } = useHandleRoutine(mondayStr, today);
  const { mutate: handleDelete } = useDeleteRoutine(mondayStr, today);

  const goToCollection = () => {
    router.push('/collection');
  };

  return (
    <>
      <div className="relative mx-auto mt-25 flex min-h-screen max-w-5xl flex-col items-center bg-white select-none">
        <div className="absolute top-[-20px] right-10 z-30 my-8">
          <FloatingButton
            src={quest}
            alt="quest"
            text="퀘스트"
            textSize="12px"
            className="mb-3"
            onClick={() => setOpenQuest(true)}
          />
          <FloatingButton
            src={acheivement}
            alt="acheivement"
            text="도감"
            textSize="12px"
            onClick={goToCollection}
          />
        </div>

        {openQuest && <Quest className="" setOpenQuest={setOpenQuest} />}

        <div className="flex w-full px-5">
          <Profile />
        </div>
        {weekLoading && (
          <div className="flex w-full flex-col gap-3 border-t-10 border-t-[#FBFBFB] px-5 py-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-3">
                <div className="h-[27px] w-[100px] animate-pulse rounded-[10px] bg-gray-200"></div>
                <div className="h-[27px] w-[146px] animate-pulse rounded-[10px] bg-gray-200"></div>
              </div>
              <div className="h-[54px] w-[54px] animate-pulse rounded-full bg-gray-200"></div>
            </div>
            <div className="h-[86px] w-full animate-pulse rounded-[10px] bg-gray-200"></div>
            <div className="h-[86px] w-full animate-pulse rounded-[10px] bg-gray-200"></div>
            <div className="h-[86px] w-full animate-pulse rounded-[10px] bg-gray-200"></div>
          </div>
        )}
        {!weekLoading && (
          <div className="flex w-full flex-col items-center justify-center border-t-10 border-t-[#FBFBFB] px-5 py-4">
            <div className="mb-6 flex w-full flex-col justify-start">
              <span className="text-xs font-semibold">{todayStr}</span>
              <div className="flex items-center gap-1 text-[22px] font-bold">
                <div>
                  <span>
                    오늘의 루틴{' '}
                    <span className="text-[#FFB84C]">
                      {filteredRoutines.length}
                    </span>
                  </span>
                </div>
                <Donut
                  width={46}
                  height={46}
                  percent={Number(successRate.toFixed())}
                  className="ml-auto flex"
                />
              </div>
            </div>

            <div className="flex w-full flex-col space-y-3">
              {filteredRoutines.map((routine: DayRoutine) => (
                <Routine
                  key={`${routine.routineId}-${routine.scheduleId}`}
                  scheduleId={routine.scheduleId}
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
                      repeatValue: routine.repeatValue!,
                    });
                  }}
                  onDeleteClick={() => {
                    setCheckDelete(true);
                    setDeleteTargetId(routine.routineId);
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
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
