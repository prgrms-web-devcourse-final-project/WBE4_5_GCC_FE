<img src="https://github.com/user-attachments/assets/3a384865-7d8f-42c6-978b-858054a0ce05" width="64" height="96" />

# 습관을 게임처럼, 루티(Routie)
루틴 실천을 게임처럼 즐기게 도와주는, 도전과 성장 기반의 맞춤형 루틴 관리 플랫폼 루티는 게임적 요소를 도입해 루틴 초보자도 쉽게 시작하고 꾸준히 실천할 수 있도록 설계되었습니다. 루틴 실천의 진입장벽은 낮추고, 몰입도와 지속률은 높이는 구조를 통해 ‘의지’가 아닌 ‘즐거움’으로 습관을 만드는 새로운 루틴 경험을 제공합니다.

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

<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
<img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
<img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">




## 역할 분담 및 기능 소개
### 👽 남윤서(팀장)

### 👽 김은지

### 👽 이서영

### 👽 한상아


### 디렉토리 구조

```bash
📦public                    # 정적 파일
📦src
 ┣ 📂apis                   # API 호출 관련 함수
 ┣ 📂assets                 # 정적 리소스 (이미지, JSON 등)
 ┃ ┣ 📂data
 ┃ ┣ 📂images
 ┣ 📂components             # 공통 및 기능별 UI 컴포넌트
 ┃ ┣ 📂commons              # 공용 컴포넌트
 ┃ ┗ 📂features
 ┃ ┃ ┣ 📂home                   # 메인 홈페이지
 ┃ ┃ ┣ 📂message                # 메시지
 ┃ ┃ ┣ 📂notification           # 알림
 ┃ ┃ ┣ 📂post                   # 게시글 작성 및 수정
 ┃ ┃ ┣ 📂postDetail             # 게시글 상세 페이지
 ┃ ┃ ┣ 📂profile                # 유저 프로필
 ┃ ┗ ┗ 📂user                   # 유저 목록
 ┃
 ┣ 📂constants              # 상수 정의
 ┣ 📂context                # React Context
 ┣ 📂css                    # CSS 파일
 ┣ 📂hooks                  # 커스텀 훅
 ┣ 📂layouts                # 레이아웃 컴포넌트
 ┣ 📂pages                  # 라우트 페이지
 ┣ 📂store                  # zustand 전역 상태 관리
 ┣ 📂types                  # 타입 정의
 ┣ 📂utils                  # 유틸 함수
 ┣ 📜App.tsx
 ┣ 📜main.tsx
 ┗ 📜vite-env.d.ts
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
