import { twMerge } from "tailwind-merge";
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
  per?:string;
}) {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div className={twMerge(
        "w-full h-2 mb-12 bg-gray-200 rounded-full overflow-hidden",
        wrapperClassName
      )}>
      <div
        className={twMerge(
          "h-full bg-[#222222] transition-all duration-300",
          barClassName
        )}
        style={{ width: `${percentage}%` }}
      >{per}</div>
    </div>
  );
}
