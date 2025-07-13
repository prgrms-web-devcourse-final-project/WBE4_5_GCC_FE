import { ReactNode } from 'react';

export default function DatePickerWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="absolute z-50 mt-2 w-72 rounded-[10px] bg-[#F4F4F4] p-2">
      {children}
    </div>
  );
}
