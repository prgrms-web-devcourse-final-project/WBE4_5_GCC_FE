'use client';
import Profile from './components/main/Profile';
import Routine from './components/routine/Routine';
import { useEffect, useState } from 'react';
import { me } from '@/api/api';

import quest from '/public/quest.svg';
import acheivement from '/public/acheivement.svg';
import FloatingButton from './components/common/FloatingButton';
import Donut from './components/common/ui/Donut';
import { useRouter } from 'next/navigation';
import Quest from './components/main/Quest';
import { UserRoutine } from '@/api/routine/routine';

export default function Main() {
  // 나중엔 true로 바꿔야함
  const [loading, setLoading] = useState(false);
  const [openQuest, setOpenQuest] = useState(false);

  const router = useRouter();
  const goToCollection = () => {
    router.push('/collection');
  };

  useEffect(() => {
    try {
      const fetchData = async () => {
        // 유저 정보 불러오기 API
        const userInfo = await me();
        console.log('유저 정보:', userInfo);
        // 오늘의 루틴 불러오기 API
        UserRoutine();
      };
      fetchData();
    } catch (error) {
      console.error('유저 정보를 불러오지 못했습니다', error);
    } finally {
      setLoading(false);
    }
  }, []);
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
                    오늘의 루틴 <span className="text-[#FFB84C]">4</span>
                  </span>
                </div>
                <Donut
                  width={46}
                  height={46}
                  percent={20}
                  className="ml-auto flex"
                />
              </div>
            </div>
            <div className="flex w-full flex-col space-y-3">
              <Routine
                title="미지근한 물 한 잔 마시기"
                category="건강"
                time="13:00"
                isImportant
                isCompleted
              />
              <Routine
                title="빨래 돌리기"
                category="세탁 / 의류"
                subCategory="잠옷"
                time="13:00"
              />
              <Routine
                title="도시락 싸기"
                category="요리"
                subCategory="회사 점심"
                time="13:00"
                isImportant
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
