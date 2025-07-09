export default function SelectButton({
  onClick,
  className,
  text,
}: {
  key: number;
  onClick: () => void;
  className?: string;
  text: string;
}) {
  return (
    <>
      <button
        onClick={onClick}
        className={`flex items-center justify-center 
        h-[43px] px-[15px] py-[13px] rounded-[50px] border 
        text-[17px] transition-colors ${className ?? ''}`}
      >
        {text}
      </button>
    </>
  );
}
