import React from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  icon?: React.ReactNode;
}

export default function Input({
  error,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      <div className="relative">
        <input
          className={twMerge(
            "block w-full h-12 p-4 rounded-lg text-sm border border-[#E0E0E0] focus:outline-none",
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-2.5 ml-1.5 text-[12px] text-[#D32F2F]">
          {error}
        </p>
      )}
    </div>
  );
}
