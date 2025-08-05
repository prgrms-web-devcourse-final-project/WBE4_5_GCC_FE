'use client';

import { useEffect, useState } from 'react';
import quest from '/public/quest.svg';
import acheivement from '/public/acheivement.svg';

import { useRouter, useSearchParams } from 'next/navigation';

import { useWeekRoutine } from '@/api/routine/getWeekRoutine';
import { format, startOfWeek } from 'date-fns';
import { useRoutineStore } from '@/store/RoutineStore';
import {
  useDeleteRoutine,
  useHandleRoutine,
} from '@/api/routine/handleRoutine';
import { useQueryClient } from '@tanstack/react-query';
import { getBadges } from '@/api/badges';
import Quest from '../../components/main/Quest';
import { fetchItems } from '@/api/items';
import { fetchUserQuest } from '@/api/member';
import { useUserStore } from '@/store/UserStore';
import AlertModal from '@/app/components/common/alert/AlertModal';
import Routine from '@/app/components/routine/Routine';
import { DayRoutine } from '../../../../types/routine';
import Donut from '@/app/components/common/ui/Donut';
import Profile from '@/app/components/main/Profile';
import FloatingButton from '@/app/components/common/FloatingButton';
import Lottie from 'lottie-react';
import CatAnimation from '../../../../public/lottie/Cat.json';

export default function Home() {
  const searchParams = useSearchParams();
  const { setIsLoggedIn, setIsSocial } = useUserStore();
  const [openQuest, setOpenQuest] = useState(false);
  const [checkDelete, setCheckDelete] = useState(false);
  const router = useRouter();
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const queryClient = useQueryClient();
  const { data: weekData, isPending: weekLoading } = useWeekRoutine();
  console.log('🔍 social 값:', searchParams.get('social'));
  useEffect(() => {
    const social = searchParams.get('social');
    if (social === 'true') {
      setIsLoggedIn(true);
      setIsSocial(true);
      console.log('✅ setIsLoggedIn(true) 실행됨');
    }
  }, [searchParams, setIsLoggedIn, setIsSocial]);

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
      <div className="relative mx-auto flex max-w-[614px] flex-col items-center bg-white pt-4 pb-20 select-none dark:bg-[var(--dark-bg-primary)]">
        <div className="absolute top-2 right-10 z-30 my-8">
          <FloatingButton
            src={quest}
            alt="quest"
            text="퀘스트"
            textSize="14px"
            className="mb-6"
            onClick={() => setOpenQuest(true)}
            imgWidth={100}
            imgHeight={80}
          />
          <FloatingButton
            src={acheivement}
            alt="acheivement"
            text="도감"
            textSize="14px"
            imgWidth={100}
            imgHeight={80}
            onClick={goToCollection}
          />
        </div>

        {openQuest && <Quest setOpenQuest={setOpenQuest} />}

        <div className="flex w-full px-5 dark:border-b-[var(--dark-bg-secondary)]">
          <Profile />
        </div>

        {weekLoading && (
          <div className="mt-10 flex min-h-screen w-full flex-col gap-5 rounded-[10px] bg-white px-5 py-4 dark:bg-[var(--dark-bg-primary)]">
            <div className="flex items-center justify-between px-5">
              <div className="flex flex-col gap-3">
                <div className="h-[27px] w-[100px] animate-pulse rounded-[10px] bg-gray-200"></div>
                <div className="h-[27px] w-[146px] animate-pulse rounded-[10px] bg-gray-200"></div>
              </div>
              <div className="h-[54px] w-[54px] animate-pulse rounded-full bg-gray-200"></div>
            </div>
            <div className="flex min-h-screen flex-col gap-5 bg-white p-4 dark:bg-[var(--dark-bg-primary)]">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-[86px] w-full animate-pulse rounded-[10px] bg-gray-200"
                ></div>
              ))}
            </div>
          </div>
        )}

        {!weekLoading && (
          <div className="mt-5 flex h-full w-full flex-1 px-5">
            <div className="flex min-h-[480px] flex-1 flex-col items-center rounded-[10px] bg-white p-4 dark:bg-[var(--dark-bg-primary)]">
              <div className="mb-6 flex w-full items-center justify-between">
                <div className="flex flex-col justify-center">
                  <span className="text-base font-semibold text-[#616161] dark:text-[var(--dark-gray-700)]">
                    {todayStr}
                  </span>
                  <div className="pt-1 text-[26px] font-bold dark:text-[var(--dark-gray-700)]">
                    오늘의 루틴{' '}
                    <span className="pl-1 text-[#ffb84c]">
                      {filteredRoutines.length}
                    </span>
                  </div>
                </div>
                <Donut
                  width={60}
                  height={60}
                  percent={Number(successRate.toFixed())}
                  className="flex-shrink-0"
                />
              </div>

              <div className="flex h-full w-full flex-1 flex-col space-y-3">
                {filteredRoutines.length > 0 ? (
                  filteredRoutines.map((routine) => (
                    <Routine
                      key={`${routine.routineId}-${routine.scheduleId}`}
                      scheduleId={routine.scheduleId}
                      title={routine.name}
                      category={routine.majorCategory}
                      //emoji={routine.emoji}
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
                          ...routine,
                        });
                      }}
                      onDeleteClick={() => {
                        setCheckDelete(true);
                        setDeleteTargetId(routine.routineId);
                      }}
                    />
                  ))
                ) : (
                  <div className="mt-40 flex flex-col items-center justify-center gap-2">
                    <div className="h-48 w-48">
                      <Lottie animationData={CatAnimation} loop autoplay />
                    </div>
                    <span className="-mt-20 text-xl font-medium text-[#616161]">
                      아직 등록된 루틴이 없어요.
                    </span>
                    <span className="text-base text-[#888888]">
                      루틴을 등록하고 꾸준히 관리해보세요!
                    </span>
                    <button
                      className="mt-6 h-[50px] w-[140px] cursor-pointer rounded-lg bg-[#FFF4D1] px-5 text-base font-semibold text-[#ffb84c] active:bg-[#ffb84c] dark:text-[var(--dark-bg-primary)]"
                      onClick={handleAddRoutine}
                    >
                      루틴 등록하기
                    </button>
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
