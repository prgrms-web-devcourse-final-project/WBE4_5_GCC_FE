import { twMerge } from 'tailwind-merge';
export default function ProgressBar({
  currentStep,
  totalSteps,
  wrapperClassName,
  barClassName,
  per,
}: {
  currentStep: number;
  totalSteps: number;
  wrapperClassName?: string;
  barClassName?: string;
  per?: string;
}) {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div
      className={twMerge(
        'relative mb-12 h-2 w-full overflow-hidden rounded-full bg-gray-200',
        wrapperClassName,
      )}
    >
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold text-[#616161] text-lg">{per}</span>
      <div
        className={twMerge(
          'h-full bg-[#222222] transition-all duration-300 dark:bg-[var(--dark-gray-200)]',
          barClassName,
        )}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
}
