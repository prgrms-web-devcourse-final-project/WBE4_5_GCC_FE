'use client';

import Image from 'next/image';

type Props = {
  aiComment: string;
};

export default function AiAnalysis({ aiComment }: Props) {
  const hasComment = aiComment?.trim().length > 0;

  return (
    <div className="mb-3 flex flex-col items-center gap-3 bg-[var(--white)] px-5 py-8 text-center dark:bg-[var(--dark-bg-primary)]">
      {!hasComment ? (
        <>
          <Image
            src="/images/waiting.png"
            alt="분석 대기"
            width={100}
            height={100}
          />
          <p className="mt-3 font-semibold text-[var(--black)] dark:text-[var(--dark-gray-700)]">
            이번 주 리포트는 아직 안 나왔어요
            <br />
            그동안 루틴 열심히 쌓아봐요! 👏
          </p>
        </>
      ) : (
        <>
          <Image
            src="/images/cheer.png"
            alt="분석 완료"
            width={100}
            height={100}
          />
          <p className="mt-3 font-semibold whitespace-pre-line text-[var(--black)] dark:text-[var(--dark-gray-700)]">
            {aiComment}
          </p>
        </>
      )}
    </div>
  );
}
