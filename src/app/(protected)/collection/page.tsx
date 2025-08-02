'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Badge } from '../../../../types/general';
import { ProfileData } from '../../../../types/User';
import { BadgeRewardByKey, getBadges, equipBadge } from '@/api/badges';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

import { ListFilter } from 'lucide-react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import BackHeader from '@/app/components/common/ui/BackHeader';
import AlertModal from '@/app/components/common/alert/AlertModal';
import LoadingSpinner from '@/app/components/common/ui/LoadingSpinner';
import CollectionItemCard from '@/app/components/collection/CollectionItem';
import CollectionBottomSheet from '@/app/components/collection/CollectionBottomSheet';
import CollectionSkeletonCard from '@/app/components/collection/CollectionCardSkeleton';

type EquipBadgeVariables = {
  badgeKey: string;
  badgeName: string;
};

export default function Page() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [rewardInfo, setRewardInfo] = useState<{
    badgeName: string;
    pointAdded: number;
    message: string;
  } | null>(null);

  const [selectedFilters, setSelectedFilters] = useState<{
    tiers: string[];
    categories: string[];
  }>({ tiers: [], categories: [] });

  // 업적 목록 조회
  const {
    data: badgesData,
    isLoading,
    isFetching,
  } = useQuery<{ badges: Badge[]; totalPages: number }, Error>({
    queryKey: ['user-badges'],
    queryFn: () => getBadges(page, 999),
    staleTime: 5 * 60 * 1000,
  });

  const badges = badgesData?.badges || [];

  // 업적 보상 받기 mutation
  const rewardMutation = useMutation({
    mutationFn: BadgeRewardByKey,
    onSuccess: (data, badgeKey) => {
      // 캐시된 뱃지 데이터에서 badgeKey로 뱃지의 info 추출
      const badge = badges.find((b: Badge) => b.badgeKey === badgeKey);
      setRewardInfo({
        badgeName: badge?.badgeName ?? '이름 없음',
        pointAdded: data.data.pointAdded ?? 0,
        message: badge?.message ?? '설명 없음',
      });
      queryClient.invalidateQueries({ queryKey: ['user-badges'] });
    },
    onError: () => {
      alert('보상 수령 실패');
    },
  });

  const equipBadgeMutation = useMutation({
    mutationFn: ({ badgeKey }: EquipBadgeVariables) => equipBadge(badgeKey),
    onMutate: async ({ badgeKey, badgeName }: EquipBadgeVariables) => {
      // 프로필에 들어가는 뱃지 낙관적 업데이트
      await queryClient.cancelQueries({ queryKey: ['user-profile'] });
      const previousProfile = queryClient.getQueryData(['user-profile']);

      // 캐시에 낙관적으로 업데이트
      queryClient.setQueryData(['user-profile'], (old: ProfileData) => {
        if (!old) return old;
        const isSameBadge = old.equippedBadge?.badgeKey === badgeKey;
        return {
          ...old,
          equippedBadge: isSameBadge
            ? null
            : {
                badgeKey,
                badgeName,
                badgeTier: 'BRONZE',
              },
        };
      });
      return { previousProfile };
    },
    onSuccess: (_data, variables) => {
      // 캐시 무효화하여 최신 장착 상태 반영
      queryClient.invalidateQueries({ queryKey: ['user-badges'] });
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
      // 장착/해제 토글
      setSelectedItem((prev) =>
        prev === variables.badgeKey ? null : variables.badgeKey,
      );
    },
    onError: (_err, _variables, context) => {
      if (context?.previousProfile) {
        queryClient.setQueryData(['user-profile'], context.previousProfile);
      }
      alert('배지 장착/해제 실패');
    },
  });

  // 이미 장착된 배지를 selectedItem으로 설정
  useEffect(() => {
    if (badges.length > 0) {
      const equippedBadge = badges.find((badge) => badge.isEquipped === true);
      if (equippedBadge) {
        setSelectedItem(equippedBadge.badgeKey);
      }
    }
  }, [badges]);

  // 뱃지 장착 (하나만 선택 가능)
  const handleSelect = (badge: {
    key: string;
    status: string;
    name: string;
  }) => {
    //console.log('선택한 배지:', badge.key);
    if (badge.status !== 'OWNED') {
      return; // 장착 불가
    }
    equipBadgeMutation.mutate({
      badgeKey: badge.key,
      badgeName: badge.name,
    });
  };

  const filteredBadges = badges.filter((badge: Badge) => {
    const matchesTier =
      selectedFilters.tiers.length === 0 ||
      selectedFilters.tiers.includes(badge.tier);
    const matchesCategory =
      selectedFilters.categories.length === 0 ||
      selectedFilters.categories.includes(badge.categoryName);
    const matchesOwned =
      !isChecked || badge.status === 'OWNED' || badge.status === 'EQUIPPED';

    return matchesTier && matchesCategory && matchesOwned;
  });

  const ITEMS_PER_PAGE = 6;
  const totalPages = Math.ceil(filteredBadges.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedBadges = filteredBadges.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  //// 페이지네이션 핸들러
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  // 필터링 조건 바뀔 때마다 페이지를 1로 초기화
  useEffect(() => {
    setPage(1);
  }, [selectedFilters, isChecked]);

  return (
    <>
      <div className="h-1vh flex w-full justify-center bg-white pt-11">
        <div className="flex w-full min-w-[390px] flex-col items-center bg-white">
          <BackHeader title="도감" />

          {/* 콘텐츠 영역 */}
          <div className="mt-[30px] min-h-[618px] w-full items-center px-6">
            {/* 상단 체크박스 & 필터 */}
            <div className="mb-[15px] flex w-full items-center justify-between">
              {/* 체크 박스 */}
              <div>
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                    className="h-[14px] w-[14px] cursor-pointer rounded-none border border-[#D9D9D9] accent-black"
                  />
                  <p className="text-sm font-medium text-black">
                    내가 보유한 뱃지만 보기
                  </p>
                </label>
              </div>

              {/* 필터 */}
              <div className="flex items-center space-x-1.5">
                <span
                  className="cursor-pointer text-xs font-medium text-[#616161]"
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
                {isLoading || isFetching ? (
                  Array.from({ length: 6 }).map((_, i) => (
                    <CollectionSkeletonCard key={i} />
                  ))
                ) : filteredBadges.length === 0 ? (
                  <p className="col-span-2 mt-50 py-8 text-center text-sm text-[#616161]">
                    해당 조건에 맞는 업적이 없습니다.
                  </p>
                ) : (
                  paginatedBadges.map((badge: Badge) => {
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
                      currentProgress: badge.currentProgress,
                      status: badge.status,
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
                        onSelect={() =>
                          handleSelect({
                            key: badge.badgeKey,
                            status: badge.status,
                            name: badge.badgeName,
                          })
                        }
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
                                className="mt-4 h-7.5 min-w-34 cursor-pointer rounded-[3px] border border-[#FFB84C] bg-[#FFE29A] text-sm font-semibold text-[#A47148]"
                              >
                                보상받기
                              </button>
                            </div>
                          )
                        }
                      />
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* 페이지네이션 */}
          <div className="mt-7 flex items-center justify-center gap-2">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className={`mr-1 h-6 w-6 cursor-pointer text-sm ${page === 1 ? 'text-[#D9D9D9]' : 'text-[#222222]'}`}
            >
              <ChevronLeft />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`h-7 w-7 cursor-pointer rounded-[3px] text-sm ${pageNum === page ? 'bg-[#222222] font-semibold text-white' : 'text-[#222222]'}`}
                >
                  {pageNum}
                </button>
              ),
            )}
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className={`ml-1 h-6 w-6 cursor-pointer text-sm ${page === totalPages ? 'text-[#D9D9D9]' : 'text-[#222222]'}`}
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <CollectionBottomSheet
          isOpen={isOpen}
          setIsOpenAction={setIsOpen}
          onApplyAction={(filters) => setSelectedFilters(filters)}
        />
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
