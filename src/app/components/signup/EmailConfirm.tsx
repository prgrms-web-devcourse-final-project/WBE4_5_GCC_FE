'use client';

import { Clock4 } from 'lucide-react';
import { useSignUpStore } from '@/store/SignupStore';
import { useEffect, useState } from 'react';
import Button from '../common/ui/Button';
import Input from '../common/ui/Input';
import { sendVerificationEmail, verifyEmailCode } from '@/api/auth';
import AlertMessage from '@/app/components/common/alert/AlertMessage';

export default function EmailConfirm() {
  const email = useSignUpStore((state) => state.email);
  const setIsNextEnabled = useSignUpStore((state) => state.setIsNextEnabled);

  const [showEmailSentAlert, setShowEmailSentAlert] = useState(false);
  const [showCodeAlert, setShowCodeAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const [emailSent, setEmailSent] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);
  const [timerActive, setTimerActive] = useState(false);

  const emailHandler = async () => {
    try {
      await sendVerificationEmail(email);
      setEmailSent(true);
      setShowEmailSentAlert(true);
      setTimeLeft(180);
      setTimerActive(true);
      setConfirm(false);
    } catch (error) {
      setEmailSent(false);
      console.error('❌ 인증번호 전송 실패:', error);
    }
  };

  // 입력된 코드
  const [code, setCode] = useState('');

  const isValidCode = code.length === 5;
  // 코드가 맞는지 확인
  const [confirm, setConfirm] = useState(false);

  const codeConfirm = async () => {
    try {
      await verifyEmailCode(email, code);
      setConfirm(true);
      setShowCodeAlert(true);
      setTimerActive(false);
    } catch (error) {
      setShowErrorAlert(true);
      setConfirm(false);
      console.error('❌ 이메일 인증 실패:', error);
    }
  };

  // 타이머 작동
  useEffect(() => {
    if (!timerActive) return;

    if (timeLeft <= 0) {
      setTimerActive(false);
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, timerActive]);

  // 다음 버튼 활성화 상태 연동
  useEffect(() => {
    setIsNextEnabled(confirm);
  }, [setIsNextEnabled, confirm]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // 알림 setTimeout
  useEffect(() => {
    if (showEmailSentAlert) {
      const timer = setTimeout(() => setShowEmailSentAlert(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showEmailSentAlert]);

  useEffect(() => {
    if (showCodeAlert) {
      const timer = setTimeout(() => setShowCodeAlert(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showCodeAlert]);

  useEffect(() => {
    if (showErrorAlert) {
      const timer = setTimeout(() => setShowErrorAlert(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showErrorAlert]);

  return (
    <>
      {/* 전체 박스 */}
      <div className="mx-auto mt-[50px] w-full max-w-screen-sm px-5">
        {showEmailSentAlert && (
          <div className="fixed bottom-[120px] left-0 z-50 flex w-full justify-center">
            <AlertMessage type="success" message="인증번호가 성공적으로 발송되었습니다." />
          </div>
        )}
        {showCodeAlert && (
          <div className="fixed bottom-[120px] left-0 z-50 flex w-full justify-center">
            <AlertMessage type="success" message="인증이 완료되었습니다!" />
          </div>
        )}
        {showErrorAlert && (
          <div className="fixed bottom-[120px] left-0 z-50 flex w-full justify-center">
            <AlertMessage type="error" message="인증번호가 올바르지 않습니다." />
          </div>
        )}
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
                {timerActive ? formatTime(timeLeft) : null}
              </span>
            </div>
            <div className="flex flex-col gap-6">
              {!confirm && (
                <Button
                  onClick={timerActive ? codeConfirm : emailHandler}
                  disabled={timerActive ? !isValidCode : false}
                  className="mt-5"
                >
                  {timerActive ? '인증번호 확인' : '인증번호 재요청'}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}