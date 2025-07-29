'use client';

import Image from 'next/image';

type Props = {
  aiComment: string;
};

export default function AiAnalysis({ aiComment }: Props) {
  const hasComment = aiComment?.trim().length > 0;

  return (
    <div className="bg-white px-5 py-8 mb-3 gap-3 text-center flex flex-col items-center">
      {!hasComment ? (
        <>
          <Image src="/images/waiting.png" alt="분석 대기" width={100} height={100} />
          <p className="font-semibold mt-3 text-[#222]">
            이번 주 리포트는 아직 안 나왔어요<br />그동안 루틴 열심히 쌓아봐요! 👏
          </p>
        </>
      ) : (
        <>
          <Image src="/images/cheer.png" alt="분석 완료" width={100} height={100} />
          <p className="font-semibold mt-3 text-[#222]">
            이번 주, 정말 잘 해냈어요!<br />다음 주도 이 흐름을 이어가봐요 🙌
          </p>
        </>
      )}
    </div>
  );
}
