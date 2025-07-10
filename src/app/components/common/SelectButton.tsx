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
        className={`flex h-[43px] items-center justify-center rounded-[50px] border px-[15px] py-[13px] text-[14px] transition-colors ${className ?? ''}`}
      >
        {text}
      </button>
    </>
  );
}
