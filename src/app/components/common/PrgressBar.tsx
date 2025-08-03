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
        'mb-12 h-2 w-full overflow-hidden rounded-full bg-gray-200',
        wrapperClassName,
      )}
    >
      <div
        className={twMerge(
          'flex h-full items-center justify-center bg-[#222222] transition-all duration-300 dark:bg-[var(--dark-gray-200)]',
          barClassName,
        )}
        style={{ width: `${percentage}%` }}
      >
        {per}
      </div>
    </div>
  );
}
