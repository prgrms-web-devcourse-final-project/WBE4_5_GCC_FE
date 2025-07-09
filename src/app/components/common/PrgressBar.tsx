export default function ProgressBar({
  currentStep,
  totalSteps,
}: {
  currentStep: number;
  totalSteps: number;
}) {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full h-2 mb-12 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-[#222222] transition-all duration-300"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
