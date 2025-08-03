import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import character from '/public/images/mainCharacter.png';
import bg from '/public/profileBg2.png';
import bg2 from '/public/profileBg.png';
import Image from 'next/image';
import logo from '/public/logo.png';

export default function Second() {
  const router = useRouter();

  const goNext = () => {
    router.push('/login');
  };

  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 100); // 첫 렌더 후 실행
  }, []);

  return (
    <>
      <div className="flex flex-col items-center px-10">
        {/* 상단 텍스트 */}
        <div className="mb-[10px] flex flex-col items-center pt-[60px] text-[20px] select-none">
          <Image src={logo} alt="로고" className="mb-5 w-[168px]" />
          <h2
            className={`transition-all duration-700 ease-out ${show ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}
          >
            Routie와 함께,
          </h2>
          <h1
            className={`font-bold transition-all delay-800 duration-700 ease-out ${show ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}
          >
            당신의 <span className="text-[#FFB84C]">첫 퀘스트</span>가
            시작됩니다.
          </h1>
        </div>
        <div
          className={`w-full max-w-[390px] px-[28px] pt-[45px] transition-all delay-1200 duration-700 ease-out select-none ${show ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}
        >
          <div className="relative mb-10">
            <Image src={bg} alt="배경" className="w-full rounded-[10px]" />
            <Image
              src={character}
              alt="캐릭터"
              className="absolute top-[135px] left-1/2 w-[120px] -translate-x-1/2 -translate-y-1/2"
            />
          </div>
          <div className="relative mb-22">
            <Image src={bg2} alt="배경" className="w-full rounded-[10px]" />
            <Image
              src={character}
              alt="캐릭터"
              className="absolute top-[135px] left-1/2 w-[120px] -translate-x-1/2 -translate-y-1/2"
            />
          </div>
        </div>
        <button
          className="flex h-[50px] w-[320px] cursor-pointer items-center justify-center rounded-[10px] bg-[#FFB84C] text-[16px] text-white transition-all duration-100 ease-in hover:bg-[#b89868] sm:min-w-[390px]"
          onClick={goNext}
        >
          시작하기
        </button>
      </div>
    </>
  );
}
