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

- 회원가입 및 로그인
  - 로그인, 로그아웃, 회원 탈퇴
  - 로그인 시 '내가 쓴 글'과 '내가 쓴 댓글' 열람
  - 닉네임 변경 및 랜덤 닉네임 생성

### 기본 화면(홈 - 게시글 피드)

피드 기반의 게시글을 보여주는 홈 탭 화면입니다.

![home-feed](https://user-images.githubusercontent.com/47808461/172035643-8b15e979-f5c3-4f7e-8b14-4addc46ea18c.gif)

#### 실시간 업데이트

새로고침을 하지 않아도 다른 사용자가 작성한 게시글이 피드에 실시간으로 반영됩니다.

![home-realtime](https://user-images.githubusercontent.com/47808461/172035725-fd60fd9c-b713-4906-87b3-4b1a6efd49f0.gif)

#### 정렬(최신순/좋아요순)

최신순 혹은 좋아요순 버튼을 클릭하면 해당 정렬 방법으로 게시글을 정렬합니다.

![home-sort](https://user-images.githubusercontent.com/47808461/172035840-ca2ee4dc-59f1-41bb-b0b6-e5f4f84c8bc4.gif)


#### 태그 필터링

선택된 태그가 있는 게시글만 보여줍니다.

![home-filter](https://user-images.githubusercontent.com/47808461/172035921-7272a28c-1cb5-4b56-9064-dd9b5a82c4cd.gif)

#### 좋아요

가입 사용자는 게시글에 좋아요를 토글할 수 있습니다.

![home-like](https://user-images.githubusercontent.com/47808461/172035960-d70b1951-3b56-4380-affe-dbad5baf5dda.gif)

#### 댓글

가입 사용자는 게시글에 댓글을 남길 수 있습니다.

![home-comment](https://user-images.githubusercontent.com/47808461/172035991-f74420b2-4f0d-4137-8d85-40247ef8b86a.gif)

### 작성 탭

#### 게시글 생성

글 작성 탭에서 게시글을 생성할 수 있습니다.
- 텍스트 작성
- 사진 첨부
- 태그 추가

![write](https://user-images.githubusercontent.com/47808461/172036063-203d5b1e-dbbe-4afa-ae65-45aa3caa68d7.gif)

#### 게시글 삭제

해당 게시글 작성자는 게시글을 삭제할 수 있습니다.

![home-delete](https://user-images.githubusercontent.com/47808461/172036120-93d9df7f-ceca-4bdd-84cf-4c752de29d66.gif)

#### 게시글 수정

해당 게시글 작성자는 게시글을 수정할 수 있습니다.
게시글 생성과 동일한 작업을 수행할 수 있습니다.

![post-edit](https://user-images.githubusercontent.com/47808461/172036236-6ce2ad9b-f0d1-478d-a392-99e024a8c094.gif)

### 회원가입 및 로그인

게시글 작성, 댓글 작성, 좋아요 요청, 마이 페이지 접근을 시도하면 사용자에게 로그인이 필요함을 알리고, 로그인 페이지로 이동시킵니다. 해당 페이지에서 구글 및 깃허브 계정을 통해 로그인할 수 있습니다. 

![signin](https://user-images.githubusercontent.com/47808461/172036701-f80a4deb-1d05-4880-bbc7-f1166d764ff9.gif)

### 마이 페이지

#### 내가 쓴 글/댓글 조회

마이 페이지 탭에서 내가 쓴 글과 댓글을 모아서 조회할 수 있습니다.
홈 탭과 마찬가지로 게시글을 수정하거나 삭제할 수 있습니다.

![mypage-read](https://user-images.githubusercontent.com/47808461/172036766-5cb10492-ebbb-49d3-8ae5-6a57d16fa481.gif)

#### 닉네임 변경 및 랜덤 닉네임

마이 페이지 탭에서 닉네임을 변경할 수 있습니다.
랜덤 닉네임 생성 버튼을 누르면 자동으로 닉네임을 생성합니다.
변경 버튼을 누르면 바뀐 닉네임이 반영됩니다.

![mypage-nickname](https://user-images.githubusercontent.com/47808461/172036912-28c5f0bf-18f3-4896-aa0f-3fe46d7744ad.gif)

#### 로그아웃 및 회원 탈퇴

마이 페이지 탭에서 로그아웃하거나 계정을 삭제시킬 수 있습니다.

![mypage-signout](https://user-images.githubusercontent.com/47808461/172036953-1c85b65c-039a-4783-b658-81e8feb7bfd2.gif)

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

## Contributor

[김하늘](https://github.com/lazy-sky)

ⓒ 2022. @lazy-sky. all rights reserved.
