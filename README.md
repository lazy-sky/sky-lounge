# Sky Lounge

개발자 모임공간 커뮤니티 Sky Lounge입니다.

## 배포

[스카이 라운지](https://skylounge-lazysky.netlify.app/)

## Project Tree

```
📦src
 ┣ 📂assets
 ┃ ┗ 📂svgs
 ┣ 📂components
 ┃ ┣ 📂CommentList
 ┃ ┣ 📂CommentsWrapper
 ┃ ┣ 📂PostList
 ┃ ┃ ┣ 📂PostItem
 ┃ ┃ ┃ ┣ 📂utils
 ┃ ┗ 📂_shared
 ┃ ┃ ┣ 📂Loading
 ┃ ┃ ┣ 📂Navigation
 ┃ ┃ ┗ 📂PageHeader
 ┃ ┃ ┃ ┣ 📂BackButton
 ┣ 📂routes
 ┃ ┣ 📂ChatRoom
 ┃ ┣ 📂CreatePost
 ┃ ┃ ┣ 📂SubmitButton
 ┃ ┣ 📂Home
 ┃ ┃ ┣ 📂PostsFeed
 ┃ ┃ ┣ 📂WelcomePopup
 ┃ ┣ 📂MyPage
 ┃ ┣ 📂PrivateRoute
 ┃ ┣ 📂SignIn
 ┣ 📂services
 ┃ ┣ 📜auth.ts
 ┃ ┣ 📜data.ts
 ┃ ┗ 📜myFirebase.ts
 ┣ 📂store
 ┃ ┗ 📜atom.ts
 ┣ 📂styles
 ┃ ┣ 📂base
 ┃ ┣ 📂constants
 ┃ ┣ 📂mixins
 ┣ 📂types
 ┃ ┣ 📜global.d.ts
 ┃ ┗ 📜post.ts
 ┗ 📂utils
```

## 화면 예시(기능 설명)

### 기능 목록

- 게시글 열람
  - 최신순/좋아요순 정렬
  - 태그 필터링
  - 실시간 업데이트
- 게시글 작성(회원)
  - 글 작성
  - 사진 첨부
  - 태그 추가
- 게시글 수정 및 삭제(회원)
- 게시글 좋아요(회원)

- 댓글 열람
- 댓글 작성(회원)

- 익명 채팅 참여
  - 게스트 계정 자동 생성
  - 사진 및 이모티콘 첨부
  - 메세지 리액션

- 회원가입 및 로그인
  - 로그인, 로그아웃, 회원 탈퇴
  - 로그인 시 '내가 쓴 글'과 '내가 쓴 댓글' 열람
  - 닉네임 변경 및 랜덤 닉네임 생성

### 기본 화면(홈 - 게시글 피드)

#### 실시간 업데이트

#### 정렬(최신순/좋아요순)

#### 태그 필터링

#### 좋아요

#### 댓글

### 작성 탭

#### 게시글 생성

글 내용/사진 첨부/태그 추가

#### 게시글 삭제

#### 게시글 수정

### 익명 채팅방

메세지 작성/메세지 반응/사진 첨부/이모티콘

### 회원가입 및 로그인

### 마이 페이지

#### 내가 쓴 글/댓글 열람

#### 닉네임 변경 및 랜덤 닉네임

#### 로그아웃 및 회원 탈퇴

## [회고](./Retrospect.md)

## Tech & Libraries

라우팅
- react-router-dom

중앙 저장소
- recoil

서버 및 DB
- firebase

유틸리티
- lodash
- react-use
- react-loading: 로딩 컴포넌트
- sweetalert2: 알림 컴포넌트
- dayjs

스타일
- scss
- css module
- classnames

코딩 컨벤션
- eslint
- prettier
- stylelint

기타
- stream-chat/stream-chat-react: 채팅 관련 API

## Contributor

[김하늘](https://github.com/lazy-sky)

ⓒ 2022. @lazy-sky. all rights reserved.