export default function CollectionCardSkeleton() {
  return (
    <div className="flex h-45 w-[160px] animate-pulse flex-col items-center justify-center rounded-[5px] bg-[#F5F5F5]">
      <div className="h-21 w-full rounded-t-sm bg-[#E0E0E0]" />
      <div className="h-1 w-full border border-white" />
      <div className="h-22 w-full rounded-b-sm bg-[#E0E0E0]" />
    </div>
  );
}
