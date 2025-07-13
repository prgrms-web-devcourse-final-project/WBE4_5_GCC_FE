'use client';
import { useState } from 'react';
import ThreeToggle from '../components/routine/ThreeToggle';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import Image from 'next/image';

const dummyData = [
  { name: '월', uv: 180, pv: 50, xyz: 150, abc: 100 },
  { name: '화', uv: 200, pv: 139, xyz: 180, abc: 90 },
  { name: '수', uv: 200, pv: 100, xyz: 100, abc: 120 },
  { name: '목', uv: 228, pv: 190, xyz: 130, abc: 160 },
  { name: '금', uv: 249, pv: 180, xyz: 170, abc: 140 },
  { name: '토', uv: 239, pv: 180, xyz: 190, abc: 150 },
  { name: '일', uv: 300, pv: 130, xyz: 200, abc: 170 },
];

export default function Page() {
  const [selectedIdx, setSelectedIdx] = useState(1);
  return (
    <>
      <div className="mb-5 flex min-h-screen flex-col items-center bg-white px-8 pt-4">
        <ThreeToggle
          selectedIdx={selectedIdx}
          setSelectedIdx={setSelectedIdx}
        />
        <div className="flex w-full max-w-md flex-col">
          <div className="mt-7 flex">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={dummyData}>
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <XAxis dataKey="name" style={{ fontSize: '8px' }} />
                <YAxis style={{ fontSize: '8px' }} width={20} />
                <Tooltip />
                <Legend
                  verticalAlign="top"
                  iconSize={10}
                  wrapperStyle={{
                    fontSize: '10px',
                    marginBottom: '20px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="uv"
                  stroke="#8884d8"
                  name="총 회원"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="pv"
                  stroke="#82ca9d"
                  name="신규회원"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="xyz"
                  stroke="#ff7300"
                  name="방문자"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="abc"
                  stroke="#00c49f"
                  name="이탈자"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-[24px] mb-[30px] flex justify-between rounded-[7px] border border-[#E0E0E0] px-[18px] py-[7px]">
            <div className="flex w-1/2 flex-col border-r border-[#E0E0E0]">
              <span className="my-[4px] text-xs text-[#222]">주간 평균</span>
              <div className="mt-[3px] mb-2 flex justify-between text-[8px] text-[#616161]">
                <div className="flex w-1/2 flex-col space-y-[5px]">
                  <span>
                    총회원수 <b>242</b>
                  </span>
                  <span>
                    신규회원 <b>242</b>
                  </span>
                </div>
                <div className="flex w-1/2 flex-col space-y-[5px]">
                  <span>
                    방문자 <b>242</b>
                  </span>
                  <span>
                    이탈자 <b>242</b>
                  </span>
                </div>
              </div>
            </div>
            <div className="my-[3px] flex w-1/2 flex-col">
              <span className="flex justify-center text-xs text-[#222]">
                이탈자 탈퇴 사유 분석
              </span>
              <span className="mt-auto ml-auto cursor-pointer border-b border-[#9e9e9e] text-[8px] text-[#9E9E9E]">
                더보기
              </span>
            </div>
          </div>
          <div className="space-y-[13px]">
            <div className="flex cursor-pointer rounded-[10px] border border-[#E0E0E0] px-1.5 py-6">
              <div className="ml-2.5 flex flex-col justify-center gap-1.5">
                <span className="text-base text-[#222]">카테고리 관리</span>
                <span className="text-xs text-[#9e9e9e]">
                  루틴에 사용할 카테고리를 생성하거나 수정할 수 있어요
                </span>
              </div>
              <Image
                src="/images/categoryIcon.png"
                alt="카테고리아이콘"
                width={65}
                height={65}
                className="ml-auto"
              />
            </div>
            <div className="flex cursor-pointer rounded-[10px] border border-[#E0E0E0] px-1.5 py-6">
              <Image
                src="/images/reportIcon.png"
                alt="카테고리아이콘"
                width={65}
                height={65}
              />
              <div className="mr-2.5 ml-auto flex flex-col items-end justify-center gap-1.5">
                <span className="text-base text-[#222]">상점 관리</span>
                <span className="text-xs text-[#9e9e9e]">
                  상점에 진열할 아이템을 추가하거나 수정할 수 있어요
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
