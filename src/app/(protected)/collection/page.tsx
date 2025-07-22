'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { BadgeRewardByKey, Badges, equipBadge } from '@/api/badges';
import BackHeader from '@/app/components/common/ui/BackHeader';
import AlertModal from '@/app/components/common/alert/AlertModal';
import { ChevronLeft, ChevronRight, ListFilter } from 'lucide-react';
import CollectionItemCard from '@/app/components/collection/CollectionItem';
import CollectionBottomSheet from '@/app/components/collection/CollectionBottomSheet';

interface Badge {
  badgeId: number;
  badgeKey: string;
  badgeName: string;
  categoryName: string;
  how: string;
  info: string;
  isReceived: boolean;
  receivedDate: string;
  requirement: number;
  tier: 'BRONZE' | 'SILVER' | 'GOLD' | 'TROPHY';
}

const tabs = ['전체', '🏆', '🥇', '🥈', '🥉'];
const tierEmojiMap: Record<Badge['tier'], string> = {
  BRONZE: '🥉',
  SILVER: '🥈',
  GOLD: '🥇',
  TROPHY: '🏆',
};

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('전체');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(false); // 나중엔 true로 바꿔야함
  const [rewardInfo, setRewardInfo] = useState<{
    badgeName: string;
    pointAdded: number;
  } | null>(null);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Badges();
        setBadges(res.data);
      } catch (error) {
        console.error('업적 정보를 불러오지 못했습니다', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="h-1vh flex justify-center overflow-hidden">
        <div className="flex w-full max-w-md flex-col items-center">
          <BackHeader title="도감" />
          <div className="mt-7 mb-[22px] min-h-[340px] w-full min-w-[350px] px-5">
            {/* 탭 버튼 */}
            <div className="flex select-none">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={clsx(
                    'h-[30px] cursor-pointer rounded-t-md px-[18px] py-2 text-xs font-semibold',
                    selectedTab === tab
                      ? 'border-1 border-[#FFB84C] bg-[#FFB84C] text-white'
                      : 'border border-b-0 border-[#D9D9D9] bg-white text-[#AAAAAA]',
                  )}
                >
                  {tab}
                </button>
              ))}
              <div className="mr-3 ml-auto flex cursor-pointer items-center space-x-1.5">
                <ListFilter className="h-3 w-3" />
                <span
                  className="text-xs text-[#616161]"
                  onClick={() => setIsOpen(true)}
                >
                  필터
                </span>
              </div>
            </div>

            {/* 아이템 카드 리스트 */}
            <div
              className="relative grid min-h-[340px] w-full grid-cols-3 gap-y-[15px] rounded-tr-lg rounded-b-lg border border-[#D9D9D9] bg-white px-[15px] pt-[23px] pb-[54px]"
              style={{ columnGap: 'clamp(8px, 4vw, 21px)' }}
            >
              {filteredBadges.map((badge) => {
                const tierEmojiMap: Record<Badge['tier'], string> = {
                  BRONZE: '🥉',
                  SILVER: '🥈',
                  GOLD: '🥇',
                  TROPHY: '🏆',
                };

                const item = {
                  id: badge.badgeId,
                  key: badge.badgeKey,
                  name: badge.badgeName,
                  description: badge.how,
                  image: {
                    src: `/images/badges/${badge.badgeKey}.svg`,
                    width: 29,
                    height: 43,
                  },
                  category: tierEmojiMap[badge.tier],
                  isLocked: !badge.isReceived,
                };

                return (
                  <CollectionItemCard
                    key={item.id}
                    item={item}
                    isSelected={selectedItem === item.key}
                    onSelect={handleSelect}
                    action={
                      !badge.isReceived && (
                        <button
                          onClick={async (e) => {
                            e.stopPropagation();

                            try {
                              const res = await BadgeRewardByKey(
                                badge.badgeKey,
                              );
                              const { pointAdded, totalPoint, receivedAt } =
                                res.data;

                              // 상태 업데이트
                              setBadges((prev) =>
                                prev.map((b) =>
                                  b.badgeId === badge.badgeId
                                    ? {
                                        ...b,
                                        isReceived: true,
                                        receivedDate: receivedAt,
                                      }
                                    : b,
                                ),
                              );
                              setRewardInfo({
                                badgeName: badge.badgeName,
                                pointAdded,
                              });
                            } catch (error) {
                              alert('보상 수령 실패');
                            }
                          }}
                          className="h-4 min-w-18 rounded-[3px] border border-[#FFB84C] bg-[#FFB84C] text-[8px] font-semibold text-white"
                        >
                          보상 받기
                        </button>
                      )
                    }
                  />
                );
              })}

              {/* 페이지네이션 */}
              <div className="absolute bottom-[13px] left-1/2 -translate-x-1/2">
                <div className="flex items-center justify-center space-x-[11px]">
                  <button className="text-[#222222]">
                    <ChevronLeft className="h-3 w-auto cursor-pointer" />
                  </button>
                  <button className="cursor-pointer text-[10px] font-medium text-gray-700">
                    1
                  </button>
                  <button className="cursor-pointer text-[10px] font-medium text-gray-700">
                    2
                  </button>
                  <button className="flex h-[17px] w-[18px] cursor-pointer items-center justify-center rounded-[3px] bg-[#222222] text-center text-[10px] font-semibold text-white">
                    3
                  </button>
                  <button className="text-[#D9D9D9]">
                    <ChevronRight className="h-3 w-auto" />
                  </button>
                </div>
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
          confirmText="확인"
          onConfirm={() => setRewardInfo(null)} // 모달 닫기
        />
      )}
    </>
  );
}
