'use client';
import { useState } from 'react';
import BottomSheet from '../common/ui/BottomSheet';
import Input from '../common/ui/Input';

const options = ['눈 뜨자마자', '출근길에', '8:00', '자기 전 체크', '아무때나'];

// 언제할래요 바텀시트
export default function WhenSelector() {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedIdx, setSelectedIdx] = useState('');
  const [value, setValue] = useState('');

  const handleClick = (option: string) => {
    setSelectedIdx(option);
    setValue(option);
    setTimeout(() => {
      setSelectedIdx('');
    }, 200);
  };
  return (
    <>
      <BottomSheet
        className="max-h-[333px] px-5 py-8"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <div className="flex items-center justify-start gap-2">
          <h2 className="text-lg font-semibold">✅</h2>
          <h2 className="text-base font-semibold text-black">언제 할래요?</h2>
        </div>
        <Input
          className="my-[18px] px-3"
          placeholder="ex) 양치하자마자, 식사 직후, 씻고 난 후"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="mb-11 flex flex-wrap gap-2.5">
          {options.map((option) => (
            <button
              onClick={() => handleClick(option)}
              className={`flex h-[30px] cursor-pointer items-center justify-center rounded-[50px] border border-[#E0E0E0] px-3.5 py-2 text-xs transition-colors duration-200 ${selectedIdx === option ? 'text-[#C4C4C4]' : ''}`}
            >
              {option}
            </button>
          ))}
        </div>
      </BottomSheet>
    </>
  );
}
