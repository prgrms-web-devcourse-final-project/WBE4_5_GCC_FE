'use client';

import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { Clock4 } from 'lucide-react';
import { useFindPwdStore } from '@/store/useFindPwdStore';
import { sendVerificationEmail, verifyEmailCode } from '@/api/auth';
import Button from '@/app/components/common/ui/Button';
import Input from '@/app/components/common/ui/Input';
import AlertMessage from '@/app/components/common/alert/AlertMessage';

export default function EmailConfirm() {
  const setIsNextEnabled = useFindPwdStore((state) => state.setIsNextEnabled);

  const [email, setEmail] = useState('');
  const [showEmailSentAlert, setShowEmailSentAlert] = useState(false);
  const [showCodeAlert, setShowCodeAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showInvalidEmailAlert, setShowInvalidEmailAlert] = useState(false);
  const [showEmailNotExistAlert, setShowEmailNotExistAlert] = useState(false);

  const [emailSent, setEmailSent] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);
  const [timerActive, setTimerActive] = useState(false);

  const [code, setCode] = useState('');
  const isValidCode = code.length === 5;
  const [confirm, setConfirm] = useState(false);

  // 이메일 형식 체크 정규식
  const isValidEmailFormat = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const emailHandler = async () => {
    if (!isValidEmailFormat(email)) {
      setShowInvalidEmailAlert(true);
      setIsNextEnabled(false);
      return;
    }

    try {
      await sendVerificationEmail(email);
      setEmailSent(true);
      setShowEmailSentAlert(true);
      setTimeLeft(180);
      setTimerActive(true);
      setConfirm(false);
      setIsNextEnabled(false);
    } catch (error) {
      const axiosError = error as AxiosError<{ code: string; message: string; data: null }>;

      if (axiosError.response?.data?.code === '4000') {
        setShowEmailNotExistAlert(true);
      } else {
        setShowErrorAlert(true);
      }

      setEmailSent(false);
      setIsNextEnabled(false);
      console.error('❌ 인증번호 전송 실패:', axiosError);
    }
  };

  const codeConfirm = async () => {
    try {
      await verifyEmailCode(email, code);
      setConfirm(true);
      setShowCodeAlert(true);
      setTimerActive(false);
      setIsNextEnabled(true);
    } catch (error) {
      setShowErrorAlert(true);
      setConfirm(false);
      setIsNextEnabled(false);
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

  useEffect(() => {
    if (showInvalidEmailAlert) {
      const timer = setTimeout(() => setShowInvalidEmailAlert(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showInvalidEmailAlert]);

  useEffect(() => {
    if (showEmailNotExistAlert) {
      const timer = setTimeout(() => setShowEmailNotExistAlert(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showEmailNotExistAlert]);

  return (
    <>
      <div className="mx-auto mt-[50px] w-full max-w-screen-sm px-5">
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
        {showErrorAlert && (
          <div className="fixed bottom-[120px] left-0 z-50 flex w-full justify-center">
            <AlertMessage type="error" message="인증번호가 올바르지 않습니다." />
          </div>
        )}
        {showInvalidEmailAlert && (
          <div className="fixed bottom-[120px] left-0 z-50 flex w-full justify-center">
            <AlertMessage type="error" message="올바르지 않은 이메일 형식입니다." />
          </div>
        )}
        {showEmailNotExistAlert && (
          <div className="fixed bottom-[120px] left-0 z-50 flex w-full justify-center">
            <AlertMessage type="error" message="해당 이메일로 가입된 계정이 없습니다." />
          </div>
        )}

        {!emailSent && (
          <div>
            <p className="mb-6 text-[20px] font-semibold">
              가입하신 이메일(아이디)를 입력해 주세요
            </p>
            <div className="relative flex items-center">
              <Input
                placeholder="이메일을 입력해 주세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button
              onClick={emailHandler}
              disabled={!email}
              className="mt-5"
            >
              인증번호 요청
            </Button>
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