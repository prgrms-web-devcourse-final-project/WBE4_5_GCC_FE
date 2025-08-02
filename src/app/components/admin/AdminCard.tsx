'use client';
import Image from 'next/image';

interface AdminCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageClassName?: string;
  onClick: () => void;
}

export default function AdminCard({
  title,
  description,
  imageSrc,
  imageClassName,
  onClick,
}: AdminCardProps) {
  return (
    <div
      className="flex max-h-[140px] cursor-pointer flex-col rounded-[10px] border border-[var(--gray-300)] px-1.5 pt-4"
      onClick={onClick}
    >
      <div className="ml-2.5 flex flex-col justify-center gap-1.5">
        <span className="text-xs text-[var(--black)] dark:text-[var(--dark-gray-700)]">
          {title}
        </span>
        <span className="text-[8px] text-[var(--gray-500)]">{description}</span>
      </div>

      <Image
        src={imageSrc}
        alt="관리 아이콘"
        width={65}
        height={65}
        className={`mb-2 ml-auto ${imageClassName}`}
      />
    </div>
  );
}
