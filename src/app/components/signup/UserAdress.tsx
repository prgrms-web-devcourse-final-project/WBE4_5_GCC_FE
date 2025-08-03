'use client';

import { useState, useEffect } from 'react';
import DaumPostcodeEmbed from 'react-daum-postcode';
import { Search } from 'lucide-react';
import ProgressBar from '../common/ProgressBar';
import Input from '../common/ui/Input';
import Button from '../common/ui/Button';
import { useSignUpStore } from '@/store/SignupStore';

type AddressData = {
  sido: string;
  sigungu: string;
  bname: string;
};

export default function UserAdress() {
  const setIsNextEnabled = useSignUpStore((state) => state.setIsNextEnabled);
  const regionDept2 = useSignUpStore((state) => state.regionDept2);
  const regionDept3 = useSignUpStore((state) => state.regionDept3);
  const setRegionDept1 = useSignUpStore((state) => state.setRegionDept1);
  const setRegionDept2 = useSignUpStore((state) => state.setRegionDept2);
  const setRegionDept3 = useSignUpStore((state) => state.setRegionDept3);

  const [showPostcode, setShowPostcode] = useState(false);

  useEffect(() => {
    setIsNextEnabled(!!regionDept2 && !!regionDept3);
  }, [regionDept2, regionDept3, setIsNextEnabled]);

  const handleSearch = () => {
    setShowPostcode(true);
  };

  const handleComplete = (data: AddressData) => {
    const { sido, sigungu, bname } = data;

    setRegionDept1(sido);
    setRegionDept2(sigungu);
    setRegionDept3(bname);
    setShowPostcode(false);
  };

  return (
    <div className="mx-auto w-full max-w-screen-sm px-5 pt-[50px] select-none">
      <ProgressBar currentStep={2} totalSteps={4} />

      <h1 className="mb-7 text-[20px] font-semibold">주소를 입력해 주세요</h1>

      <div className="flex gap-2.5">
        <Input
          value={`${regionDept2} ${regionDept3}`}
          onChange={() => {}}
          disabled
        />
        <Button
          className="flex min-h-12 max-w-[93px] gap-[6px] rounded-lg bg-[#222222]"
          onClick={handleSearch}
        >
          <Search className="h-auto w-4" strokeWidth={2} />
          <span className="text-sm font-medium text-white">주소 검색</span>
        </Button>
      </div>

      {showPostcode && (
        <div className="mt-6">
          <DaumPostcodeEmbed
            onComplete={handleComplete}
            autoClose={false}
            style={{ width: '100%', height: '500px' }}
          />
        </div>
      )}
    </div>
  );
}
