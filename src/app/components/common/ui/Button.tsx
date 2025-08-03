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
        'inline-flex h-[48px] w-full max-w-xl cursor-pointer items-center justify-center rounded-lg bg-[#ffb84c] text-base font-medium text-white focus:outline-none dark:text-[var(--dark-bg-primary)]',
        'disabled:cursor-default disabled:bg-[#c4c4c4] mx-auto',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
