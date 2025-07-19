import Image from 'next/image';
import backGround from '/public/profileBackGround.svg';
import character from '/public/images/character.png';
import coin from '/public/coin.svg';
import { useEffect, useState } from 'react';
import { fetchProfile, fetchUserPoint } from '@/api/member';
import { useUserStore } from '@/store/UserStore';

export default function Profile() {
  const [point, setPoint] = useState<number>(0);
  const { setUser } = useUserStore.getState();
  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const data = await fetchUserPoint();
        await fetchProfile();
        const point = data.data.points;
        setUser({ point: point });
        setPoint(point);
      } catch (err) {
        console.error('유저 정보 불러오기 실패', err);
      }
    };
    loadProfileData();
  }, [setUser]);

  const nickname = useUserStore((state) => state.nickname);

  return (
    <div className="relative z-0 flex h-[167px] w-full overflow-hidden rounded-[10px]">
      <div className="absolute inset-0 z-5 bg-[#e5e5e5]/30"></div>

      {/* 배경 이미지 */}
      <Image
        src={backGround}
        alt="bg"
        fill
        className="object-cover brightness-90"
        priority
      />

      {/* 캐릭터 이미지 */}
      <div className="absolute z-10 flex gap-[22px] p-[22px]">
        <Image
          src={character}
          alt="character"
          width={80} // 정확한 가로값 지정
          //height={125} // div에 맞춤
          className="h-auto"
        />
        <div className="flex flex-col justify-center">
          <div className="z-20 mb-[7px] flex items-center gap-[5px]">
            <Image
              src="/images/badges/clean3.svg"
              alt="character"
              width={10}
              height={15}
              style={{ verticalAlign: 'middle' }}
            />
            <span className="text-[10px] font-medium text-[#616161]">
              청소의 정령 소환사
            </span>
          </div>
          <div className="mb-[14px] text-[18px] font-bold">{nickname}</div>
          <div className="relative flex h-[21px] w-[80px] items-center gap-1 rounded-[6px] bg-[#222222]/50 px-2">
            <Image src={coin} alt="coin" className="h-[11px] w-[11px]" />
            <span className="ml-auto text-[12px] text-[#FFB84C]">{point}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
