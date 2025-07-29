import LoadingSpinner from '../../common/ui/LoadingSpinner';

interface Preset {
  presetId: number;
  categoryId: number;
  majorCategory: string;
  subCategory: string;
  name: string;
  triggerTime: string;
  isDone: boolean;
  isImportant: boolean;
}
interface AdmitPresetProps {
  presets: Preset[];
  onClick: () => void;
  isLoading: boolean;
}

export default function PresetList({
  presets,
  onClick,
  isLoading,
}: AdmitPresetProps) {
  return (
    <>
      {/* {isLoading && (
        <div className="mt-30 flex flex-col items-center justify-center gap-8">
          <LoadingSpinner />
          <span className="text-[16px] font-semibold">
            루틴 프리셋을 불러오는 중입니다...
          </span>
        </div>
      )}
      {!isLoading && (
        <div className="mt-7 flex flex-col gap-[14px]">
          {presets.map((preset, idx) => (
            <div
              key={idx}
              className="flex h-11 w-full cursor-pointer items-center justify-center rounded-[8px] border border-[#e0e0e0] text-[14px] font-medium"
              onClick={onClick}
            >
              {preset.name}
            </div>
          ))}
        </div>
      )} */}
    </>
  );
}
