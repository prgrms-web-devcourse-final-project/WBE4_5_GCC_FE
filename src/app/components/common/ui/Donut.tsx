export default function Donut({
  width,
  height,
  percent,
  className,
}: {
  width: number;
  height: number;
  percent: number;
  className?: string;
}) {
  return (
    <div
      className={`relative rounded-full ${className}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        background: `conic-gradient(#FFB84C 0% ${percent}%, #e5e7eb ${percent}% 100%)`,
      }}
    >
      <div
        className="absolute flex items-center justify-center rounded-full bg-white text-[10px] font-semibold dark:bg-[var(--dark-bg-primary)] dark:text-[var(--dark-gray-700)]"
        style={{
          top: '15%',
          left: '15%',
          width: '70%',
          height: '70%',
        }}
      >
        {percent}%
      </div>
    </div>
  );
}
