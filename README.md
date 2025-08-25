### 1-1. react vite 초기 셋팅

1. npm create vite@latest my-app
2. cmd > typescript 선택
3. cd my-app
4. npm -g install yarn
5. yarn
6. yarn add -D @types/react @types/react-dom @types/node
7. yarn run dev 명령 후, 5173 로컬에서 정상적으로 실행되는지 확인
8. 초기 react, vite, yarn, typescript 설정 완료

---

### 1-2. react eslint, prettier 셋팅

1. yarn add -D eslint prettier eslint-plugin-react-hooks eslint-plugin-react-refresh @typescript-eslint/parser @typescript-eslint/eslint-plugin

- prettier : 개발 협업 관련 코드 포멧터 => 들여쓰기, 세미콜론, 줄바꿈 등, 협업 코드 스타일을 정렬해준다.
- eslint : 협업시, 문법검사 => 네이밍, 사용하지 않는 변수, 잘못된 hook, 타입스크립트 체크 (any, 함수 반환타입 명시)

2. /.prettierrc 파일 추가하기

3. /.eslintrc.cjs 파일 추가하기

4. eslintrc 각 프로퍼티 설명 (커스텀 셋팅은 블로그나 GPT 참조 (ex. any를 사용하고 싶지 않어))

- parserOptions : 문법 버전이나 js 버전 등 설정
- plugins: 규칙 라이브러리 설치 (임포트만 시키고, extends에서 사용해야함)
- extends: 설치된 라이브러리에서 규칙 세트를 상속받아서 씀 (plugin이나 기본 라이브러리)
- rules : 원하는 규칙을 커스텀하게 설정할 수 있음 (extends 중에 자신이 원하지 않는 부분을 고칠 수 있음, 혹은 extends 없이 개별적으로 사용 가능)
- parser: 코드를 읽는 방법 정의

---

### 1-3. 로그인 기능 구현 관련 라이브러리 설치학기

- yarn add axios react-router-dom

- axios : api 호출 함수
- react-router-dom : 페이지 이동, 파라미터 관련 기능 제공

---

### 1-4 msw 셋팅하기

- msw : api mock(가짜) 만드는 기능 라이브러리

- yarn add -D msw
- npx msw init public/ --save

- msw 셋팅하기

```
// src/mocks 코드 작성

authHandler : 로그인 mock api 함수
brower : 브라우저 용 설정

```
