import React from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
}

export default function Button({
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={twMerge(
        "inline-flex items-center justify-center h-[48px] w-full rounded-lg text-sm font-medium text-white bg-[#222222] cursor-pointer focus:outline-none", "disabled:bg-[#C4C4C4] disabled:cursor-default",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
