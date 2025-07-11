'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import Input from '@/app/components/common/ui/Input';
import Button from '@/app/components/common/ui/Button';
import Dropdown from '@/app/components/common/ui/Dropdown';

export default function page () {
  //const nickname = useProfileStore((state) => state.name); 나중에 store에서 받아오는 형식
  const myNickname = '한상아';
  const myAddress = '서울시 마포구 연남동';

  const [bio, setBio] = useState('');
  const [address, setAddress] = useState(myAddress);
  const [history, setHistory] = useState(myNickname);
  const [nickname, setNickname] = useState(myNickname);

  const [selected, setSelected] = useState('');
  const yearOptions = ['1년 미만', '1~3년', '3~5년', '5~10년', '10년 이상'];

  return (
    <div className="h-1vh flex flex-col gap-6 px-5 py-7">
      {/* 닉네임 */}
      <div className="flex flex-col gap-2.5">
        <p className="text-sm font-semibold">닉네임</p>
        <div className="flex gap-2.5">
          <Input
            value={nickname}
            onChange={(e) => setNickname (e.target.value)}
            placeholder="2~15자 이내로 입력해 주세요"
          />
          <Button className="max-w-[93px] min-h-12 p-0 bg-[#C4C4C4] rounded-lg">
            <h1 className="font-medium text-sm text-[#FDFDFD]">중복 확인</h1>
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
            onChange={(e) => setAddress (e.target.value)}
            placeholder=""
          />
          <Button className="max-w-[93px] min-h-12 flex gap-[6px] bg-[#222222] rounded-lg">
            <Search className="w-4 h-auto" strokeWidth={2}/>
            <h1 className="font-medium text-sm text-white">주소 검색</h1>
          </Button>
        </div>
      </div>

      {/* 자취경력 */}
      <div className="w-full flex flex-col gap-2.5">
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

      <div className="fixed bottom-[70px] left-5 right-5">
        <Button 
          type='submit' 
          //disabled={!isSubmitEnabled}
          //onClick={handleSubmit}
        >
          저장하기
        </Button>
      </div>

    </div>
  );
}