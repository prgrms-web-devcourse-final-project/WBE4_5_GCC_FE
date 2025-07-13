'use client';

import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Input from '@/app/components/common/ui/Input';
import Button from '@/app/components/common/ui/Button';
import Dropdown from '@/app/components/common/ui/Dropdown';

export default function Page() {
  //const nickname = useProfileStore((state) => state.name); 나중에 store에서 받아오는 형식

  const searchParams = useSearchParams();
  const searchedAddress = searchParams.get('address');

  const router = useRouter();
  const [bio, setBio] = useState('');
  const [nickname, setNickname] = useState('한상아');
  const [history, setHistory] = useState('');
  const [address, setAddress] = useState('서울시 마포구 연남동');

  const [selected, setSelected] = useState('');
  const yearOptions = ['1년 미만', '1~3년', '3~5년', '5~10년', '10년 이상'];

  const handleSearch = () => {
    router.push('/mypage/change-userinfo/userinfo/address');
  };

  useEffect(() => {
    if (searchedAddress) {
      setAddress(searchedAddress);
    }
  }, [searchedAddress]);

  return (
    <div className="h-1vh flex flex-col gap-6 px-5 py-7">
      {/* 닉네임 */}
      <div className="flex flex-col gap-2.5">
        <p className="text-sm font-semibold">닉네임</p>
        <div className="flex gap-2.5">
          <Input
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="2~15자 이내로 입력해 주세요"
          />
          <Button className="min-h-12 max-w-[93px] rounded-lg bg-[#C4C4C4] p-0">
            <h1 className="text-sm font-medium text-[#FDFDFD]">중복 확인</h1>
          </Button>
        </div>
      </div>

      {/* 한줄소개 */}
      <div className="flex flex-col gap-2.5">
        <p className="text-sm font-semibold">한 줄 소개</p>
        <Input
          placeholder="나만의 자취 철학을 한 줄로 표현해보세요."
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </div>

      {/* 주소 */}
      <div className="flex flex-col gap-2.5">
        <p className="text-sm font-semibold">주소</p>
        <div className="flex gap-2.5">
          <Input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder=""
          />
          <Button
            className="flex min-h-12 max-w-[93px] gap-[6px] rounded-lg bg-[#222222]"
            onClick={handleSearch}
          >
            <Search className="h-auto w-4" strokeWidth={2} />
            <h1 className="text-sm font-medium text-white">주소 검색</h1>
          </Button>
        </div>
      </div>

      {/* 자취경력 */}
      <div className="flex w-full flex-col gap-2.5">
        <p className="text-sm font-semibold">자취경력</p>
        <Dropdown
          options={yearOptions}
          selected={selected}
          onSelect={(value) => {
            setSelected(value);
            setHistory(value);
          }}
        />
      </div>

      <div className="fixed right-5 bottom-[70px] left-5">
        <Button
          type="submit"
          //disabled={!isSubmitEnabled}
          //onClick={handleSubmit}
        >
          저장하기
        </Button>
      </div>
    </div>
  );
}
