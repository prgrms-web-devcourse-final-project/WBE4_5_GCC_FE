'use client';
import { Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import CheckBox from '@/app/components/common/ui/CheckBox';
import { useSignUpStore } from '@/store/SignupStore';

export default function Agreement() {
  const [age, setAge] = useState(false);
  const [terms, setTerms] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [toggleAll, setToggleAll] = useState(false);

  const setIsNextEnabled = useSignUpStore((state) => state.setIsNextEnabled);
  const setWantEmail = useSignUpStore((state) => state.setWantEmail);

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

  useEffect(() => {
    setWantEmail(marketing);
  }, [setWantEmail, marketing]);

  const getCheckColor = (checked: boolean) =>
    checked ? '#222222 dark:text-[var(--dark-gray-700)]' : '#9E9E9E';

  return (
    <>
      {/* 전체 박스 */}
      <div className="mx-auto mt-[50px] w-full max-w-screen-sm cursor-pointer px-5 select-none">
        {/* 모두 동의 */}
        {/* 전체 박스 */}
        <div className="flex flex-col gap-4">
          <div className="border-b-1 border-[#e0e0e0] py-[14px] dark:text-[var(--dark-gray-700)]">
            <CheckBox
              label="모두 동의 (선택 정보 포함)"
              checked={toggleAll}
              onChange={handleToggleAll}
            />
          </div>

          {/* 하위 선택지 4개 */}
          <div className="flex flex-col gap-4">
            <div className="flex gap-1" onClick={() => setAge(() => !age)}>
              <Check size={20} color={getCheckColor(age)} />
              <span className="dark:text-[var(--dark-gray-700)]">
                [필수] 만 14세 이상
              </span>
            </div>
            <div
              className="flex items-center gap-2"
              onClick={() => setTerms((prev) => !prev)}
            >
              <Check size={20} color={getCheckColor(terms)} />
              <span className="dark:text-[var(--dark-gray-700)]">
                [필수] 이용약관 동의
              </span>
            </div>
            <div
              className="flex items-center gap-2"
              onClick={() => setPrivacy((prev) => !prev)}
            >
              <Check size={20} color={getCheckColor(privacy)} />
              <span className="dark:text-[var(--dark-gray-700)]">
                [필수] 개인정보 처리방침 동의
              </span>
            </div>
            <div
              className="flex items-center gap-2"
              onClick={() => setMarketing((prev) => !prev)}
            >
              <Check size={20} color={getCheckColor(marketing)} />
              <span className="dark:text-[var(--dark-gray-700)]">
                [선택] 광고성 정보 수신 및 마케팅 활용 동의
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
