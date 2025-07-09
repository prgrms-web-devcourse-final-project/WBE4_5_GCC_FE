'use client';

import { useSignUpStore } from '@/store/SignupStore';
import clock from '/public/clock.svg';
import Image from 'next/image';

export default function Step2() {
  const signUpStore = useSignUpStore();
  const { email } = signUpStore;
  return (
    <>
      {/* 전체 박스 */}
      <div className="px-5 mt-[50px] max-w-screen-sm mx-auto w-full">
        <div>
          <p>이메일 (아이디)</p>
          <div className="flex mt-[10px] mb-[14px] w-full h-[48px] p-[15px] rounded-[8px] text-[#9E9E9E] items-center border border-[#e0e0e0]">
            {email}
          </div>
          <button className="flex justify-center items-center w-[100%] h-[48px] bg-[#222222] rounded-[8px] text-[white] font-medium text-[14px] ">
            인증번호 요청
          </button>
        </div>
        {/* 인증번호 요청 부분 */}
        <div>
          <p className="font-semibold mb-6 text-[20px]">
            이메일 인증을 완료해주세요
          </p>
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="인증번호를 입력해주세요"
              className=" flex mt-[10px] mb-[14px] w-full h-[48px] p-[15px] pr-20 rounded-[8px] text-[#9E9E9E] items-center border border-[#e0e0e0]"
            />
            <span className="absolute flex items-center gap-[6px] right-5">
              <Image src={clock} alt="clock" className=" w-4 h-4" />
              3:00
            </span>
          </div>
          <button className="flex justify-center items-center w-[100%] h-[48px] bg-[#222222] rounded-[8px] text-[white] font-medium text-[14px] ">
            인증번호 확인
          </button>
          <span className="py-1 border-b-1 border-[#9e9e9e] text-[#9e9e9e]  cursor-pointer">
            인증번호 재요청
          </span>
        </div>
      </div>
    </>
  );
}
