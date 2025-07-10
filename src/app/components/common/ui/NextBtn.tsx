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
        className={`flex justify-center pt-[18px] w-full h-[88px] mt-auto text-[#FDFDFD] ${
          className ?? ''
        }`}
        onClick={!disabled ? onClick : undefined}
      >
        {label}
      </button>
    </>
  );
}
