import Image from 'next/image';
import backGround from '/public/profileBackGround.svg';
import profileBg from '/public/profileBg.png';
import profileBg2 from '/public/profileBg2.png';
import coin from '/public/coin.svg';
import { fetchProfile, fetchUserItem, fetchUserPoint } from '@/api/member';
import { Item, ProfileData } from '../../../../types/User';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../common/ui/LoadingSpinner';
import { useEffect, useState } from 'react';

export default function Profile() {
  const [equippedItem, setEquippedItem] = useState<
    Record<'TOP' | 'BOTTOM' | 'ACCESSORY', Item | null>
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
    retry: 0,
  });

  const { data: userPointData, isLoading: pointLoading } = useQuery<
    { points: number },
    Error
  >({
    queryKey: ['user-point'],
    queryFn: fetchUserPoint,
    staleTime: 5 * 60 * 1000,
    retry: 0,
  });

  // 보유아이템 목록 불러오기
  const { data: itemData, isLoading: characterLoading } = useQuery<
    { data: Item[] },
    Error
  >({
    queryKey: ['user-items'],
    queryFn: fetchUserItem,
    staleTime: 5 * 60 * 1000,
    retry: 0,
  });

  useEffect(() => {
    if (!itemData) return;

    // 로딩 시 장착된 아이템 초기화
    const initSelected: Record<'TOP' | 'BOTTOM' | 'ACCESSORY', Item | null> = {
      TOP: null,
      BOTTOM: null,
      ACCESSORY: null,
    };

    itemData.data.forEach((item: Item) => {
      if (item.isEquipped) {
        initSelected[item.itemtype] = item;
      }
    });

    setEquippedItem(initSelected);
  }, [itemData]);

  const nickname = profileData?.member?.nickname ?? '익명';
  const badgeKey = profileData?.equippedBadge?.badgeKey ?? 'CLEAN_BRONZE';
  const badgeName = profileData?.equippedBadge?.badgeName ?? '배지 없음';
  const point = userPointData?.points ?? 0;

  if (profileLoading || pointLoading || characterLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="relative z-0 flex h-[200px] w-full max-w-[614px] overflow-hidden rounded-[14px]">
      <div className="absolute inset-0 z-10 rounded-[14px] bg-[#1E1E1E]/40" />

      <Image
        src={profileBg2}
        alt="bg"
        fill
        priority
        className="object-fill brightness-90 rounded-[14px]"
      />

      <div className="relative z-20 flex items-center px-6">
        <div className="relative h-[160px] w-[160px] flex-shrink-0">
          <Image
            src="/images/mainCharacter.png"
            alt="기본 캐릭터"
            width={160}
            height={160}
            priority
            className="object-contain"
          />
          {equippedItem.TOP && (
            <Image
              src={`/images/items/${equippedItem.TOP.itemKey}.png`}
              alt="상의"
              width={160}
              height={160}
              className="absolute top-0 object-contain"
            />
          )}
        </div>

        <div className="ml-6 flex flex-col">
          <div className="mb-2 flex items-center gap-2">
            <Image
              src={`/images/badges/${badgeKey}.svg`}
              alt="badge"
              width={16}
              height={20}
            />
            <span className="text-[16px] font-semibold text-[#FFF8E7]">
              {badgeName}
            </span>
          </div>

          <div className="mb-4">
            <span className="text-[28px] font-bold text-[#FFF8E7] drop-shadow-[1px_1px_2px_rgba(0,0,0,0.6)]">
              {nickname}
            </span>
          </div>

          <div className="relative flex h-[40px] w-[110px] items-center gap-2 rounded-[8px] bg-[#000000]/70 px-3">
            <Image src={coin} alt="coin" className="h-[22px] w-[22px]" />
            <span className="ml-auto text-[18px] text-[#FFB84C]">{point}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
