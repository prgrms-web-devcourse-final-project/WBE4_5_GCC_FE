'use client';
import check from '/public/check.svg';
import checkGray from '/public/checkGray.svg';
import CheckBox from '@/app/components/common/CheckBox';
import NextBtn from '@/app/components/common/NextBtn';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Step3() {
  const router = useRouter();
  const [age, setAge] = useState(false);
  const [terms, setTerms] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [toggleAll, setToggleAll] = useState(false);

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

  return (
    <>
      {/* 전체 박스 */}
      <div className="px-5 mt-[50px] max-w-screen-sm mx-auto w-full select-none">
        {/* 모두 동의 */}
        {/* 전체 박스 */}
        <div className="flex flex-col gap-4">
          <div className="py-[14px] border-b-1 border-[#E0E0E0]">
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
                className="w-[20px] h-[20px]"
              />
              <span>[필수] 만 14세 이상</span>
            </div>
            <div className="flex gap-1" onClick={() => setTerms(() => !terms)}>
              <Image
                src={terms ? check : checkGray}
                alt="terms"
                className="w-[20px] h-[20px]"
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
                className="w-[20px] h-[20px]"
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
                className="w-[20px] h-[20px]"
              />
              <span>[선택] 광고성 정보 수신 및 마케팅 활용 동의</span>
            </div>
          </div>
        </div>
      </div>
      <NextBtn
        label="다음"
        disabled={!goNext}
        className={` ${goNext ? 'bg-[#222222]' : 'bg-[#c4c4c4]'}`}
        onClick={() => router.push('/signup/step4')}
      />
    </>
  );
}
