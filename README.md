<img src="https://github.com/user-attachments/assets/3a384865-7d8f-42c6-978b-858054a0ce05" width="64" height="96" />

# 습관을 게임처럼, 루티(Routie)
루틴 실천을 게임처럼 즐기게 도와주는, 도전과 성장 기반의 맞춤형 루틴 관리 플랫폼 루티는 게임적 요소를 도입해 루틴 초보자도 쉽게 시작하고 꾸준히 실천할 수 있도록 설계되었습니다. 루틴 실천의 진입장벽은 낮추고, 몰입도와 지속률은 높이는 구조를 통해 ‘의지’가 아닌 ‘즐거움’으로 습관을 만드는 새로운 루틴 서비스를 제공합니다.

<img width="1920" height="1080" alt="2025_devcos_final" src="https://github.com/user-attachments/assets/26f5fcf0-a9a8-4f98-9e5d-20f3f6db6441" />

## 루티 (배포링크)


## 시연영상


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


## 역할 분담 및 기능 소개
## 👽 남윤서(팀장)

## 👽 김은지

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
* 탭(전체/상의/하의/액세서리) 기반 필터링
* 아이템 카드 그리드와 구매 버튼 제공
* 구매 성공 시 유저 포인트 차감
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
 

### 👽 한상아


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
