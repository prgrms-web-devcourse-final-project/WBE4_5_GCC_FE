'use client';
import Profile from './components/main/Profile';
import Routine from './components/routine/Routine';
import { useState } from 'react';

// import quest from '/public/quest.svg';
// import acheivement from '/public/acheivement.svg';
import FloatingButton from './components/common/FloatingButton';
import Donut from './components/common/ui/Donut';
import { useRouter } from 'next/navigation';
import Quest from './components/main/Quest';
import { routineHandler } from '@/api/routine/routine';
import { DayRoutine } from '../../types/routine';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import LoadingSpinner from './components/common/ui/LoadingSpinner';
import AlertModal from './components/common/alert/AlertModal';
import { useWeekRoutine } from '@/api/routine/getWeekRoutine';
import { format } from 'date-fns';
import { useRoutineStore } from '@/store/RoutineStore';

export default function Main() {
  const quest = '/quest.svg';
  const acheivement = '/acheivement.svg';

  const queryClient = useQueryClient();
  const [openQuest, setOpenQuest] = useState(false);
  const [checkDelete, setCheckDelete] = useState(false);
  const router = useRouter();

  const { data: weekData, isPending: weekLoading } = useWeekRoutine();
  console.log('weekData:', weekData);

  const today = format(new Date(), 'yyyy-MM-dd');
  const filteredRoutines: DayRoutine[] = weekData?.routines?.[today] ?? [];
  const total = filteredRoutines.length;
  const done = filteredRoutines.filter((r) => r.isDone).length;
  const successRate = total ? Math.round((done / total) * 100) : 0;
  console.log(filteredRoutines);

  const dateStr: string = format(new Date(), 'yyyy-MM-dd');
  console.log(dateStr);

  const { mutate } = useMutation({
    mutationFn: ({
      scheduleId,
      isDone,
    }: {
      scheduleId: number;
      isDone: boolean;
    }) => routineHandler(scheduleId, isDone),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['routine-week'],
        exact: false,
      });
    },
  });

  const goToCollection = () => {
    router.push('/collection');
  };

  return (
    <>
      <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col items-center bg-white select-none">
        <div className="absolute top-[-20px] right-10 z-30 my-8">
          <FloatingButton
            src={quest}
            alt="quest"
            text="퀘스트"
            textSize="12px"
            className="mb-3"
            onClick={() => setOpenQuest(true)}
            imgWidth={26}
            imgHeight={21}
          />
          <FloatingButton
            src={acheivement}
            alt="acheivement"
            text="도감"
            textSize="12px"
            onClick={goToCollection}
            imgWidth={26}
            imgHeight={21}
          />
        </div>

        {openQuest && <Quest className="" setOpenQuest={setOpenQuest} />}

        <div className="flex w-full px-5">
          <Profile />
        </div>
        {weekLoading && (
          <div className="mt-[50px] flex flex-col items-center justify-center gap-6">
            <LoadingSpinner />
            <p className="text-[20px] font-semibold">
              루틴을 불러오는 중입니다.
            </p>
          </div>
        )}
        {!weekLoading && (
          <div className="flex w-full flex-col items-center justify-center border-t-10 border-t-[#FBFBFB] px-5 py-4">
            <div className="mb-6 flex w-full flex-col justify-start">
              <span className="text-xs font-semibold">2025년 7월 9일</span>
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
                  onDeleteClick={() => setCheckDelete(true)}
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
          onConfirm={() => console.log('삭제완료')}
          cancelText="취소"
          onCancel={() => setCheckDelete(false)}
          isOpen={checkDelete}
        />
      )}
    </>
  );
}
