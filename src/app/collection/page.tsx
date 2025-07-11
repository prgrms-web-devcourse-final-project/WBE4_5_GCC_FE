'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, ListFilter } from 'lucide-react';

import BackHeader from '../components/common/ui/BackHeader';
import CollectionItemCard from '../components/collection/CollectionItem';
import CollectionBottomSheet from '../components/collection/CollectionBottomSheet';

const tabs = ['전체', '🏆', '🥇', '🥈', '🥉'];

// dummy items
const items = [
  {
    id: 1,
    image: {
      src: '/images/bedge/clean1.svg',
      width: 28,
      height: 42,
    },
    name: '먼지털이 초보',
    description: '청소/정리 루틴 첫 수행',
    category: '🥉',
    isLocked: false,
  },
  {
    id: 2,
    image: {
      src: '/images/bedge/clean2.svg',
      width: 29,
      height: 45,
    },
    name: '청소요정',
    description: '청소/정리 루틴 누적 30일 수행',
    category: '🥈',
    isLocked: false,
  },
  {
    id: 3,
    image: {
      src: '/images/bedge/clean3.svg',
      width: 29,
      height: 43,
    },
    name: '청소의 정령 소환사',
    description: '청소/정리 루틴 누적 50일 수행',
    category: '🥇',
    isLocked: false,
  },
  {
    id: 4,
    image: {
      src: '/images/bedge/clean4.svg',
      width: 29,
      height: 47,
    },
    name: '청소의 대마법사',
    description: '청소/정리 루틴 누적 100일 수행',
    category: '🏆',
    isLocked: true,
  },
  {
    id: 5,
    image: {
      src: '/images/bedge/laundry1.svg',
      width: 29,
      height: 43,
    },
    name: '빨래 초보',
    description: '세탁/의류 루틴 첫 수행',
    category: '🥉',
    isLocked: false,
  },
  {
    id: 6,
    image: {
      src: '/images/bedge/laundry2.svg',
      width: 29,
      height: 42,
    },
    name: '양말 요정',
    description: '세탁/의류 루틴 누적 30일 수행',
    category: '🥈',
    isLocked: true,
  },
  {
    id: 7,
    image: {
      src: '/images/bedge/laundry3.svg',
      width: 29,
      height: 43,
    },
    name: '의류 정령 소환사',
    description: '세탁/의류 루틴 누적 50일 수행',
    category: '🥇',
    isLocked: true,
  },
  {
    id: 8,
    image: {
      src: '/images/bedge/laundry4.svg',
      width: 26,
      height: 47,
    },
    name: '패브릭 마스터',
    description: '세탁/의류 루틴 누적 100일 수행',
    category: '🏆',
    isLocked: true,
  },
  {
    id: 9,
    image: {
      src: '/images/bedge/env1.svg',
      width: 29,
      height: 38,
    },
    name: '분리수거 초보',
    description: '쓰레기/환경 루틴 첫 수행',
    category: '🥉',
    isLocked: false,
  },
  {
    id: 10,
    image: {
      src: '/images/bedge/env2.svg',
      width: 29,
      height: 39,
    },
    name: '빨대요정',
    description: '쓰레기/환경 루틴 30일 수행',
    category: '🥈',
    isLocked: false,
  },
  {
    id: 11,
    image: {
      src: '/images/bedge/env3.svg',
      width: 29,
      height: 38,
    },
    name: '지구 힐러',
    description: '쓰레기/환경 루틴 50일 수행',
    category: '🥇',
    isLocked: true,
  },
  {
    id: 12,
    image: {
      src: '/images/bedge/env4.svg',
      width: 29,
      height: 43,
    },
    name: '제로웨이스트 마법사',
    description: '쓰레기/환경 루틴 100일 수행',
    category: '🏆',
    isLocked: true,
  },
];

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('전체');
  const [selectedItem, setSelectedItem] = useState<
    Record<string, number | null>
  >({
    '🥇': null,
    '🥈': null,
    '🥉': null,
    '🏆': null,
  });

  const handleSelect = (item: (typeof items)[number]) => {
    setSelectedItem((prev) => ({
      ...prev,
      [item.category]: prev[item.category] === item.id ? null : item.id,
    }));
  };

  const filteredItem =
    selectedTab === '전체'
      ? items
      : items.filter((item) => item.category === selectedTab);

  return (
    <>
      <div className="flex min-h-screen justify-center overflow-hidden">
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
              {filteredItem.map((item) => (
                <CollectionItemCard
                  key={item.id}
                  item={item}
                  isSelected={selectedItem[item.category] === item.id}
                  onSelect={handleSelect}
                />
              ))}

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
    </>
  );
}
