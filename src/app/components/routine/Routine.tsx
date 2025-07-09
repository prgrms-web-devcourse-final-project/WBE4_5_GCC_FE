import { ChevronRight, CircleCheck, Star } from "lucide-react";
import YellowCheckIcon from "./YellowCheckIcon";

export default function Routine({
  title,
  Icon,
  category,
  subCategory,
  time,
  isImportant,
  isCompleted,
}: {
  title: string;
  Icon: string;
  category: string;
  subCategory?: string;
  time?: string;
  isImportant?: boolean;
  isCompleted?: boolean;
}) {
  return (
    <div
      className={`
        flex w-full items-center justify-between px-3 py-4 
        border cursor-pointer
        ${isCompleted ? "border-[#FFB84C]" : "border-[#9E9E9E]"} 
        rounded-[8px] bg-white`}
    >
      {isCompleted ? (
        <YellowCheckIcon />
      ) : (
        <CircleCheck className="mr-4 w-[30px] h-[30px] text-[#C4C4C4]" />
      )}

      <div className="flex w-full flex-col space-y-1">
        <div className="flex items-center">
          <p className="text-sm">{title}</p>
          {isImportant && (
            <Star className="ml-1.5 h-4 w-4 fill-[#FFB84C] text-[#FFB84C]" />
          )}
          <div className="ml-auto flex gap-1 text-[10px]">
            {time && (
              <>
                <span>⏰</span>
                <span className="ml-1">{time}</span>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-[#9E9E9E]">
          <span>{Icon}</span>
          <span>{category}</span>
          {subCategory && (
            <>
              <ChevronRight className="h-3 w-[9px]" />
              <span>{subCategory}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
