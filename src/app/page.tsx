'use client';

import { useOnBoardingStore } from '@/store/onBoarding';
import First from './components/onBoarding/First';
import Second from './components/onBoarding/Second';
import Third from './components/onBoarding/Third';
import Fourth from './components/onBoarding/Fourth';
import Fifth from './components/onBoarding/Fifth';

export default function OnBoarding() {
  const step = useOnBoardingStore((state) => state.step);
  let StepComponent = null;
  switch (step) {
    case 1:
      StepComponent = <First />;
      break;
    case 2:
      StepComponent = <Second />;
      break;
    case 3:
      StepComponent = <Third />;
      break;
    case 4:
      StepComponent = <Fourth />;
      break;
    case 5:
      StepComponent = <Fifth />;
      break;
    default:
      StepComponent = <First />;
  }
  return (
    <>
      <div>{StepComponent}</div>
    </>
  );
}
