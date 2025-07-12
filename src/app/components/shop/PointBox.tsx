import Image from 'next/image';
import coin from '/public/coin.svg';

export default function PointBox({
  width,
  height,
  className,
  coinWidth,
  coinHeight,
}: {
  width: number;
  height: number;
  className?: string;
  coinWidth: number;
  coinHeight: number;
}) {
  return (
    <>
      <div
        className={`flex items-center justify-between rounded-[6px] border-1 border-[#cfcfcf] px-2 py-1 ${className}`}
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
        <span className="text-3 text-[#FFB84C]">100</span>
      </div>
    </>
  );
}
