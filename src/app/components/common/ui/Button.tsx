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
        'inline-flex h-[48px] w-full max-w-xl cursor-pointer items-center justify-center rounded-lg bg-[var(--primary-yellow)] text-sm font-medium text-white focus:outline-none dark:text-[var(--dark-bg-primary)]',
        'disabled:cursor-default disabled:bg-[var(--gray-400)]',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
