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
import { routineHandler, UserRoutine } from '@/api/routine/routine';
import { DayRoutine } from '../../types/routine';

export default function Main() {
  // 나중엔 true로 바꿔야함
  const [loading, setLoading] = useState(false);
  const [openQuest, setOpenQuest] = useState(false);
  const [dayRoutine, setDayRoutine] = useState<DayRoutine[]>([]);

  const router = useRouter();
  const goToCollection = () => {
    router.push('/collection');
  };
  // 완료된 항목 개수
  const doneCount = dayRoutine.filter((routine) => routine.isDone).length;

  // 전체 항목 개수
  const totalCount = dayRoutine.length;

  // 성공 비율(백분율)
  const successRate = (doneCount / totalCount) * 100;

  useEffect(() => {
    const fetchDayRoutine = async () => {
      try {
        const result = await UserRoutine();
        setDayRoutine(result);
      } catch (error) {
        console.error('오늘루틴 불러오기 실패:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDayRoutine();
  }, []);

  useEffect(() => {
    console.log('dayRoutine에 저장됨:', dayRoutine);
  }, [dayRoutine]);

  // 오늘 루틴을 상태에 저장하기?
  return (
    <>
      {loading && <div></div>}
      {!loading && (
        <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col items-center bg-white">
          <div className="absolute top-4 right-10 z-30 my-8">
            <FloatingButton
              src={quest}
              alt="quest"
              text="퀘스트"
              textSize="12px"
              className="mb-3"
              // imgWidth={26}
              // imgHeight={21}
              onClick={() => setOpenQuest(true)}
            />
            <FloatingButton
              src={acheivement}
              alt="acheivement"
              text="도감"
              textSize="12px"
              onClick={() => goToCollection()}
            />
          </div>
          {openQuest && <Quest className="" setOpenQuest={setOpenQuest} />}
          <div className="my-8 flex w-full px-5">
            <Profile />
          </div>
          <div className="flex w-full flex-col items-center justify-center border-t-10 border-t-[#FBFBFB] px-5 py-5">
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
            {dayRoutine && (
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
                      routineHandler(routine.scheduleId, !routine.isDone)
                    }
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
