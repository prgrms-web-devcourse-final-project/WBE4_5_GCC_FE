'use client';
import Profile from './components/main/Profile';
import Routine from './components/routine/Routine';
import { useEffect, useState } from 'react';
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
import { useQueryClient } from '@tanstack/react-query';
import { getBadges } from '@/api/badges';
import { fetchItems } from '@/api/items';
import { fetchUserQuest } from '@/api/member';

export default function Main() {
  const [openQuest, setOpenQuest] = useState(false);
  const [checkDelete, setCheckDelete] = useState(false);
  const router = useRouter();
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const queryClient = useQueryClient();
  const { data: weekData, isPending: weekLoading } = useWeekRoutine();

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ['user-badges'],
      queryFn: () => getBadges(1, 999),
      staleTime: 5 * 60 * 1000,
    });
    queryClient.prefetchQuery({
      queryKey: ['shop-items', 1],
      queryFn: fetchItems,
      staleTime: 5 * 60 * 1000,
    });
    queryClient.prefetchQuery({
      queryKey: ['user-quests'],
      queryFn: fetchUserQuest,
      staleTime: 5 * 60 * 1000,
    });
  }, [queryClient]);

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

  const handleAddRoutine = () => {
    router.push('/routine/add-routine');
  };

  return (
    <>
      <div className="relative mx-auto flex min-h-screen max-w-md flex-col items-center pt-4 select-none">
        <div className="absolute top-0 right-10 z-30 my-8">
          <FloatingButton
            src={quest}
            alt="quest"
            text="퀘스트"
            textSize="12px"
            className="mb-6"
            onClick={() => setOpenQuest(true)}
            imgWidth={90}
            imgHeight={60}
          />
          <FloatingButton
            src={acheivement}
            alt="acheivement"
            text="도감"
            textSize="12px"
            imgWidth={90}
            imgHeight={60}
            onClick={goToCollection}
          />
        </div>

        {openQuest && <Quest className="" setOpenQuest={setOpenQuest} />}

        <div className="flex w-full border-b-10 border-b-[#F8F5F1] px-5 dark:border-b-[var(--dark-bg-secondary)]">
          <Profile />
        </div>
        {weekLoading && (
          <div className="mt-10 flex min-h-screen w-full flex-col gap-5 rounded-[10px] bg-white px-5 py-4 dark:bg-[var(--dark-bg-primary)]">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-3">
                <div className="h-[27px] w-[100px] animate-pulse rounded-[10px] bg-gray-200"></div>
                <div className="h-[27px] w-[146px] animate-pulse rounded-[10px] bg-gray-200"></div>
              </div>
              <div className="h-[54px] w-[54px] animate-pulse rounded-full bg-gray-200"></div>
            </div>
            <div className="flex min-h-screen flex-col gap-5 rounded-[10px] bg-white p-4 dark:bg-[var(--dark-bg-primary)]">
              <div className="h-[86px] w-full animate-pulse rounded-[10px] bg-gray-200"></div>
              <div className="h-[86px] w-full animate-pulse rounded-[10px] bg-gray-200"></div>
              <div className="h-[86px] w-full animate-pulse rounded-[10px] bg-gray-200"></div>
            </div>
          </div>
        )}
        {!weekLoading && (
          <div className="mt-5 flex w-full flex-1 px-5">
            <div className="flex min-h-[480px] flex-1 flex-col items-center rounded-[10px] bg-white p-4 dark:bg-[var(--dark-bg-primary)]">
              <div className="mb-6 flex w-full flex-col justify-start">
                <span className="text-xs font-semibold dark:text-[var(--dark-gray-700)]">
                  {todayStr}
                </span>
                <div className="flex items-center gap-1 pb-3 text-[22px] font-bold">
                  <span className="dark:text-[var(--dark-gray-700)]">
                    오늘의 루틴{' '}
                    <span className="text-[#ffb84c]">
                      {filteredRoutines.length}
                    </span>
                  </span>
                  <Donut
                    width={46}
                    height={46}
                    percent={Number(successRate.toFixed())}
                    className="ml-auto flex"
                  />
                </div>
              </div>

              <div className="flex h-full w-full flex-1 flex-col space-y-3">
                {filteredRoutines.length > 0 &&
                  filteredRoutines.map((routine: DayRoutine) => (
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
                          repeatValue: routine.repeatValue,
                          repeatTerm: routine.repeatTerm,
                        });
                      }}
                      onDeleteClick={() => {
                        setCheckDelete(true);
                        setDeleteTargetId(routine.routineId);
                      }}
                    />
                  ))}
                {filteredRoutines.length === 0 && (
                  <div className="mt-20 flex items-center justify-center">
                    <div className="flex w-[260px] flex-col items-center gap-1 rounded-[8px]">
                      <span className="text-[16px] font-medium text-[#9e9e9e]">
                        오늘은 도전할 루틴이 없어요 😇
                      </span>
                      <span className="mb-5 text-[16px] font-medium text-[#9e9e9e]">
                        새로운 루틴을 추가해볼까요?
                      </span>
                      <button
                        className="h-[40px] w-[180px] cursor-pointer rounded-xl bg-[#ffb84c] px-5 text-[15px] text-white hover:bg-[#E6A642] active:bg-[#CC9439] dark:text-[var(--dark-bg-primary)]"
                        onClick={handleAddRoutine}
                      >
                        루틴 추가하러 가기
                      </button>
                    </div>
                  </div>
                )}
              </div>
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
