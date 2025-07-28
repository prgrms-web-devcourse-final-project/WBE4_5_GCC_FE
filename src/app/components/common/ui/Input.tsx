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
            'block h-12 w-full rounded-lg border border-[#E0E0E0] p-4 text-sm focus:outline-none',
            className,
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-2.5 ml-1.5 text-[12px] text-[#D32F2F]">{error}</p>
      )}
      {success && (
        <p className="mt-2.5 ml-1.5 text-[12px] text-[#388E3C]">{success}</p>
      )}
    </div>
  );
}
