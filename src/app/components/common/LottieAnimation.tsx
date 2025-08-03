'use client';
import Lottie from 'lottie-react';

interface LottieAnimationProps {
  animationData: object;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
}

export default function LottieAnimation({
  animationData,
  className = 'w-40 h-40',
  loop = true,
  autoplay = true,
}: LottieAnimationProps) {
  return <Lottie animationData={animationData} loop={loop} autoplay={autoplay} className={className} />;
}
