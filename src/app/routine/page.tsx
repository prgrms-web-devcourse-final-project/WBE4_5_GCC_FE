"use client";
import CalendarBar from "../components/routine/CalendarBar";
import Routine from "../components/routine/Routine";
import { Plus } from "lucide-react";
import ProgressBar from "../components/common/PrgressBar";

export default function Page() {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center bg-white py-4">
        <CalendarBar />
        <div className="flex flex-col items-center justify-center w-full max-w-md py-11 px-5 border-t-10 border-b-1 border-t-[#FBFBFB] border-b-[#CCCCCC]">
          <div className="flex flex-col justify-start w-full mb-6 space-y-4.5">
            <span className="text-xl font-semibold">2025년 7월 9일</span>
            <ProgressBar currentStep={1} totalSteps={5}
            per="20%" wrapperClassName="h-6 bg-[#FFB84C]/25 mb-0" barClassName="h-6 bg-[#FFB84C] rounded-full text-white text-xs flex items-center justify-center"/>
          </div>
          <div className="flex flex-col w-full space-y-3">
            <Routine title="미지근한 물 한 잔 마시기" Icon="🏃🏻" category="건강" time="13:00" isImportant isCompleted/>
            <Routine title="빨래 돌리기" Icon="🧺" category="세탁 / 의류" subCategory="잠옷" time="13:00"/>
            <Routine title="도시락 싸기" Icon="🍳" category="요리" subCategory="회사 점심" time="13:00" isImportant/>
            <Routine title="쓰레기 분리수거" Icon="♻️" category="쓰레기 / 환경" time="13:00"/>
            <Routine title="저녁 조깅" Icon="🏃🏻" category="건강" subCategory=" 유산소 운동" time="13:00"/>
          </div>
          <button
            className="fixed bottom-15 right-0 flex w-[60px] h-[60px] items-center justify-center mr-5 bg-[#222222] rounded-full cursor-pointer shadow-lg hover:bg-[#333333] transition-colors duration-300">
            <Plus className="w-[30px] h-[30px] text-white"/>
          </button>
        </div>
      </div>
    </>
  );
}
