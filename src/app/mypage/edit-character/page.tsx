'use client'

import clsx from 'clsx';
import Image from "next/image";
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import item1 from "@/app/assets/images/item1.png";
import Button from "@/app/components/common/Button";
import character from "../../../../public/images/character.png"

const tabs = ['전체', '상의', '하의', '액세서리'];

// dummy items
const items = [
  {id:1, image: item1, name: '인형탈', description: '누군가 닮았어요.', category: '상의'},
  {id:2, image: item1, name: '인형탈', description: '누군가 닮았어요.', category: '상의'},
  {id:3, image: item1, name: '인형탈', description: '누군가 닮았어요.', category: '상의'},
  {id:4, image: item1, name: '인형탈', description: '누군가 닮았어요.', category: '하의'},
  {id:5, image: item1, name: '인형탈', description: '누군가 닮았어요.', category: '액세서리'},
  {id:6, image: item1, name: '인형탈', description: '누군가 닮았어요.', category: '액세서리'},
]

export default function page () {
  const [selectedTab, setSelectedTab] = useState('전체');
  const [selectedItem, setSelectedItem] = useState<Record<string, number | null>>({
    '상의': null,
    '하의': null,
    '액세서리': null,
  });

  const handleSelect = (item: typeof items[number]) => {
    setSelectedItem((prev) => ({
      ...prev,
      [item.category]: prev[item.category] === item.id ? null : item.id,
    }));
  };
  
  const filteredItem = selectedTab === '전체' ? items : items.filter((item) => item.category === selectedTab);

  return (
    <div className="flex min-h-screen flex-col p-5">
      <div className="min-w-[350px] h-[178px] flex items-center border border-[#D9D9D9] mb-[29px] justify-center rounded-lg">
        <Image
          src={character}
          alt="기본 캐릭터"
          height={100}
          priority
          className="w-auto my-auto m-2"
        />
      </div>

      <div className="min-w-[350px] min-h-[340px] mb-[22px]">
        {/* 탭 버튼 */}
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={clsx(
                'min-w-[70px] h-[30px] px-4 py-2 rounded-t-md text-xs font-semibold cursor-pointer',
                selectedTab === tab ? 'bg-[#FFB84C] text-white border-1 border-[#FFB84C]' : 'bg-white text-[#AAAAAA] border border-[#D9D9D9] border-b-0'
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 아이템 카드 리스트 */}
        <div className="bg-white relative min-w-[350px] min-h-[340px] px-[15px] pt-[23px] pb-[54px] border border-[#D9D9D9] rounded-tr-lg rounded-b-lg grid grid-cols-3 gap-x-[21px] gap-y-[15px]">
          {filteredItem.map((item) => {
            const isSelected = selectedItem[item.category] === item.id;

            return (
              <div
                key={item.id}
                className={clsx(
                  'min-w-[92px] h-[123px] px-auto py-[7px] border rounded-[5px] text-center',
                  isSelected ? 'border-[#FFB84C]' : 'border-[#D9D9D9]'
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
                  className="h-auto mx-auto mt-[3px] mb-2"
                />
                <div className="px-[9px] pt-[6px] text-left border-t-[0.5px] border-[#E0E0E0]">
                  <div className="font-medium text-[8px]">{item.name}</div>
                  <div className="font-medium text-[7px] text-[#616161]">{item.description}</div>
                </div>
                <button
                  onClick={() => handleSelect(item)} 
                  className={clsx(
                    'min-w-18 min-h-4 rounded-[3px] text-[8px] border border-[#E0E0E0]',
                    isSelected 
                    ? 'bg-[#FFB84C] text-white border-[#FFB84C] font-semibold'
                    : 'bg-white border-[#E0E0E0] text-[#616161]'
                  )}
                >
                  {isSelected ? '착용 중' : '착용하기'}
                </button>
              </div>
            );
          })}

          {/* 페이지네이션 */}
          <div className="absolute bottom-[13px] left-1/2 -translate-x-1/2">
            <div className="flex justify-center items-center space-x-[11px]">
              <button className="text-[#222222]">
                <ChevronLeft className="w-auto h-3"/>
              </button>
              <button className="text-gray-700 font-medium text-[10px]">1</button>
              <button className="text-gray-700 font-medium text-[10px]">2</button>
              <button className="flex items-center justify-center w-[18px] h-[17px] text-center bg-[#222222] text-white font-semibold text-[10px] rounded-[3px]">3</button>
              <button className="text-[#D9D9D9]">
                <ChevronRight className="w-auto h-3"/>
              </button>
            </div>
          </div>
        </div>
      </div>

      <Button
        className="h-[48px] bg-[#222222] text-sm font-medium text-white"
        onClick={() => console.log("저장")}
        >
          저장
      </Button>
    </div>
  );
}