import Image from 'next/image';
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

    // api 호출 시 아이템 비교용
    setEquippedItem(initSelected);
    // 로딩 시 장작된 아이템 저장하기
  }, [itemData]);

  const nickname = profileData?.member?.nickname ?? '익명';
  const badgeKey = profileData?.equippedBadge?.badgeKey ?? '';
  const badgeName = profileData?.equippedBadge?.badgeName ?? '배지 미착용';
  const point = userPointData?.points ?? 0;

  if (profileLoading || pointLoading || characterLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--white)] dark:bg-[var(--dark-bg-primary)]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="relative z-0 flex h-[186px] w-full overflow-hidden rounded-[10px]">
      <div className="absolute inset-0 z-10 rounded-[10px] bg-[#1E1E1E]/40" />

      <Image
        src={profileBg2}
        alt="bg"
        fill
        priority
        className="object-fill brightness-90"
      />

      <div className="relative z-20 flex items-center px-3">
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
              src={`/images/items/${equippedItem.TOP.itemKey}.png`}
              alt="상의"
              width={130}
              height={130}
              priority
              className="absolute top-0 object-contain"
            />
          )}
          {equippedItem.BOTTOM && (
            <Image
              src={`/images/items/${equippedItem.BOTTOM.itemKey}.png`}
              alt="하의"
              width={130}
              height={130}
              priority
              className="absolute top-0 object-contain"
            />
          )}
          {equippedItem.ACCESSORY && (
            <Image
              src={`/images/items/${equippedItem.ACCESSORY.itemKey}.png`}
              alt="액세서리"
              width={130}
              height={130}
              priority
              className="absolute top-0 object-contain"
            />
          )}
        </div>

        <div className="flex flex-col">
          <div
            className={`mb-[2px] flex items-center ${badgeKey ? 'gap-[8px]' : ''}`}
          >
            {badgeKey ? (
              <Image
                src={`/images/badges/${badgeKey}.svg`}
                alt="뱃지이미지"
                width={12}
                height={15}
              />
            ) : (
              <div className="h-auto w-0 bg-blue-200" /> // 배지 이미지 없는 경우 자리 확보
            )}
            <span className="text-[14px] font-semibold text-[#FFF8E7]">
              {badgeName}
            </span>
          </div>

          <div className="mb-[10px]">
            <span className="text-[20px] font-bold text-[#FFF8E7] drop-shadow-[1px_1px_2px_rgba(0,0,0,0.6)]">
              {nickname}
            </span>
          </div>

          <div className="relative mt-3 flex h-[32px] w-[90px] items-center gap-1 rounded-[6px] bg-[#000000]/70 px-2">
            <Image src={coin} alt="coin" className="h-[18px] w-[18px]" />
            <span className="ml-auto text-[15px] text-[var(--primary-yellow)]">
              {point}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
