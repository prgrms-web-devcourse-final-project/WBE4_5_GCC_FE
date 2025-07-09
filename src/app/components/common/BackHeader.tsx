import Image from 'next/image';
import backBtn from '/public/BackPageBtn.svg';
import { useRouter } from 'next/navigation';

export default function BackBtn({ title }: { title: string }) {
  const router = useRouter();
  return (
    <>
      <div className="h-[56px] flex items-center justify-center relative w-[100%]">
        <Image
          src={backBtn}
          alt="뒤로가기"
          className="absolute left-3 w-[24px] h-[24px] "
          onClick={() => router.back()}
        />
        <p className="font-semibold">{title}</p>
      </div>
    </>
  );
}
