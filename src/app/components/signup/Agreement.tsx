'use client';
import check from '/public/check.svg';
import checkGray from '/public/checkGray.svg';
import CheckBox from '@/app/components/common/CheckBox';
import { useSignUpStore } from '@/store/SignupStore';

import Image from 'next/image';

import { useEffect, useState } from 'react';

export default function Agreement() {
  const [age, setAge] = useState(false);
  const [terms, setTerms] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [toggleAll, setToggleAll] = useState(false);
  const setIsNextEnabled = useSignUpStore((state) => state.setIsNextEnabled);
  const handleToggleAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setToggleAll(isChecked);
    setAge(isChecked);
    setTerms(isChecked);
    setPrivacy(isChecked);
    setMarketing(isChecked);
  };

  const goNext = age && terms && privacy;

  useEffect(() => {
    const allChecked = age && terms && privacy && marketing;
    setToggleAll(allChecked);
  }, [age, terms, privacy, marketing]);

  useEffect(() => {
    setIsNextEnabled(goNext);
  }, [setIsNextEnabled, goNext]);
  return (
    <>
      {/* 전체 박스 */}
      <div className="mx-auto mt-[50px] w-full max-w-screen-sm px-5 select-none">
        {/* 모두 동의 */}
        {/* 전체 박스 */}
        <div className="flex flex-col gap-4">
          <div className="border-b-1 border-[#E0E0E0] py-[14px]">
            <CheckBox
              label="모두 동의 (선택 정보 포함)"
              checked={toggleAll}
              onChange={handleToggleAll}
            />
          </div>

          {/* 하위 선택지 4개 */}
          <div className="flex flex-col gap-4">
            <div className="flex gap-1" onClick={() => setAge(() => !age)}>
              <Image
                src={age ? check : checkGray}
                alt="age"
                className="h-[20px] w-[20px]"
              />
              <span>[필수] 만 14세 이상</span>
            </div>
            <div className="flex gap-1" onClick={() => setTerms(() => !terms)}>
              <Image
                src={terms ? check : checkGray}
                alt="terms"
                className="h-[20px] w-[20px]"
              />
              <span>[필수] 이용약관 동의</span>
            </div>
            <div
              className="flex gap-1"
              onClick={() => setPrivacy(() => !privacy)}
            >
              <Image
                src={privacy ? check : checkGray}
                alt="privacy"
                className="h-[20px] w-[20px]"
              />
              <span>[필수] 개인정보 처리방침 동의</span>
            </div>
            <div
              className="flex gap-1"
              onClick={() => setMarketing(() => !marketing)}
            >
              <Image
                src={marketing ? check : checkGray}
                alt="marketing"
                className="h-[20px] w-[20px]"
              />
              <span>[선택] 광고성 정보 수신 및 마케팅 활용 동의</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
