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
        className="max-h-[660px] max-w-[614px] w-full px-5 py-8"
      >
        <div className="mb-6 flex items-center justify-start gap-3 text-xl font-semibold text-black dark:text-[var(--dark-gray-700)]">
          <h2>♾️</h2>
          <h2>반복주기</h2>
        </div>
        <div className="mx-auto flex flex-col">
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
