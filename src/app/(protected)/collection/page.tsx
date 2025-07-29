'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Badge } from '../../../../types/general';
import { BadgeRewardByKey, getBadges, equipBadge } from '@/api/badges';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

import { ListFilter } from 'lucide-react';
import BackHeader from '@/app/components/common/ui/BackHeader';
import AlertModal from '@/app/components/common/alert/AlertModal';
import LoadingSpinner from '@/app/components/common/ui/LoadingSpinner';
import CollectionItemCard from '@/app/components/collection/CollectionItem';
import CollectionBottomSheet from '@/app/components/collection/CollectionBottomSheet';

//const tabs = ['전체', '🏆', '🥇', '🥈', '🥉'];
const tierEmojiMap: Record<Badge['tier'], string> = {
  BRONZE: '🥉',
  SILVER: '🥈',
  GOLD: '🥇',
  PLATINUM: '🏆',
};

export default function Page() {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedTab, setSelectedTab] = useState('전체');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [rewardInfo, setRewardInfo] = useState<{
    badgeName: string;
    pointAdded: number;
    message: string;
  } | null>(null);
  const page = 1;
  const size = 12; // 고정

  // 업적 목록 조회
  const {
    data: badges = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<Badge[], Error>({
    queryKey: ['user-badges'],
    queryFn: () => getBadges(page, size),
    staleTime: 5 * 60 * 1000,
  });

  // 업적 보상 받기 mutation
  const rewardMutation = useMutation({
    mutationFn: BadgeRewardByKey,
    onSuccess: (data, badgeKey) => {
      // 캐시된 뱃지 데이터에서 badgeKey로 뱃지의 info 추출
      const badge = badges.find((b) => b.badgeKey === badgeKey);
      console.log('데이터 & 배지', data, badge)
      setRewardInfo({
        badgeName: badge?.badgeName ?? '이름 없음',
        pointAdded: data.data.pointAdded ?? 0,
        message: badge?.info ?? '설명 없음',
      });
      queryClient.invalidateQueries({ queryKey: ['user-badges'] });
    },
    onError: () => {
      alert('보상 수령 실패');
    },
  });

  // 뱃지 장착 (하나만 선택 가능)
  const handleSelect = async (badge: { key: string }) => {
    await equipBadge(badge.key);
    setSelectedItem((prev) => (prev === badge.key ? null : badge.key));
  };

  useEffect(() => {
    console.log('장착한 뱃지:', selectedItem);
  }, [selectedItem]);

  const filteredBadges =
    selectedTab === '전체'
      ? badges
      : badges.filter((badge) => tierEmojiMap[badge.tier] === selectedTab);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <div className="flex h-screen w-full justify-center pt-11">
        <div className="flex w-full min-w-[390px] flex-col items-center">
          <BackHeader title="도감" />

          {/* 콘텐츠 영역 */}
          <div className="mt-[30px] w-full items-center px-6">
            {/* 상단 체크박스 & 필터 */}
            <div className="mb-[15px] flex w-full items-center justify-between">
              {/* 체크 박스 */}
              <div>
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                    className="h-[14px] w-[14px] rounded-none border border-[#D9D9D9] accent-black"
                  />
                  <p className="text-sm font-medium text-black">
                    내가 보유한 뱃지만 보기
                  </p>
                </label>
              </div>

              {/* 필터 */}
              <div className="flex cursor-pointer items-center space-x-1.5">
                <span
                  className="text-xs font-medium text-[#616161]"
                  onClick={() => setIsOpen(true)}
                >
                  필터
                </span>
                <ListFilter className="h-4 w-4 text-[#616161]" />
              </div>
            </div>

            {/* 아이템 카드 리스트 */}
            <div className="w-full min-w-[342px]">
              <div className="relative grid w-full grid-cols-2 place-items-center gap-x-6 gap-y-5">
                {filteredBadges.map((badge) => {
                  const tierEmojiMap: Record<Badge['tier'], string> = {
                    BRONZE: '🥉',
                    SILVER: '🥈',
                    GOLD: '🥇',
                    PLATINUM: '🏆',
                  };

                  const item = {
                    id: badge.badgeId,
                    key: badge.badgeKey,
                    name: badge.badgeName,
                    info: badge.info,
                    requirement: badge.requirement,
                    image: {
                      src: `/images/badges/${badge.badgeKey}.svg`,
                      width: 29,
                      height: 43,
                    },
                    category: tierEmojiMap[badge.tier],
                    isLocked: badge.currentProgress >= badge.requirement,
                  };

                  return (
                    <CollectionItemCard
                      key={item.id}
                      item={item}
                      isSelected={selectedItem === item.key}
                      onSelect={handleSelect}
                      action={
                        badge.currentProgress >= badge.requirement && (
                          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-[5px] bg-[#222222]/85">
                            <Image
                              src="/images/lock.svg"
                              alt="잠금아이콘"
                              width={79}
                              height={79}
                              priority
                            />
                            <p className="mt-[6px] text-center text-xs leading-tight font-semibold text-white">
                              {item.info}
                            </p>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                rewardMutation.mutate(badge.badgeKey);
                              }}
                              className="mt-4 h-7.5 min-w-34 rounded-[3px] border border-[#FFB84C] bg-[#FFE29A] text-sm font-semibold text-[#A47148]"
                            >
                              보상받기
                            </button>
                          </div>
                        )
                      }
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <CollectionBottomSheet isOpen={isOpen} setIsOpen={setIsOpen} />
      )}

      {rewardInfo && (
        <AlertModal
          isOpen={true}
          type="success"
          title={`${rewardInfo.badgeName} 보상으로 ${rewardInfo.pointAdded} 포인트 획득!`}
          description={rewardInfo.message}
          confirmText="확인"
          onConfirm={() => setRewardInfo(null)} // 모달 닫기
        />
      )}
    </>
  );
}
