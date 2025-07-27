'use client';

import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Input from '@/app/components/common/ui/Input';
import Button from '@/app/components/common/ui/Button';
import Dropdown from '@/app/components/common/ui/Dropdown';
import { useUserStore } from '@/store/UserStore';
import { checkNickname } from '@/api/auth';
import { handleChangeProfile } from '@/api/member';
import AlertMessage from '@/app/components/common/alert/AlertMessage';
import BackHeader from '@/app/components/common/ui/BackHeader';

export default function Page() {
  const router = useRouter();
  const yearOptions = ['1년 미만', '1~3년', '3~5년', '5~10년', '10년 이상'];
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [checkNickName, setCheckNickName] = useState<true | false | null>(null);
  const [errors, setErrors] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  // zustand에서 프로필정보 불러오기
  const userNickname = useUserStore((state) => state.nickname);
  const name = useUserStore((state) => state.name);
  const residenceExperience = useUserStore(
    (state) => state.residenceExperience,
  );
  const region = useUserStore(
    (state) => `${state.regionDept1} ${state.regionDept2} ${state.regionDept3}`,
  );

  const experience =
    residenceExperience === 'UNDER_1Y'
      ? '1년 미만'
      : residenceExperience === 'Y1_TO_3'
        ? '1~3년'
        : residenceExperience === 'Y3_TO_5'
          ? '3~5년'
          : residenceExperience === 'Y5_TO_10'
            ? '5~10년'
            : '10년 이상';

  const [nickname, setNickname] = useState(userNickname);
  const [address, setAddress] = useState(region);
  const [selected, setSelected] = useState(experience);

  const searchParams = useSearchParams();
  const searchedAddress = searchParams.get('address');

  const handleSearch = () => {
    router.push('/mypage/change-userinfo/userinfo/address');
  };

  useEffect(() => {
    if (searchedAddress) {
      setAddress(searchedAddress);
    }
  }, [searchedAddress]);

  const [regionDept1 = '', regionDept2 = '', regionDept3 = ''] =
    address.split(' ');

  // 닉네임 중복확인 조건
  const trimNickname = nickname.trim();

  const isSameAsOriginal = trimNickname === userNickname;
  const isNicknameChanged = !isSameAsOriginal;

  const confirmNickname = isSameAsOriginal || trimNickname.length === 0;

  const canSave =
    (isSameAsOriginal && trimNickname.length > 0) || // 닉네임 안 바뀌었으면 저장 가능
    (isNicknameChanged && checkNickName === true); // 바뀌었으면 중복확인 통과해야 저장 가능

  // 닉네임 중복확인
  const checkHandler = async () => {
    if (trimNickname.length < 2 || trimNickname.length > 15) {
      setError('2글자 이상 입력해주세요');
      setCheckNickName(false);
      return;
    }
    try {
      await checkNickname(nickname);
      setError('');
      setSuccess('사용 가능한 닉네임입니다.');
      setCheckNickName(true);
    } catch (error) {
      setCheckNickName(false);
      setError('이미 사용 중인 닉네임입니다.');
      setSuccess('');
      console.error('닉네임 중복:', error);
    }
  };

  // 알림창 시간
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  // 저장버튼 누를 때
  const handleSubmit = () => {
    if (trimNickname.length === 0) {
      setErrors('닉네임을 입력해주세요.');
      setShowAlert(true);
      return;
    }
    if (isNicknameChanged && checkNickName === null) {
      setErrors('닉네임 중복확인 버튼을 눌러주세요.');
      setShowAlert(true);
      return;
    }
    if (canSave) {
      handleChangeProfile(
        name,
        trimNickname,
        residenceExperience,
        regionDept1,
        regionDept2,
        regionDept3,
      );

      const { setUser } = useUserStore.getState();
      setUser({ nickname: trimNickname });
      router.push('/mypage');
    }
  };

  return (
    <div className="h-1vh flex flex-col gap-7">
      <BackHeader title="회원정보 변경" />
      <div className="flex flex-col gap-6 px-5">
        {/* 닉네임 */}
        <div className="flex flex-col gap-2.5">
          <p className="text-sm font-semibold">닉네임</p>
          <div className="flex gap-2.5">
            <Input
              value={nickname}
              onChange={(e) => {
                const value = e.target.value.replace(/\s/g, '');
                setNickname(value);
              }}
              placeholder="2~15자 이내로 입력해 주세요"
              maxLength={15}
              error={error}
              success={success}
            />
            <Button
              className="min-h-12 max-w-[93px] cursor-pointer rounded-lg p-0"
              disabled={confirmNickname}
              onClick={checkHandler}
            >
              <h1 className="text-sm font-medium text-[#FDFDFD]">중복 확인</h1>
            </Button>
          </div>
        </div>

        {/* 주소 */}
        <div className="flex flex-col gap-2.5">
          <p className="text-sm font-semibold">주소</p>
          <div className="flex gap-2.5">
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder=""
              disabled
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
            }}
          />
        </div>

        <div className="fixed right-5 bottom-[70px] left-5">
          <div className="flex justify-center">
            {errors && showAlert && (
              <AlertMessage type="error" message={errors} className="mb-10" />
            )}
          </div>
          <Button type="submit" onClick={handleSubmit}>
            저장하기
          </Button>
        </div>
      </div>
    </div>
  );
}
