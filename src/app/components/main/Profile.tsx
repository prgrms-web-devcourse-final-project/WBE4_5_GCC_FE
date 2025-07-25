import Image from 'next/image';
import backGround from '/public/profileBackGround.svg';
import character from '/public/images/character.png';
import coin from '/public/coin.svg';
export default function Profile() {
  return (
    <div className="relative h-[167px] w-[350px] overflow-hidden rounded-md">
      {/* 배경 이미지 */}
      <Image src={backGround} alt="bg" fill className="object-cover" priority />

      {/* 캐릭터 이미지 */}
      <div className="absolute z-10 flex gap-[22px] p-[22px]">
        <Image
          src={character}
          alt="character"
          width={80} // 정확한 가로값 지정
          height={125} // div에 맞춤
        />
        <div>
          <div className="z-20 mb-[7px] text-[10px] font-medium text-[#616161]">
            청소의 정령 소환사
          </div>
          <div className="mb-1 text-[18px] font-bold">한상아</div>
          <div className="mb-[14px] text-[14px] font-medium">
            자취는 어렵다..
          </div>
          <div className="relative flex h-[21px] w-[53px] items-center gap-1 rounded bg-[#222222] px-2 opacity-70">
            <Image src={coin} alt="coin" className="h-[11px] w-[11px]" />
            <span className="text-[12px] text-[#FFB84C]">100</span>
          </div>
        </div>
      </div>
    </div>
  );
}
