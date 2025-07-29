import Image from 'next/image';
import backGround from '/public/profileBackGround.svg';
// import character from '/public/images/character.png';
import coin from '/public/coin.svg';
// import { useEffect, useState } from 'react';
import { fetchProfile, fetchUserItem, fetchUserPoint } from '@/api/member';
// import { useUserStore } from '@/store/UserStore';
import { Item, ProfileData } from '../../../../types/User';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../common/ui/LoadingSpinner';
import { useEffect, useState } from 'react';

export default function Profile() {
  const [equippedItem, setEquippedItem] = useState<
    Record<'TOP' | 'BOTTOM' | 'ACCESSORY', string | null>
  >({
    TOP: null,
    BOTTOM: null,
    ACCESSORY: null,
  });
  const { data: profileData, isLoading: profileLoading } = useQuery<
    ProfileData,
    Error
  >({
    queryKey: ['user-profile'],
    queryFn: fetchProfile,
    staleTime: 5 * 60 * 1000,
  });

  const { data: userPointData, isLoading: pointLoading } = useQuery<
    { points: number },
    Error
  >({
    queryKey: ['user-point'],
    queryFn: fetchUserPoint,
    staleTime: 5 * 60 * 1000,
  });

  // 보유아이템 목록 불러오기
  const { data, isLoading: characterLoading } = useQuery<
    { data: Item[] },
    Error
  >({
    queryKey: ['user-items'],
    queryFn: fetchUserItem,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (!data) return;

    const allData = data;
    // 로딩 시 장착된 아이템 초기화
    const initSelected: Record<'TOP' | 'BOTTOM' | 'ACCESSORY', string | null> =
      {
        TOP: null,
        BOTTOM: null,
        ACCESSORY: null,
      };

    allData.data.forEach((item: Item) => {
      if (item.isEquipped) {
        initSelected[item.itemtype] = item.itemKey;
      }
    });

    // api 호출 시 아이템 비교용
    setEquippedItem(initSelected); // 로딩 시 장작된 아이템 저장하기
  }, [data]);

  const nickname = profileData?.member?.nickname ?? '익명';
  const badgeKey = profileData?.badge?.badgeKey ?? 'clean_bronze';
  const badgeName = profileData?.badge?.badgeName ?? '배지 없음';
  const point = userPointData?.points ?? 0;

  if (profileLoading || pointLoading || characterLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="relative z-0 flex h-[167px] w-full overflow-hidden rounded-[10px]">
      <div className="absolute inset-0 z-5 bg-[#e5e5e5]/30"></div>

      {/* 배경 이미지 */}
      <Image
        src={backGround}
        alt="bg"
        fill
        priority
        className="object-cover brightness-90"
      />

      {/* 캐릭터 이미지 */}
      <div className="relative z-10 flex items-center">
        <div className="relative h-[130px] w-[130px] flex-shrink-0">
          <Image
            src="/images/mainCharacter.png"
            alt="기본 캐릭터"
            width={130}
            height={130}
            priority
            className="object-contain"
          />
          {equippedItem.TOP && (
            <Image
              src={`/images/items/${equippedItem.TOP}.png`}
              alt="상의"
              width={130}
              height={130}
              priority
              className="absolute top-[4px] object-contain"
            />
          )}
          {equippedItem.BOTTOM && (
            <Image
              src={`/images/items/${equippedItem.BOTTOM}.png`}
              alt="하의"
              width={130}
              height={130}
              priority
              className="absolute object-contain"
            />
          )}
          {equippedItem.ACCESSORY && (
            <Image
              src={`/images/items/${equippedItem.ACCESSORY}.png`}
              alt="액세서리"
              width={130}
              height={130}
              priority
              className="absolute top-[0px] object-contain"
            />
          )}
        </div>
        <div className="flex flex-col justify-center">
          <div className="z-20 mb-[7px] flex items-center gap-[5px]">
            <Image
              src={`/images/badges/${badgeKey}.svg`}
              alt="character"
              width={10}
              height={15}
              style={{ verticalAlign: 'middle' }}
            />
            <span className="text-[10px] font-medium text-[#616161]">
              {badgeName}
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
