'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function SignUpComplete() {
	const router = useRouter();

	const handleGoLogin = () => {
		router.push('/login');
	};

	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-white px-4">
			<div className="mb-9">
				<Image
					src="/images/check3d.png"
					alt="완료"
					width={160}
					height={160}
				/>
			</div>
			<h1 className="text-xl font-semibold text-[#222222] mb-4">
				회원가입이 완료되었습니다
			</h1>
			<p className="text-sm text-center text-[#9e9e9e] mb-[182px]">
				지금 로그인하여 나만의 루틴을 시작해보세요!
			</p>
			<button
				onClick={handleGoLogin}
				className="w-full max-w-xs cursor-pointer rounded-lg bg-[#222222] py-4 text-center font-semibold text-white shadow-md hover:bg-[#444444] transition-colors"
			>
				로그인하러 가기
			</button>
		</div>
	);
}
