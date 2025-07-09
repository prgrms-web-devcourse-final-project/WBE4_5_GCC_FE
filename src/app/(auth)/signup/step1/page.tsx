'use client';
import Image from 'next/image';
import check from '/public/check.svg';
import checkGray from '/public/checkGray.svg';
import showBtn from '/public/showBtn.svg';
import ProgressBar from '@/app/components/common/PrgressBar';
import NextBtn from '@/app/components/common/NextBtn';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSignUpStore } from '@/store/SignupStore';

export default function SignUp() {
  const router = useRouter();

  const signUpStore = useSignUpStore();
  const {
    name,
    email,
    password,
    checkPassword,
    setName,
    setEmail,
    setPassword,
    setCheckPassword,
  } = signUpStore;

  // 비밀번호 유효성 검사
  // const [password, setPassword] = useState('');
  // 영문 대소문자
  const hasLowerUpper = /[a-z]/.test(password) && /[A-Z]/.test(password);
  // 숫자 포함
  const hasNumber = /[0-9]/.test(password);
  // 특수문자 포함
  const hasSpecial = /[#@]/.test(password);
  // 8자리 이상
  const hasMinLength = password.length >= 8;

  // 조건이 맞는지 확인
  const checkConditionImage = (condition: boolean) => {
    return condition ? check : checkGray;
  };
  const checkConditionText = (condition: boolean) => {
    return condition ? 'text-[#222222] ' : 'text-[#9E9E9E] ';
  };

  // 비밀번호 확인
  // const [checkPassword, setCheckPassword] = useState('');

  // 비밀번호 텍스트로 변경
  const [showPassword, setShowPassword] = useState(false);
  const [showCheckPassword, setShowCheckPassword] = useState(false);
  // 눌렀을 때
  const PasswordPressStart = () => setShowPassword(true);
  const checkPasswordPressStart = () => setShowCheckPassword(true);
  // 뗐을 때
  const PasswordPressEnd = () => setShowPassword(false);
  const checkPasswordPressEnd = () => setShowCheckPassword(false);

  // 다음 버튼 활성화 조건
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  const isPasswordOkay =
    hasLowerUpper && hasNumber && hasSpecial && hasMinLength;
  const goNext =
    name.trim() !== '' &&
    email.trim() !== '' &&
    isPasswordOkay &&
    password === checkPassword;
  return (
    <>
      {/* 전체 박스 */}
      <div className="px-5 mt-[50px] max-w-screen-sm mx-auto w-full">
        {/* 진행률 바 */}
        <ProgressBar currentStep={1} totalSteps={6} />

        {/* 이름 */}
        <div className="mb-[34px]">
          <p className="mb-[10px] font-semibold text-[16px]">이름</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className=" w-full h-[50px] p-[15px] rounded-xl border border-[#E0E0E0]"
            placeholder="이름을 입력해 주세요"
          />
        </div>
        {/* 이메일 */}
        <div className="mb-[34px]">
          <p className="mb-[10px] font-semibold text-[16px]">이메일(아이디)</p>
          <div className="flex">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 mr-[15px] h-[50px] p-[15px] rounded-xl border border-[#E0E0E0]"
              placeholder="이메일을 입력해주세요"
            />
            <button className="w-[75px] h-[50px] rounded-[8px] bg-black text-white text-[14px]">
              중복 확인
            </button>
          </div>
        </div>
        {/* 비밀번호 */}
        <div className="mb-[34px]">
          <p className="mb-[10px] font-semibold text-[16px]">비밀번호</p>

          <div className="flex items-center relative w-full h-[50px]">
            <input
              type={showPassword ? 'text' : 'password'}
              className=" w-full h-full p-[15px] pr-[50px] rounded-xl border border-[#E0E0E0]"
              placeholder="비밀번호를 입력해주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Image
              src={showBtn}
              alt="비밀번호 보기 버튼"
              width={20}
              height={20}
              className="absolute right-5"
              onMouseDown={PasswordPressStart} // PC
              onMouseUp={PasswordPressEnd} // PC
              onMouseLeave={PasswordPressEnd} // PC
              onTouchStart={PasswordPressStart} // 모바일
              onTouchEnd={PasswordPressEnd} // 모바일
            />
          </div>
          {/* 비밀번호 확인 체크 */}
          <div className="mt-[10px] text-[12px]">
            <div className="flex gap-9">
              <div className="flex w-[160px] gap-[6px] items-center">
                <Image src={checkConditionImage(hasLowerUpper)} alt="check" />
                <span className={checkConditionText(hasLowerUpper)}>
                  영문 대소문자 최소 1개 포함
                </span>
              </div>
              <div className="flex w-[160px] gap-[6px] items-center">
                <Image src={checkConditionImage(hasNumber)} alt="check" />
                <span className={checkConditionText(hasNumber)}>숫자 포함</span>
              </div>
            </div>
            <div className="flex gap-9">
              <div className="flex w-[160px] gap-[6px] items-center">
                <Image src={checkConditionImage(hasMinLength)} alt="check" />
                <span className={checkConditionText(hasMinLength)}>
                  8자리 이상
                </span>
              </div>
              <div className="flex w-[160px] gap-[6px] items-center">
                <Image src={checkConditionImage(hasSpecial)} alt="check" />
                <span className={checkConditionText(hasSpecial)}>
                  특수 문자 (#,@) 포함
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* 비밀번호 확인 */}
        <div className="mb-[34px]">
          <p className="mb-[10px] font-semibold text-[16px]">비밀번호 확인</p>

          <div className="flex items-center relative w-full h-[50px]">
            <input
              type={showCheckPassword ? 'text' : 'password'}
              value={checkPassword}
              className=" w-full h-full p-[15px] pr-[50px] rounded-xl border border-[#E0E0E0]"
              placeholder="비밀번호를 한번 더 입력해주세요"
              onChange={(e) => setCheckPassword(e.target.value)}
            />

            <Image
              src={showBtn}
              alt="비밀번호 보기 버튼"
              width={20}
              height={20}
              className="absolute right-5"
              onMouseDown={checkPasswordPressStart} // PC
              onMouseUp={checkPasswordPressEnd} // PC
              onMouseLeave={checkPasswordPressEnd} // PC
              onTouchStart={checkPasswordPressStart} // 모바일
              onTouchEnd={checkPasswordPressEnd} // 모바일
            />
          </div>
        </div>
      </div>
      <NextBtn
        label="다음"
        disabled={!goNext}
        className={`${goNext ? 'bg-[#222222]' : 'bg-[#c4c4c4]'}`}
        onClick={() => router.push('/signup/step2')}
      />
    </>
  );
}
