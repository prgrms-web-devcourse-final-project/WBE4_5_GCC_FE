import React from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  success?: string;
  icon?: React.ReactNode;
}

export default function Input({
  error,
  success,
  className = '',
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      <div className="relative">
        <input
          className={twMerge(
            'block h-12 w-full rounded-lg border border-[var(--gray-300)] p-4 text-sm focus:outline-none dark:bg-[var(--dark-bg-tertiary)] dark:text-[var(--dark-white)]',
            className,
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="dark:text-[var( --dark-red: #ff5c5c; )] mt-2.5 ml-1.5 text-[12px] text-[#D32F2F]">
          {error}
        </p>
      )}
      {success && (
        <p className="mt-2.5 ml-1.5 text-[12px] text-[#388E3C] dark:text-[var(--dark-green)]">
          {success}
        </p>
      )}
    </div>
  );
}
