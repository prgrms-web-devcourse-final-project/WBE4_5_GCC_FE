interface Props {
  onEdit: () => void;
  onDelete: () => void;
  children: React.ReactNode;
}

export default function RoutineSwipeWrapper({
  onEdit,
  onDelete,
  children,
}: Props) {
  const trailingActions = (
    <TrailingActions>
      <SwipeAction onClick={onEdit}>
        <div className="flex h-full shrink-0 items-center justify-center rounded-[8px] border bg-yellow-400 px-4 text-sm text-white">
          수정
        </div>
      </SwipeAction>
      <SwipeAction destructive={true} onClick={onDelete}>
        <div className="flex h-full shrink-0 items-center justify-center rounded-[8px] border bg-red-500 px-4 text-sm text-white">
          삭제
        </div>
      </SwipeAction>
    </TrailingActions>
  );
  return (
    <>
      <SwipeableListItem trailingActions={trailingActions} className="mb-3">
        {children}
      </SwipeableListItem>
    </>
  );
}
