'use client';

import DaumPostcodeEmbed from 'react-daum-postcode';
import { useRouter } from 'next/navigation';

type AddressData = {
  sido: string;
  sigungu: string;
  bname: string;
};

export default function AddressSearch() {
  const router = useRouter();

  const handleComplete = (data: AddressData) => {
    const { sido, sigungu, bname } = data;

    if (!sido || !sigungu || !bname) {
      alert('주소 정보를 가져오지 못했습니다.');
      return;
    }
    // 마포구 연남동, 해남군 북일면
    // const combinedAddress = `${sido} ${sigungu} ${bname}`;

    // console.log('전달할 주소:', combinedAddress);
    // 쿼리스트링으로 주소 전달
    router.push(
      `/mypage/change-userinfo/userinfo?region1=${encodeURIComponent(sido)}&region2=${encodeURIComponent(sigungu)}&region3=${encodeURIComponent(bname)}`,
    );
  };

  return (
    <div className="h-screen w-full px-5 py-7">
      <DaumPostcodeEmbed
        onComplete={handleComplete}
        autoClose={false}
        style={{ width: '100%', height: '500px' }}
      />
    </div>
  );
}
