'use client';

import { useState } from 'react';

interface Props {
  onCloseAction: () => void;
  onSaveAction: (name: string) => void;
}

export default function AddPresetBottomSheet({
  onCloseAction,
  onSaveAction,
}: Props) {
  const [name, setName] = useState('');

  const handleSave = () => {
    if (!name.trim()) return;
    onSaveAction(name);
    setName('');
    onCloseAction();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[var(--black)] dark:bg-[var(--dark-gray-200)]/50"
      onClick={onCloseAction}
    >
      <div
        className="w-full rounded-t-[24px] bg-[var(--white)] px-4 pt-8 pb-16 dark:bg-[var(--dark-bg-primary)]"
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫힘 방지
      >
        <h2 className="mb-4 text-lg font-semibold text-black">
          루틴 프리셋 추가
        </h2>
        <input
          type="text"
          placeholder="루틴 이름을 입력하세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-4 w-full rounded-lg border border-gray-300 px-3 py-2"
        />
        <button
          onClick={handleSave}
          className="w-full rounded-lg bg-[var(--primary-yellow)] py-3 font-medium text-white dark:text-[var(--dark-bg-primary)]"
        >
          저장
        </button>
      </div>
    </div>
  );
}
