import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
}

export default function Button({
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={twMerge(
        'inline-flex h-[48px] w-full cursor-pointer items-center justify-center rounded-lg bg-[#222222] text-sm font-medium text-white focus:outline-none',
        'disabled:cursor-default disabled:bg-[#C4C4C4]',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
