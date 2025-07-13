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
        className="absolute rounded-full bg-white"
        style={{
          top: '25%',
          left: '25%',
          width: '50%',
          height: '50%',
        }}
      ></div>
    </div>
  );
}
