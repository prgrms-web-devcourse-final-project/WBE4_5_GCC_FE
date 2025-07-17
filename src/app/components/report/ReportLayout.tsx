'use client';

import { ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ReportLayoutProps {
  children: ReactNode;
  title: string;
  months: string[];
  selectedIndex: number;
  onChange: (index: number) => void;
}

export default function ReportLayout({
  children,
  title,
  months,
  selectedIndex,
  onChange,
}: ReportLayoutProps) {
  return (
    <section className="w-full max-w-5xl mx-auto px-5">
      <div className="flex items-center justify-between mb-7">
        <button
          onClick={() => onChange(selectedIndex - 1)}
          disabled={selectedIndex === 0}
          className={`px-3 ${selectedIndex === 0
            ? 'text-[#c4c4c4] cursor-not-allowed'
            : 'text-[#222222] hover:bg-[#fbfbfb]'
            }`}
          aria-label="이전 달"
        >
          <ChevronLeft size={20} />
        </button>

        <h3 className="text-lg font-bold text-[#222222]">
          {title}
        </h3>

        <button
          onClick={() => onChange(selectedIndex + 1)}
          disabled={selectedIndex === months.length - 1}
          className={`px-3 ${selectedIndex === months.length - 1
            ? 'text-[#c4c4c4] cursor-not-allowed'
            : 'text-[#222222] hover:bg-[#fbfbfb]'
            }`}
          aria-label="다음 달"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {children}

      <div className="mt-10 text-center text-sm text-[#616161]">
        이번 달은 루틴 수행률이 아주 훌륭해요! <br />
        다음 달도 꾸준히 챌린지해봐요 💪
      </div>
    </section>
  );
}