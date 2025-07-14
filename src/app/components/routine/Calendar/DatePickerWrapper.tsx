import { ReactNode } from 'react';

export default function DatePickerWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="absolute right-0 z-50 mt-2 w-72 max-w-[calc(100vw-1rem)] rounded-[10px] bg-[#F4F4F4] p-2">
      {children}
    </div>
  );
}
