'use client';
import Agreement from '@/app/components/signup/Agreement';
import Category from '@/app/components/signup/Category';
import EmailConfirm from '@/app/components/signup/EmailConfirm';
import History from '@/app/components/signup/History';
import Nickname from '@/app/components/signup/Nickname';
import UserInfo from '@/app/components/signup/UserInfo';
import { useSignUpStore } from '@/store/SignupStore';

export default function SignUp() {
  const step = useSignUpStore((state) => state.step);

  let StepComponent = null;

  switch (step) {
    case 1:
      StepComponent = <UserInfo />;
      break;
    case 2:
      StepComponent = <EmailConfirm />;
      break;
    case 3:
      StepComponent = <Agreement />;
      break;
    case 4:
      StepComponent = <Nickname />;
      break;
    case 5:
      StepComponent = <History />;
      break;
    case 6:
      StepComponent = <Category />;
      break;
    default:
      StepComponent = <UserInfo />;
  }

  return <>{StepComponent}</>;
}
