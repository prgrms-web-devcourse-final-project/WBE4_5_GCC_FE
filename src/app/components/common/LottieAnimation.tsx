'use client';

import Lottie from 'lottie-react';
import successAnimation from '@/assets/lottie/Success.json';

interface LottieAnimationProps {
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
}

export default function LottieAnimation({
  className = 'w-40 h-40',
  loop = true,
  autoplay = true,
}: LottieAnimationProps) {
  return (
    <div className={className}>
      <Lottie
        animationData={successAnimation}
        loop={loop}
        autoplay={autoplay}
      />
    </div>
  );
}
