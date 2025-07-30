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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUserEditStore } from '@/store/UserEditStore';
import { ProfileData } from '../../../../../../types/User';

export default function Page() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [errors, setErrors] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [regionDept1, setRegionDept1] = useState('');
  const [regionDept2, setRegionDept2] = useState('');
  const [regionDept3, setRegionDept3] = useState('');
  const yearOptions = ['1년 미만', '1~3년', '3~5년', '5~10년', '10년 이상'];

  // Zustand에서 유저 정보 불러오기
  const userNickname = useUserStore((state) => state.member.nickname);
  const name = useUserStore((state) => state.member.name);
  const residenceExperience = useUserStore(
    (state) => state.member.residenceExperience,
  );
  const region = useUserStore(
    (state) =>
      `${state.member.regionDept1} ${state.member.regionDept2} ${state.member.regionDept3}`,
  );

  const [address, setAddress] = useState(region);

  const {
    nickname,
    setNickname,
    nicknameChecked,
    setNicknameChecked,
    nicknameCheckStatus,
    setNicknameCheckStatus,
  } = useUserEditStore();

  // 닉네임 초기 세팅
  useEffect(() => {
    setNickname(userNickname);
  }, []);

  // 자취경력 초기 세팅
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

  const [selected, setSelected] = useState(experience);

  // 주소 쿼리 파라미터 반영
  useEffect(() => {
    const dept1 = searchParams.get('region1') ?? '';
    const dept2 = searchParams.get('region2') ?? '';
    const dept3 = searchParams.get('region3') ?? '';

    setRegionDept1(dept1);
    setRegionDept2(dept2);
    setRegionDept3(dept3);

    const full = `${dept1} ${dept2} ${dept3}`.trim();
    if (full) setAddress(full);
  }, [searchParams]);

  // 주소 검색 버튼
  const handleSearch = () => {
    router.push('/mypage/change-userinfo/userinfo/address');
  };

  // 닉네임 중복확인 로직
  const trimNickname = nickname.trim();
  const isSameAsOriginal = trimNickname === userNickname;
  const isNicknameChanged = !isSameAsOriginal;
  const confirmNickname = isSameAsOriginal || trimNickname.length === 0;

  const canSave =
    (isSameAsOriginal && trimNickname.length > 0) ||
    (isNicknameChanged && nicknameCheckStatus === true);

  const checkHandler = async () => {
    if (trimNickname.length < 2 || trimNickname.length > 15) {
      setError('2글자 이상 15글자 이하로 입력해주세요');
      setNicknameCheckStatus(false);
      return;
    }
    try {
      const isDuplicated = await checkNickname(trimNickname);
      if (isDuplicated) {
        setNicknameCheckStatus(false);
        setError('이미 사용 중인 닉네임입니다.');
        setSuccess('');
      } else {
        setError('');
        setSuccess('사용 가능한 닉네임입니다.');
        setNicknameCheckStatus(true);
        setNicknameChecked(true);
      }
    } catch (error) {
      console.error('닉네임 중복 확인 실패:', error);
    }
  };

  // residenceExperience 코드 변환
  const experienceCode =
    selected === '1년 미만'
      ? 'UNDER_1Y'
      : selected === '1~3년'
        ? 'Y1_TO_3'
        : selected === '3~5년'
          ? 'Y3_TO_5'
          : selected === '5~10년'
            ? 'Y5_TO_10'
            : 'OVER_10Y';

  // 알림창 타이머
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  // 회원정보 변경 요청
  const userInfoMutation = useMutation({
    mutationFn: (params: {
      nickname: string;
      residenceExperience: string;
      regionDept1: string;
      regionDept2: string;
      regionDept3: string;
    }) =>
      handleChangeProfile(
        name,
        params.nickname,
        params.residenceExperience,
        params.regionDept1,
        params.regionDept2,
        params.regionDept3,
      ),

    onMutate: async (params) => {
      await queryClient.cancelQueries({ queryKey: ['user-profile'] });

      const previousProfile = queryClient.getQueryData(['user-profile']);

      // 캐시에 낙관적으로 업데이트
      queryClient.setQueryData(['user-profile'], (old: ProfileData) => {
        if (!old) return old;
        return {
          ...old,
          member: {
            ...old.member,
            nickname: params.nickname,
            residenceExperience: params.residenceExperience,
            regionDept1: params.regionDept1,
            regionDept2: params.regionDept2,
            regionDept3: params.regionDept3,
          },
        };
      });
      return { previousProfile };
    },

    onError: (err, _newData, context) => {
      if (context?.previousProfile) {
        queryClient.setQueryData(['user-profile'], context.previousProfile);
      }
      console.error('회원정보 변경 실패', err);
      setErrors('회원정보 변경에 실패했습니다. 다시 시도해주세요.');
      setShowAlert(true);
    },

    onSuccess: () => {
      const prevMember = useUserStore.getState().member;
      useUserStore.getState().setMember({
        ...prevMember,
        nickname: trimNickname,
        residenceExperience: experienceCode,
        regionDept1,
        regionDept2,
        regionDept3,
      });
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
      router.push('/mypage');
    },
  });

  // 저장 핸들러
  const handleSubmit = () => {
    if (trimNickname.length === 0) {
      setErrors('닉네임을 입력해주세요.');
      setShowAlert(true);
      return;
    }
    if (isNicknameChanged && !nicknameChecked) {
      setErrors('닉네임 중복확인 버튼을 눌러주세요.');
      setShowAlert(true);
      return;
    }
    if (canSave) {
      userInfoMutation.mutate({
        nickname: trimNickname,
        residenceExperience: experienceCode,
        regionDept1,
        regionDept2,
        regionDept3,
      });
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

                if (value !== userNickname) {
                  setNicknameChecked(false);
                  setNicknameCheckStatus(null);
                  setSuccess('');
                  setError('');
                }
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
          <Button type="submit" onClick={handleSubmit} disabled={!canSave}>
            저장하기
          </Button>
        </div>
      </div>
    </div>
  );
}
