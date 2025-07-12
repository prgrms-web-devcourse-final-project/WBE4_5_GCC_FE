'use client';
import Profile from './components/main/Profile';
import { Plus } from 'lucide-react';
import Routine from './components/routine/Routine';
import { useEffect, useState } from 'react';
import { me } from '@/api/api';
import { UserRoutine } from '@/api/routine';

import quest from '/public/quest.svg';
import acheivement from '/public/acheivement.svg';
import FloatingButton from './components/common/FloatingButton';
import Donut from './components/common/ui/Donut';
import { useRouter } from 'next/navigation';

export default function Main() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const goToQuest = () => {
    router.push('/');
  };
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
        <div className="relative flex min-h-screen flex-col items-center bg-white px-5">
          <div className="absolute top-4 right-10 z-30">
            <FloatingButton
              src={quest}
              alt="quest"
              text="퀘스트"
              textSize="12px"
              className="mb-3"
              // imgWidth={26}
              // imgHeight={21}
              onClick={() => goToQuest()}
            />
            <FloatingButton
              src={acheivement}
              alt="acheivement"
              text="도감"
              textSize="12px"
              onClick={() => goToCollection()}
            />
          </div>
          <Profile />
          <div className="flex w-full max-w-md flex-col items-center justify-center border-t-10 border-b-1 border-t-[#FBFBFB] border-b-[#CCCCCC] px-5 py-11">
            <div className="mb-6 flex w-full flex-col justify-start space-y-4.5">
              <span className="text-xl font-semibold">2025년 7월 9일</span>
              <div className="flex items-center gap-1 text-[22px] font-bold">
                <div>
                  <span>오늘의 루틴</span>{' '}
                  <span className="text-[#FFB84C]">4</span>
                </div>
                <Donut
                  width={46}
                  height={46}
                  percent={30}
                  className="ml-auto flex"
                />
              </div>
            </div>
            <div className="flex w-full flex-col space-y-3">
              <Routine
                title="미지근한 물 한 잔 마시기"
                Icon="🏃🏻"
                category="건강"
                time="13:00"
                isImportant
                isCompleted
              />
              <Routine
                title="빨래 돌리기"
                Icon="🧺"
                category="세탁 / 의류"
                subCategory="잠옷"
                time="13:00"
              />
              <Routine
                title="도시락 싸기"
                Icon="🍳"
                category="요리"
                subCategory="회사 점심"
                time="13:00"
                isImportant
              />
              <Routine
                title="쓰레기 분리수거"
                Icon="♻️"
                category="쓰레기 / 환경"
                time="13:00"
              />
              <Routine
                title="저녁 조깅"
                Icon="🏃🏻"
                category="건강"
                subCategory=" 유산소 운동"
                time="13:00"
              />
            </div>
            <button className="fixed right-0 bottom-15 mr-5 flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-full bg-[#222222] shadow-lg transition-colors duration-300 hover:bg-[#333333]">
              <Plus className="h-[30px] w-[30px] text-white" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
