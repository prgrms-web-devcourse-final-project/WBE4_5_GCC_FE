<img src="https://github.com/user-attachments/assets/3a384865-7d8f-42c6-978b-858054a0ce05" width="64" height="96" />

# 습관을 게임처럼, 루티(Routie)
루틴 실천을 게임처럼 즐기게 도와주는, 도전과 성장 기반의 맞춤형 루틴 관리 플랫폼 루티는 게임적 요소를 도입해 루틴 초보자도 쉽게 시작하고 꾸준히 실천할 수 있도록 설계되었습니다. 루틴 실천의 진입장벽은 낮추고, 몰입도와 지속률은 높이는 구조를 통해 ‘의지’가 아닌 ‘즐거움’으로 습관을 만드는 새로운 루틴 서비스를 제공합니다.

<img width="1920" height="1080" alt="2025_devcos_final" src="https://github.com/user-attachments/assets/26f5fcf0-a9a8-4f98-9e5d-20f3f6db6441" />

## 루티 (배포링크)


# 프로젝트 소개
* 1인 가구의 증가와 자취 초보의 생활 패턴 관리의 어려움을 해결하고자 루틴 실천을 게임처럼 즐겁게 하여 지속적인 실천을 도와주는 서비스입니다.
* 사용자 기반 세부 카테고리 별 루틴을 생성하고, 루틴 완료시의 포인트 보상과 캐릭터의 성장을 통한 동기부여를 얻을 수 있습니다.
* 주간/이벤트 퀘스트를 통한 추가 보상 및 활동 기록에 따른 업적 보상을 확인할 수 있습니다.
* 월간 리포트를 통해 활동 이력을 시각화 할 수 있으며 AI 기반 성취 피드백을 얻을 수 있습니다.
* 루틴을 실천하며 얻는 업적 및 퀘스트 보상과 포인트로 실용성과 재미를 모두 갖춘 루틴 도우미입니다.

## 프로젝트 기간

2025.06.26 ~ 2025.07.31

## 기술 스택

#### Languages
<img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">

#### Frameworks/Libraries
<div class="flex flex-wrap items-center gap-2">
   <img src="https://img.shields.io/badge/next.js v15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white">
   <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">

#### Data Fetching & State
<div class="flex flex-wrap items-center gap-2">
   <img src="https://img.shields.io/badge/reactquery-FF4154?style=for-the-badge&logo=reactquery&logoColor=white">
   <img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">
   <img src="https://img.shields.io/badge/zustand-4D2B1A?style=for-the-badge&logo=zustand&logoColor=white">

#### Styling
<div class="flex flex-wrap items-center gap-2">
   <img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
   <img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white">

#### Code Quality & DX
<div class="flex flex-wrap items-center gap-2">
  <img src="https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white">
  <img src="https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white">

#### Version Control & Collaboration
<div class="flex flex-wrap items-center gap-2">
   <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
   <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">

#### Web Platform
<img src="https://img.shields.io/badge/pwa-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white">

#### Design
<img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">


## 역할 분담
## 👽 남윤서(팀장)

---

## 👽 김은지
### 📊 주간 리포트 기능 구현
- 주 단위 루틴 활동을 분석·시각화하는 **리포트 페이지 전체 기능 구현**
- **AI 분석 코멘트, 월간 요약 카드, 주간 완료율 차트, Top5 루틴 랭킹, 카테고리 분포 차트** 등 데이터 기반 인사이트 제공
- **Recharts 라이브러리 활용** → 막대/원형 차트 구현으로 루틴 성과를 직관적으로 확인 가능
- 주차 이동 기능(이전/다음 주) 및 **데이터 검증 로직(hasValidData)** 적용 → 빈 데이터·에러 상황에서도 안정적인 사용자 경험 제공

### 🔔 알림 기능 구현
#### 알림 설정 UI
- 루틴, 퀘스트, 업적 보상 알림을 **토글 형태로 on/off 제어 가능**
- **Optimistic Update 전략 적용** → 서버 응답 대기 없이 UI 즉시 반영, 실패 시 자동 롤백 처리
- 사용자 친화적인 UX 제공 + 데이터 정합성 유지

#### 알림 목록 관리
- **최신순 정렬된 알림 리스트** 구현 → 개별 알림 읽음 처리 및 전체 읽음 기능 제공
- 읽음/안 읽음 상태를 **시각적으로 구분**하여 가독성 강화
- **컴포넌트 기반 구조 설계** → 알림 타입 확장 시에도 유연하게 대응 가능

### 🎨 UI / UX 디자인 전반 담당
- 전체 페이지 레이아웃 및 컴포넌트 디자인 설계
- **Lottie 애니메이션 적용** → 데이터 없음 / 분석 대기 상태에서 사용자 친화적 안내 제공
- **LoadingSpinner 컴포넌트 제작** → 데이터 로딩 시 즉각적인 피드백 제공
    
---

## 👽 이서영
### 루틴 카테고리 컴포넌트 구현
* 대분류(MAJOR) / 소분류(SUB) 구조 지원, 계층형 데이터 표시
* 이모지 선택(EmojiPicker)으로 아이콘 지정, 외부 클릭 시 자동 닫힘
* 바텀시트로 카테고리명 입력/수정 -> 직접 입력 방지하고 시트에서 확정
* 대분류/소분류 실시간 수정 -> optimistic 없이 즉시 mutate
* 소분류 카테고리 추가/삭제 지원 -> 삭제 시 확인 모달 활성화
* 기본(DEFAULT) 타입은 편집/이모지 변경 비활성화
* TanStack Query로 `user-categories` 쿼리 관리 -> 생성/수정/삭제 후 캐시 무효화
### 도감 배지
* 서버 페이지네이션 대신 1회 대량 조회 후(size=999) 클라이언트 후페이징(6개/페이지)
* 보유 필터/티어 및 카테고리 필터 적용 시 후페이징 재계산하여 현재 페이지 범위 보정 -> 필터 결과가 적으면 1페이지로 이동
* 초기 data fetching 시 스켈레톤 UI 카드 로딩
* 배지 장착/해제를 낙관적 업데이트로 `user-profile` 캐시 즉시 반영 -> 서버 성공 후 `user-badges`와 `user-profile` invalidate
* '보상받기' 버튼 오버레이(조건 충족 시 버튼 노출) & 수령 성공/실패 모달 활성화
### 상점 아이템
* 아이템 카테고리별 탭 필터링(전체/상의/하의/액세서리)하여 선택된 카테고리에 따라 목록을 분기 렌더링하여 구현
* 아이템 카드를 그리드 형태로 배치하고 구매 버튼을 연동하여 직관적인 UI 제공
* 구매 성공 시 서버 응답을 기반으로 React Query 캐시 업데이트 후 UI와 데이터 상태 동기화 -> 유저 포인트 차감
### 관리자 아이템
* 아이템 추가: 아이템 타입(TOP/BOTTOM/ACCESSORY) 선택 후 자동 itemKey 생성 -> 현재 데이터 목록과 충돌 없는 첫 번째 키를 채택하여 중복검사 진행
* 아이템 수정: 개별 아이템 조회하여 입력 양식을 미리 채워 넣고(form pre-fill), itemKey는 수정 불가하도록 인풋창 readOnly 처리
* PATCH payload: `{itemType, itemName, price, key, itemDescription, isListed}` 서버 업데이트
* 아이템 등록/수정 성공 모달 -> 목록으로 이동, 실패 시 에러 모달 활성화
* 리스트여부(`isListed`)로 실제 유저 상점 노출 여부를 결정
* TanStack Query로 `admin-items` 캐시 관리, 추가/수정/삭제 시 invalidate
### 관리자 카테고리
* 새로운 대분류 카테고리 생성 플로우: 이모지 선택 + 바텀시트에서 카테고리명 입력 -> 생성 -> 목록 갱신
* 기존 대분류 편집: 카테고리명 변깅 시 즉시 수정 API 호출 & 이모지 변경도 즉시 반영
* 세부 카테고리 추가 플로우: 바텀시트에서 카테고리명 입력 -> 생성 -> 목록 갱신
* 세부 카테고리 개별 삭제: 삭제 시 확인 모달 활성화 & 성공 시 로컬 리스트와 캐시 동기화
### 주소 검색 API
* react-daum-postcode 라이브러리(Daum 우편번호 API)를 연동하여 프로필 수정 페이지 내 주소 검색 UI 구현
* 주소 선택 시 `sido(시/도)`, `sigungu(시/군/구)`, `bname(법정동)`을 파싱하여 필요한 행정 단위까지만 정제된 주소 데이터 생성
* 불완전한 주소 입렵을 방지하기 위해 `if (!sido || !sigungu || !bname)` 조건문을 통해 데이터 유효성 검증 로직 적용
* `next/navigation`의 `router.push`를 활용해 선택된 주소를 쿼리스트링 형태(region1, region2, region3)로 전달하여 프로필 수정 폼과 연동
* API UI에서 `autoClose=false` 옵션과 스타일 커스터마이징을 적용해 검색 화면의 사용성(높이, 레이아웃) 최적화
### 상태 관리 및 데이터 최적화
* TanStack Query
    * 쿼리키: `user-categories`, `user-badge`, `user-items`, `admin-categories`, `admin-items`로 일관 관리
    * `staleTime`으로 불필요한 refetch 최소화, 성공 시 필요한 키만 `invalidateQueries` 처리
    * 낙관적 업데이트(onMutate) + 실패 롤백(onError) 패턴 적용
    * `placeholderData`로 페이지 전환시 데이터 깜빡임 감소
* UI/상태
    * 스켈레톤 컴포넌트로 최초/전환 로딩 대응
    * 필터 변경 시 페이징 재계산 및 현재 페이지 보정
* 접근성/사용성
    * 모달/바텀시트 외부 클릭 닫기 처리
    * 비편집 필드(readOnly) 및 비활성 제어로 사용자 실수 방지
 
---

## 👽 한상아
### 회원 프로필
* 사용자 프로필 조회 및 수정 UI 구현
* 닉네임 중복 검사 API 연동 → 실시간 중복 여부 확인 후 사용자에게 피드백 제공
* 주소 검색 API(도로명 주소 서비스 등) 연동 → 직접 입력 대신 검색/선택 방식으로 정확도 개선
* 비밀번호 확인 입력 시 디바운싱 적용 → 입력 지연 후 검증, 일치 여부를 인풋 하단에 즉시 표시
* 닉네임/주소/자취경력 수정 기능 제공 → 실시간 API 호출로 서버에 즉시 반영
* 내 캐릭터 아바타(상의/하의/액세서리 장착 상태) 표시
* TanStack Query로 `user-profile` 관리 → 수정 후 invalidate 처리
  
### 퀘스트
* 주간/이벤트 조건 퀘스트 목록 표시
* 퀘스트 진행도(ProgressBar) UI 제공
* 퀘스트 달성 시 ‘보상받기’ 버튼 활성화 → 수령 성공/실패 모달 처리
* 완료된 퀘스트는 화면에서 자동으로 제거(미표시)
* TanStack Query 기반 `user-quests` 캐시 관리 → 보상 수령 시 invalidate 처리
  
### 회원 포인트
* 현재 포인트 실시간 표시 (헤더/상점 등 주요 UI 연동)
* 포인트 획득/차감 시 낙관적 업데이트 적용 → 즉시 반영 후 실패 시 롤백
* 포인트 변화 이벤트 발생 시 `user-point` 캐시 invalidate로 동기화
  
### 캐릭터 꾸미기 & 디자인
* 기본 아바타(base_light) 기반 꾸미기 기능 → 상의/하의/액세서리 장착 가능
* 도트 아바타 디자인: 60x60 사이즈, 테두리 포함, 갈색 머리 + 흰 티셔츠 + 파란 바지 + 흰 운동화 고정
* 아이템 장착/해제 → 즉시 mutate, 성공 시 `user-items` invalidate
* 착용 아이템 미리보기 → 장착 시 아바타 위에 레이어링 적용
* 아이템 없을 시 빈 슬롯 상태 노출
* SVG/PNG 파츠 구조로 조합 가능 → 커스터마이징 확장성 고려
* UI 접근성: 모달 닫기, 탭 전환, hover 툴팁 등 적용

### 다크모드 
* 페이지 별 다크모드 구현

---

## 주요기능

| 온보딩 페이지(비로그인) | 메인페이지(로그인) | 로그인 페이지 |
| :--------------------: | :----------------: | :------------: |
| <img src="https://github.com/user-attachments/assets/09529d8a-3fe8-434b-be35-516fe621c07d" width="250"/> | <img src="https://github.com/user-attachments/assets/19e68c0f-34b1-4204-8999-91321ff5e058" width="250"/> | <img src="https://github.com/user-attachments/assets/edeb663f-5baf-419d-9a0c-3265fd026957" width="250"/> |
| - 루티 주요 서비스 정보 제공  | - 유저 정보, 오늘 루틴 제공 | 로그인 페이지 |

<table>
  <tr>
    <th colspan="3" align="center">회원가입 페이지</th>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/fbba860f-feda-469a-8d1b-25023fd79ddb" width="250"/></td>
    <td><img src="https://github.com/user-attachments/assets/ba531775-25ab-4456-9b15-ad1d0738d603" width="250"/></td>
    <td><img src="https://github.com/user-attachments/assets/f28a3774-e825-415b-ba97-7583831d1e02" width="250"/></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/52b72449-d2cd-4c1d-a10b-45418c385660" width="250"/></td>
    <td><img src="https://github.com/user-attachments/assets/9991b984-5d91-41d6-bd04-52288b2f4336" width="250"/></td>
    <td><img src="https://github.com/user-attachments/assets/bc8b1746-d695-407e-a9d3-9b4a971b1ddb" width="250"/></td>
  </tr>
   <tr>
    <th colspan="3" align="center">회원가입 페이지</th>
  </tr>
</table>

| 루틴 카테고리 등록 | 카테고리 삭제 | 카테고리 수정 |
| :----------------: | :--------------------: | :----------------: | 
| <img src="https://github.com/user-attachments/assets/42c1c403-e098-4f20-8435-37ced8156c48" width="250"/> | <img src="https://github.com/user-attachments/assets/42811d88-0553-438e-aab0-80587b0262c8" width="250"/> | <img src="https://github.com/user-attachments/assets/be089ad1-7d73-4715-9f65-cc5d12897c94" width="250"/> | 
| - 대분류/소분류 카테고리 제공 <br/>- 이모지 아이콘 설정 가능 <br/>- 사용자 정의 카테고리 추가 가능 | - 기본 카테고리 삭제 불가<br/>- 사용자 카테고리 삭제 가능  | - 대분류 카테고리 수정 가능<br/> - 소분류 카테고리 추가/삭제 지원 | 

| 루틴 등록 | 루틴 수정 & 삭제 |
| :----------------: | :--------------------: | 
| <img src="https://github.com/user-attachments/assets/943aa4c5-819f-4a28-b269-c4faf45a4041" width="250"/> | <img src="https://github.com/user-attachments/assets/08aa911e-261a-4f50-8211-1fcd4471c1f7" width="250"/> | 
| - 루틴 카테고리, 시작일, 반복 주기, 중요도 설정 가능 <br/>- 카테고리별 추천 루틴 제공 <br/>- 일간/주간/월간 반복 주기 설정 모달 | - 일별 루틴 완료율 확인 가능 <br/>- 등록된 루틴 수정/삭제 가능 |

| 리포트 페이지 | 상점 페이지 |
| :--------------------: | :----------------: | 
| <img src="https://github.com/user-attachments/assets/fe3aa8f1-e521-44ef-be80-fb1c6e60918c" width="250"/> | <img src="https://github.com/user-attachments/assets/573d9679-be82-4ee3-9062-2585817d82c6" width="250"/> | 
| - 주 단위 루틴 활동을 분석·시각화 <br/>- AI 분석 코멘트, 월간 요약 카드, 주간 완료율 차트, <br/>Top5 루틴 랭킹, 카테고리 분포 차트 제공  | - 상의/하의/액세서리별 탭 필터링 지원<br/> - 사용자 포인트로 아이템 구매 가능 | 

| 도감 | 퀘스트 | 알림 |
| :----------------: | :--------------------: | :----------------: | 
| <img src="https://github.com/user-attachments/assets/3f5ef727-7c34-405a-af24-ec03d9b1a038" width="250"/> | <img src="https://github.com/user-attachments/assets/c0ec4a6f-0314-4f26-a433-ba5c1e4a2e35" width="250"/> | <img src="https://github.com/user-attachments/assets/e60f0487-7967-4c7d-8e36-327f1f47bc39" width="270"/> | 
| - 보유 뱃지 확인 가능 <br/>- 티어 및 카테고리 필터 제공 <br/>- 특정 조건 달성 시 뱃지 획득 가능<br/>- 뱃지 장착/해제 지원 | - 주간/이벤트 퀘스트 목록 제공 <br/>- 퀘스트 진행 현황 확인 가능 <br/>- 퀘스트 달성 시 보상 획득 → 포인트 적립  | - 실시간 알림 제공<br/> - 개별 알림 읽음 처리 및 전체 읽음 지원<br/> - 루틴/퀘스트/업적 보상 알림 on·off 설정 가능 | 

| 캐릭터 꾸미기 | 회원정보 수정 |
| :--------------------: | :----------------: | 
| <img src="https://github.com/user-attachments/assets/5893893e-2751-4bca-96ba-ae24880effe1" width="250"/> | <img src="https://github.com/user-attachments/assets/0b8462bf-0717-4a43-84ad-9af0196d7ec1" width="250"/> | 
| - 유저 캐릭터에 상의/하의/액세서리 장착&해제 가능 <br/>- 착용 아이템 미리보기 제공  | - 비밀번호 확인 후 정보 수정 가능<br/> - 닉네임, 주소, 자취경력 수정 가능<br/> - 닉네임 중복 여부 확인<br/> - 주소 검색 API를 통한 도로명 주소 자동 입력  | 

| 다크모드 | 
| :--------------------: |
| <img src="https://github.com/user-attachments/assets/1a7b648a-d47e-46df-9ee0-daa12dc95832" width="250"/> | 


### 디렉토리 구조

```bash
📦public                   
┃ 📦src
┃  ┣ 📂api                   
┃  ┣ 📂app                 
┃  ┃ ┣ 📂(auth)
┃  ┃ ┣ 📂(protected)
┃  ┃ ┣ 📂(admin)
┃  ┃ ┣ 📂assets
┃  ┃ ┣ 📂styles               
┃  ┃ ┣ 📂components
┃  ┃ ┃ ┣ 📂admin
┃  ┃ ┃ ┣ 📂collection
┃  ┃ ┃ ┣ 📂common
┃  ┃ ┃ ┣ 📂main
┃  ┃ ┃ ┣ 📂mypage
┃  ┃ ┃ ┣ 📂onBoarding
┃  ┃ ┃ ┣ 📂report
┃  ┃ ┃ ┣ 📂routine
┃  ┃ ┃ ┣ 📂shop
┃  ┃ ┃ ┗ 📂signup
┃  ┃ ┣ 📂layout.tsx
┃  ┃ ┣ 📂page.tsx
┃  ┃ ┣ 📂provider.tsx
┃  ┣ 📂hooks
┃  ┗ 📂store 
┗ 📂types
```

## 팀원 소개

<div align="center">

  <table>
    <tr>
      <td align="center" style="border:1px solid #ccc; border-radius:10px; padding:10px; width:200px;">
        <img src="https://github.com/ysnam0123.png" width="100px;" style="border-radius:50%;" alt="ysnam0123"/><br />
        <b>남윤서</b><br />
        <a href="https://github.com/ysnam0123">@ysnam0123</a>
      </td>
      <td align="center" style="border:1px solid #ccc; border-radius:10px; padding:10px; width:200px;">
        <img src="https://github.com/keemeunji.png" width="100px;" style="border-radius:50%;" alt="keemeunji"/><br />
        <b>김은지</b><br />
        <a href="https://github.com/keemeunji">@keemeunji</a>
      </td>
      <td align="center" style="border:1px solid #ccc; border-radius:10px; padding:10px; width:200px;">
        <img src="https://github.com/seoyeoxxlee.png" width="100px;" style="border-radius:50%;" alt="jieun22222"/><br />
        <b>이서영</b><br />
        <a href="https://github.com/seoyeoxxlee">@seoyeoxxlee</a>
      </td>
      <td align="center" style="border:1px solid #ccc; border-radius:10px; padding:10px; width:200px;">
        <img src="https://github.com/hansanga.png" width="100px;" style="border-radius:50%;" alt="hansanga"/><br />
        <b>한상아</b><br />
        <a href="https://github.com/hansanga">@hansanga</a>
      </td>
    </tr>
  </table>

</div>

##
