import Image from 'next/image';
import coin from '/public/coin.svg';

export default function PointBox({
  width,
  height,
  className,
  coinWidth,
  coinHeight,
  point,
}: {
  width: number;
  height: number;
  className?: string;
  coinWidth: number;
  coinHeight: number;
  point: number | null;
}) {
  return (
    <>
      <div
        className={`flex items-center justify-between rounded-[6px] border-1 border-[#cfcfcf] py-1 pr-[10px] pl-1 ${className}`}
        style={{
          width: `${width}px`,
          height: `${height}px`,
        }}
      >
        {/* className="h-3 w-3" */}
        <Image
          src={coin}
          alt="coin"
          style={{
            width: `${coinWidth}px`,
            height: `${coinHeight}px`,
          }}
        />
        <span className="text-[12px] text-[var(--primary-yellow)]">
          {point}
        </span>
      </div>
    </>
  );
}
