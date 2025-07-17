'use client';

import { Clock4 } from 'lucide-react';
import { useEffect, useState } from 'react';
import Button from '@/app/components/common/ui/Button';
import Input from '@/app/components/common/ui/Input';
import { useFindPwdStore } from '@/store/useFindPwdStore';
import AlertMessage from '@/app/components/common/alert/AlertMessage';

export default function EmailConfirm() {
  const [email, setEmail] = useState('');
  const setIsNextEnabled = useFindPwdStore((state) => state.setIsNextEnabled);
  const [error, setError] = useState<{ email?: string }>({});
  const [showEmailSentAlert, setShowEmailSentAlert] = useState(false);
  const [showCodeAlert, setShowCodeAlert] = useState(false);

  const [emailSent, setEmailSent] = useState(false);

  // 이메일 유효성 확인
  const emailHandler = () => {
    const newError: { email?: string } = {};
    if (!email) {
      newError.email = '이메일을 입력해 주세요.';
    } else if (!email.includes('@')) {
      newError.email = '잘못된 형식의 이메일 주소입니다.';
    }
    setError(newError);
    if (Object.keys(newError).length === 0) {
      setShowEmailSentAlert(true);
      setEmailSent(true);
    }
  };

  // 알림메세지 띄우기
  useEffect(() => {
    if (showEmailSentAlert) {
      const timer = setTimeout(() => {
        setShowEmailSentAlert(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showEmailSentAlert]);

  // 추후 기능작업 시 인증번호 안맞을때 알림추가 필요
  useEffect(() => {
    if (showCodeAlert) {
      const timer = setTimeout(() => {
        setShowCodeAlert(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showCodeAlert]);

  // 인증번호 요청 버튼 활성화 조건
  const isEmailValid = email.length > 0;

  // 입력된 코드
  const [code, setCode] = useState('');
  const isCodeValid = code.length > 0;
  const isValidCode = code.length === 6;
  // 코드가 맞는지 확인
  const [confirm, setConfirm] = useState(false);

  const codeConfirm = () => {
    if (isValidCode) {
      setShowCodeAlert(true);
      setConfirm(true);
    } else {
      alert('인증번호는 6자리여야 합니다');
    }
  };

  useEffect(() => {
    setIsNextEnabled(confirm);
  }, [setIsNextEnabled, confirm]);

  return (
    <>
      {/* 전체 박스 */}
      <div className="relative mx-auto mt-[50px] w-full max-w-screen-sm px-5">
        {showEmailSentAlert && (
          <div className="fixed bottom-[120px] left-0 z-50 flex w-full justify-center">
            <AlertMessage
              type="success"
              message="인증번호가 성공적으로 발송되었습니다."
            />
          </div>
        )}
        {showCodeAlert && (
          <div className="fixed bottom-[120px] left-0 z-50 flex w-full justify-center">
            <AlertMessage type="success" message="인증이 완료되었습니다!" />
          </div>
        )}

        {!emailSent && (
          <div>
            <p>이메일 (아이디)</p>
            <Input
              placeholder="이메일을 입력해 주세요"
              className="mt-[10px]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error.email}
            />

            <Button
              disabled={!isEmailValid}
              className="mt-[14px]"
              onClick={emailHandler}
            >
              인증번호 요청
            </Button>
          </div>
        )}

        {emailSent && (
          <div className="flex flex-col">
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
            {!confirm && (
              <Button
                disabled={!isCodeValid}
                onClick={codeConfirm}
                className="mt-5"
              >
                인증번호 확인
              </Button>
            )}

            {!confirm && (
              <div className="flex justify-end">
                <span className="mt-6 cursor-pointer border-b border-[#9e9e9e] text-sm text-[#9e9e9e]">
                  인증번호 재요청
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
