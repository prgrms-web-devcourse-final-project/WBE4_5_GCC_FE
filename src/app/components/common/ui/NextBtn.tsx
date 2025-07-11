export default function NextBtn({
  label,
  className,
  disabled,
  onClick,
}: {
  label: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <>
      <button
        className={`fixed bottom-0 flex h-[88px] w-full justify-center pt-[18px] text-[#FDFDFD] ${
          className ?? ''
        }`}
        onClick={!disabled ? onClick : undefined}
      >
        {label}
      </button>
    </>
  );
}
