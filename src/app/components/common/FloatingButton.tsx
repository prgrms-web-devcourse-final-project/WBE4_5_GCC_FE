import Image from 'next/image';

export default function FloatingButton({
  src,
  alt,
  className,
  text,
  onClick,
  textSize,
  // imgWidth,
  // imgHeight,
}: {
  src: string;
  alt: string;
  className?: string;
  text: string;
  onClick?: () => void;
  textSize: string;
  // imgWidth: number;
  // imgHeight: number;
}) {
  return (
    <>
      <div
        className={`flex flex-col items-center justify-center ${className ?? ''}`}
      >
        <div
          className="mb-1 flex h-11 w-11 items-center justify-center rounded-full border-[0.5px] border-[#b3b3b3] bg-white"
          onClick={onClick}
        >
          <Image
            src={src}
            alt={alt}
            className="block translate-y-[3px] cursor-pointer"
            // width={imgWidth}
            // height={imgHeight}
          />
        </div>
        <span className={`font-semibold text-[${textSize}]`}>{text}</span>
      </div>
    </>
  );
}
