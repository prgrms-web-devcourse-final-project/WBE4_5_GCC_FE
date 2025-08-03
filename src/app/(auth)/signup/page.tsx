'use client';
import Agreement from '@/app/components/signup/Agreement';
import Category from '@/app/components/signup/Category';
import EmailConfirm from '@/app/components/signup/EmailConfirm';
import Experience from '@/app/components/signup/Experience';
import Nickname from '@/app/components/signup/Nickname';
import UserAdress from '@/app/components/signup/UserAdress';
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
      StepComponent = <Agreement />;
      break;
    case 3:
      StepComponent = <EmailConfirm />;
      break;
    case 4:
      StepComponent = <Nickname />;
      break;
    case 5:
      StepComponent = <UserAdress />;
      break;
    case 6:
      StepComponent = <Experience />;
      break;
    case 7:
      StepComponent = <Category />;
      break;
    default:
      StepComponent = <UserInfo />;
  }

  return (
    <>
      <div className="min-h-screen bg-white">{StepComponent}</div>
    </>
  );
}
