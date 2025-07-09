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
      <div
        className={`flex justify-center items-center w-full h-[88px] mt-auto text-[#FDFDFD] ${
          className ?? ''
        }`}
        onClick={!disabled ? onClick : undefined}
      >
        {label}
      </div>
    </>
  );
}
