# WBE4_5_GCC_FE

# TS 파일
→ 개발 생산성과 안정성을 높여주는 파일입니다.
- 안에서 타입을 정의하거나 함수를 만들어 다른 파일에서 재사용할 수 있습니다.
- 쉽게 말해 Type + JavaScript 로, 실제 실행은 JS로 이루어지고
TS는 개발 단계에서만 타입 검사를 해줍니다.

# TSX 파일 구조 설명
- page.tsx : Next.js에서 실제 화면을 렌더링하는 엔드포인트 (URL과 매핑됨)
- layout.tsx : 해당 라우트 그룹의 공통 레이아웃을 정의하는 파일
- components/ : 화면을 이루는 작은 단위의 UI 컴포넌트 모음
→ 여기 있는 파일들을 import 해서 page.tsx나 layout.tsx 안에서 재사용 가능
→ 백엔드의 "부분 템플릿" 또는 "뷰 조각"과 비슷한 개념


# 배포 방법
1️⃣ GitHub에서 코드 준비
	•	프로젝트 코드가 이미 GitHub에 올라가 있습니다.
	•	먼저 GitHub 계정이 필요합니다. (없으면 GitHub 가입 후 계정 생성)
	•	프로젝트 저장소 URL을 준비합니다.

2️⃣ Vercel 계정 생성 및 GitHub 연동
	1.	Vercel 사이트 접속
	2.	GitHub 계정으로 로그인
	3.	처음 로그인하면 GitHub 저장소 접근 권한을 요청합니다. 승인하면 연동 완료

3️⃣ 프로젝트 추가
	1.	Vercel 대시보드에서 “Add New Project” 클릭
	2.	GitHub 저장소 목록에서 배포할 프로젝트 선택
	3.	Import 버튼 클릭 → Next.js 프로젝트라면 Vercel이 자동으로 설정을 읽습니다

4️⃣ 빌드 및 배포
	•	별도 설정 없이 기본값으로 두고 Deploy 버튼 클릭
	•	몇 분 후 빌드가 끝나면 배포 완료
	•	배포 완료 후 Vercel이 자동으로 제공하는 URL이 나옵니다.
예: https://project-name.vercel.app

5️⃣ 업데이트 자동 배포
	•	GitHub 저장소 main 브랜치에 코드가 업데이트되면
	•	Vercel이 자동으로 다시 빌드하고 배포합니다.
	•	별도 작업 없이 최신 코드가 바로 반영됩니다.

6️⃣ 환경변수 설정 (필요할 경우)
	1.	Vercel 대시보드 → Project → Settings → Environment Variables
	2.	API 주소, 백엔드 키 등 입력 → 저장
	3.	변경 후에는 다시 Deploy 해야 적용됩니다
