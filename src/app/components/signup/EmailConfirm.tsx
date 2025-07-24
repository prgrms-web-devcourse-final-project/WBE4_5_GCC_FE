'use client';

import { Clock4 } from 'lucide-react';
import { useSignUpStore } from '@/store/SignupStore';
import { useEffect, useState } from 'react';
import Button from '../common/ui/Button';
import Input from '../common/ui/Input';
import { sendVerificationEmail, verifyEmailCode } from '@/api/auth';

export default function EmailConfirm() {
  const email = useSignUpStore((state) => state.email);
  const setIsNextEnabled = useSignUpStore((state) => state.setIsNextEnabled);

  const [emailSent, setEmailSent] = useState(false);
  const emailHandler = async () => {
    try {
      await sendVerificationEmail(email);
      alert('인증번호가 전송되었습니다'); // 토스트 메시지로 변경
      console.log('📩 이메일 인증 API 호출 완료');
      setEmailSent(true);
    } catch (error) {
      setEmailSent(false);
      console.log('인증번호 전송되지 않음:', error);
    }
  };

  // 입력된 코드
  const [code, setCode] = useState('');

  const isValidCode = code.length === 6;
  // 코드가 맞는지 확인
  const [confirm, setConfirm] = useState(false);

  const codeConfirm = async () => {
    try {
      await verifyEmailCode(email, code);
      alert('인증되었습니다');
      console.log('인증 성공');
      setConfirm(true);
    } catch (error) {
      setConfirm(false);
      console.log('인증 실패:', error);
    }
  };

  useEffect(() => {
    setIsNextEnabled(confirm);
  }, [setIsNextEnabled, confirm]);

  return (
    <>
      {/* 전체 박스 */}
      <div className="mx-auto mt-[50px] w-full max-w-screen-sm px-5">
        {!emailSent && (
          <div>
            <p>이메일 (아이디)</p>
            <div className="mt-[10px] mb-[14px] flex h-[48px] w-full items-center rounded-[8px] border border-[#e0e0e0] p-[15px] text-[#9E9E9E]">
              {email}
            </div>
            <Button onClick={emailHandler}>인증번호 요청</Button>
          </div>
        )}

        {emailSent && (
          <div>
            <p className="mb-6 text-[20px] font-semibold">
              이메일 인증을 완료해주세요
            </p>
            <div className="relative flex items-center">
              <Input
                placeholder="인증번호를 입력해주세요"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />

              <span className="absolute right-5 flex items-center gap-1.5 text-xs font-semibold text-[#D32F2F]">
                <Clock4 size={16} color="#9e9e9e" />
                3:00
              </span>
            </div>
            <div className="flex flex-col gap-6">
              {!confirm && (
                <Button
                  disabled={!isValidCode}
                  onClick={codeConfirm}
                  className="mt-5"
                >
                  인증번호 확인
                </Button>
              )}

              {!confirm && (
                <div className="flex justify-end">
                  <span className="mt-6 cursor-pointer border-b border-[#9e9e9e] text-[#9e9e9e]">
                    인증번호 재요청
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
