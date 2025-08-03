import { useState } from 'react';
import BottomSheet from '../common/ui/BottomSheet';
import Input from '../common/ui/Input';
import Button from '../common/ui/Button';

const options = ['눈 뜨자마자', '출근길에', '8:00', '자기 전 체크', '아무때나'];
interface WhenSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (value: string) => void;
}

export default function WhenSelector({
  isOpen,
  onClose,
  onSubmit,
}: WhenSelectorProps) {
  const [selectedIdx, setSelectedIdx] = useState('');
  const [value, setValue] = useState('');

  const handleClick = (option: string) => {
    setSelectedIdx(option);
    setValue(option);
    setTimeout(() => {
      setSelectedIdx('');
      onSubmit(option);
      onClose();
    }, 200);
  };
  return (
    <>
      <BottomSheet
        className="max-h-[360px] max-w-[614px] w-full px-6 py-10"
        isOpen={isOpen}
        setIsOpen={onClose}
      >
        <div className="flex items-center justify-start gap-3 mb-6">
          <h2 className="text-xl font-semibold">✅</h2>
          <h2 className="text-lg font-semibold text-black dark:text-[var(--dark-gray-700)]">언제 할래요?</h2>
        </div>
        <Input
          className="my-5 px-4 py-3 text-base dark:text-[var(--dark-gray-700)]"
          placeholder="ex) 양치하자마자, 식사 직후, 씻고 난 후"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="mb-14 flex flex-wrap gap-4">
          {options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleClick(option)}
              className={`flex h-[36px] cursor-pointer items-center justify-center rounded-[50px] border border-[#E0E0E0] px-5 py-2 text-sm font-medium transition-colors duration-200 dark:text-[var(--dark-gray-700)] ${selectedIdx === option ? 'text-[#C4C4C4]' : ''
                }`}
            >
              {option}
            </button>
          ))}
        </div>
        <Button className="text-lg py-3" onClick={() => handleClick(value)}>
          확인
        </Button>
      </BottomSheet>
    </>
  );
}
