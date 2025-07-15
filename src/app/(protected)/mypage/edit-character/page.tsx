'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import item1 from '@/app/assets/images/item1.png';

import character from '../../../../public/images/character.png';
import Button from '@/app/components/common/ui/Button';

const tabs = ['전체', '상의', '하의', '액세서리'];

// dummy items
const items = [
  {
    id: 1,
    image: item1,
    name: '인형탈',
    description: '누군가 닮았어요.',
    category: '상의',
  },
  {
    id: 2,
    image: item1,
    name: '인형탈',
    description: '누군가 닮았어요.',
    category: '상의',
  },
  {
    id: 3,
    image: item1,
    name: '인형탈',
    description: '누군가 닮았어요.',
    category: '상의',
  },
  {
    id: 4,
    image: item1,
    name: '인형탈',
    description: '누군가 닮았어요.',
    category: '하의',
  },
  {
    id: 5,
    image: item1,
    name: '인형탈',
    description: '누군가 닮았어요.',
    category: '액세서리',
  },
  {
    id: 6,
    image: item1,
    name: '인형탈',
    description: '누군가 닮았어요.',
    category: '액세서리',
  },
];

export default function Page() {
  const [selectedTab, setSelectedTab] = useState('전체');
  const [selectedItem, setSelectedItem] = useState<
    Record<string, number | null>
  >({
    상의: null,
    하의: null,
    액세서리: null,
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
    <div className="flex h-1vh flex-col p-5">
      <div className="mb-[29px] flex h-[178px] min-w-[350px] items-center justify-center rounded-lg border border-[#D9D9D9]">
        <Image
          src={character}
          alt="기본 캐릭터"
          height={100}
          priority
          className="m-2 my-auto w-auto"
        />
      </div>

      <div className="mb-[22px] min-h-[340px] min-w-[350px]">
        {/* 탭 버튼 */}
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={clsx(
                'h-[30px] min-w-[70px] cursor-pointer rounded-t-md px-4 py-2 text-xs font-semibold',
                selectedTab === tab
                  ? 'border-1 border-[#FFB84C] bg-[#FFB84C] text-white'
                  : 'border border-b-0 border-[#D9D9D9] bg-white text-[#AAAAAA]',
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 아이템 카드 리스트 */}
        <div className="relative grid min-h-[340px] min-w-[350px] grid-cols-3 gap-x-[21px] gap-y-[15px] rounded-tr-lg rounded-b-lg border border-[#D9D9D9] bg-white px-[15px] pt-[23px] pb-[54px]">
          {filteredItem.map((item) => {
            const isSelected = selectedItem[item.category] === item.id;

            return (
              <div
                key={item.id}
                className={clsx(
                  'px-auto h-[123px] min-w-[92px] rounded-[5px] border py-[7px] text-center',
                  isSelected ? 'border-[#FFB84C]' : 'border-[#D9D9D9]',
                )}
                style={{
                  boxShadow: '1px 2px 3px 0 rgba(0, 0, 0, 0.15)',
                }}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={50}
                  priority
                  className="mx-auto mt-[3px] mb-2 h-auto"
                />
                <div className="border-t-[0.5px] border-[#E0E0E0] px-[9px] pt-[6px] text-left">
                  <div className="text-[8px] font-medium">{item.name}</div>
                  <div className="text-[7px] font-medium text-[#616161]">
                    {item.description}
                  </div>
                </div>
                <button
                  onClick={() => handleSelect(item)}
                  className={clsx(
                    'min-h-4 min-w-18 rounded-[3px] border border-[#E0E0E0] text-[8px]',
                    isSelected
                      ? 'border-[#FFB84C] bg-[#FFB84C] font-semibold text-white'
                      : 'border-[#E0E0E0] bg-white text-[#616161]',
                  )}
                >
                  {isSelected ? '착용 중' : '착용하기'}
                </button>
              </div>
            );
          })}

          {/* 페이지네이션 */}
          <div className="absolute bottom-[13px] left-1/2 -translate-x-1/2">
            <div className="flex items-center justify-center space-x-[11px]">
              <button className="text-[#222222]">
                <ChevronLeft className="h-3 w-auto" />
              </button>
              <button className="text-[10px] font-medium text-gray-700">
                1
              </button>
              <button className="text-[10px] font-medium text-gray-700">
                2
              </button>
              <button className="flex h-[17px] w-[18px] items-center justify-center rounded-[3px] bg-[#222222] text-center text-[10px] font-semibold text-white">
                3
              </button>
              <button className="text-[#D9D9D9]">
                <ChevronRight className="h-3 w-auto" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <Button
        className="h-[48px] bg-[#222222] text-sm font-medium text-white"
        onClick={() => console.log('저장')}
      >
        저장
      </Button>
    </div>
  );
}
