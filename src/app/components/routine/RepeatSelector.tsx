import { useState } from 'react';
import BottomSheet from '../common/ui/BottomSheet';

import ThreeToggle from './ThreeToggle';
import Weekly from './repeatType/Weekly';
import Daily from './repeatType/Daily';
import Monthly from './repeatType/Monthly';

interface RepeatSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (cycle: {
    daily?: string;
    days?: string;
    week?: string;
    month?: string;
  }) => void;
}

export default function RepeatSelector({
  isOpen,
  onClose,
  onSubmit,
}: RepeatSelectorProps) {
  const [selectedIdx, setSelectedIdx] = useState(1);

  return (
    <>
      <BottomSheet
        setIsOpen={onClose}
        isOpen={isOpen}
        className="max-h-[588px] px-5 py-8"
      >
        <div className="mb-4.5 flex items-center justify-start gap-2">
          <h2 className="text-xl font-semibold">♾️</h2>
          <h2 className="text-base font-semibold text-black">반복주기</h2>
        </div>
        <div className="flex flex-col">
          <ThreeToggle
            selectedIdx={selectedIdx}
            setSelectedIdx={setSelectedIdx}
          />
          {selectedIdx === 0 && <Daily onSubmit={onSubmit} onClose={onClose} />}
          {selectedIdx === 1 && (
            <Weekly onSubmit={onSubmit} onClose={onClose} />
          )}
          {selectedIdx === 2 && (
            <Monthly onSubmit={onSubmit} onClose={onClose} />
          )}
        </div>
      </BottomSheet>
    </>
  );
}
