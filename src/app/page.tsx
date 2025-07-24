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
import { routineHandler } from '@/api/routine/routine';
import { DayRoutine } from '../../types/routine';
import { useTodayRoutine } from '@/api/routine/getTodayRoutine';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import LoadingSpinner from './components/common/ui/LoadingSpinner';
import AlertModal from './components/common/alert/AlertModal';

export default function Main() {
  const queryClient = useQueryClient();
  const [openQuest, setOpenQuest] = useState(false);
  const [checkDelete, setCheckDelete] = useState(false);
  const router = useRouter();

  const { data: dayRoutine = [], isPending } = useTodayRoutine();

  const { mutate } = useMutation({
    mutationFn: ({
      scheduleId,
      isDone,
    }: {
      scheduleId: number;
      isDone: boolean;
    }) => routineHandler(scheduleId, isDone),
    onSuccess: () => {
      // 완료/취소 후 다시 조회
      queryClient.invalidateQueries({ queryKey: ['routine-today'] });
    },
  });

  const goToCollection = () => {
    router.push('/collection');
  };
  // 완료된 항목 개수
  const doneCount = dayRoutine.filter((routine) => routine.isDone).length;
  // 전체 항목 개수
  const totalCount = dayRoutine.length;
  // 성공 비율(백분율)
  const successRate = (doneCount / totalCount) * 100;

  return (
    <>
      <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col items-center bg-white">
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
        {isPending && (
          <div className="mt-[50px] flex flex-col items-center justify-center gap-6">
            <LoadingSpinner />
            <p className="text-[20px] font-semibold">
              루틴을 불러오는 중입니다.
            </p>
          </div>
        )}
        {!isPending && (
          <div className="flex w-full flex-col items-center justify-center border-t-10 border-t-[#FBFBFB] px-5 py-4">
            <div className="mb-6 flex w-full flex-col justify-start">
              <span className="text-xs font-semibold">2025년 7월 9일</span>
              <div className="flex items-center gap-1 text-[22px] font-bold">
                <div>
                  <span>
                    오늘의 루틴{' '}
                    <span className="text-[#FFB84C]">{dayRoutine.length}</span>
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
              {dayRoutine.map((routine: DayRoutine) => (
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