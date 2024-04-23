# 🤔 DayToon
`react`와 `styled-components`를 사용한 초간단 도서 검색대 입니다.<br />
메인 페이지에서 `도서검색`을 할 수 있습니다 <br />
url에 `/admin`을 추가하면 어드민 페이지로 이동합니다.<br/>
어드민 페이지에서 도서를 `추가`, `수정`, `삭제`, `엑셀 업로드`, `엑셀 다운로드`, `로그아웃` 등의 기능을 수행할 수 있어요<br />
물론, 어드민 페이지는 로그인을 통해 관리자만 접근이 가능합니다.
로그인을 하지 않을경우 로그인페이지로 이동하여 `로그인` 및 `회원가입`이 가능합니다.

<br />
<br />
<br />

## ✨ Skill
> `react.js` `redux-toolkit` `styled-components` `react-icons` `crypto-js`

<br />
<br />
<br />

## ✨ Setup
**Step 1️⃣ 의존성을 설치해주세요.**
> ```
> yarn install
> ```
> or
> ```
> npm install
> ```

<br />

**Step 2️⃣ 리엑트 프로젝트 파일로 이동하여 빌드를 진행해주세요.**

> 파일이동
> ```
> cd daytoon-project
> ```

> 빌드
> ```
> yarn build
> ```
> or
> ```
> npm run build
> ```

<br />

**Step 2️⃣ 루트 디렉토리로 이동 후 개발 서버를 띄우고 확인해주세요.**
> 이전 디렉토리(루트 디렉토리)로 이동
> ```
> cd .. 
> ```

> server.js 실행
> ```
> yarn node server.js
> ```
> or
> ```
> node server.js
> or
> nodemon server.js
> ```

<br />

**Step 3️⃣ localhost:5000으로 접속해주세요.**
> <a href="http://localhost:5000">http://localhost:5000</a>


<br />

## ✨ Data
데이터 타입은 `/models/main`, `/models/member`에서 확인 가능합니다 :)

<br />
<br />
<br />

<!-- ## ✨ Implementation details
### 💡 로컬스토리지에 데이터 저장
https://github.com/qwe8851/sticker-memo-app/assets/101406386/56a4669a-1a95-4261-b85d-94c90e679994

- 처음 스키커메모를 실행하면, 
로컬스토리지의 값여부를 체크하고 값이 없을경우 초기더미데이터를 로컬스토리지에 데이터를 추가합니다.
- `새로운 메모 추가`, `메모 수정`, `메모 삭제`, `메모 업로드`, `메모 크기조절`, `메모 위치변경`, `메모 색상변경` 시 로컬스토리지가 업데이트됩니다.
- 비휘발성인 로컬스토리지에 데이터를 저장함으로써, 브라우저 종료 후 다시 열었을 때 메모의 내용을 다시 불러올 수 있습니다.
- 로컬스토리지의 데이터는 crypto-js를 사용하여 aes256로 암/복호화하여 보관합니다.

<br />

### 💡 새로운 메모 생성하는 두가지 방법
https://github.com/qwe8851/sticker-memo-app/assets/101406386/0a8f9c5d-263c-4a2b-aabb-5b5cff60ac68

- 스티커 메모의 메모리스트와, 메모 폼의 왼쪽 상단의 `+`버튼으로 새로운 메모 생성이 가능합니다.
- 메모의 제목은 **30**글자 이상 입력이 불가합니다.
- 메모의 내용은 **1,000**글자 이상 입력이 불가합니다.

<br />

### 💡 메모의 수정과 삭제
https://github.com/qwe8851/sticker-memo-app/assets/101406386/1c147e88-cc53-4317-bfc3-03d6ecc976da

- `Edit Memo`버튼을 클릭하면 선택된 메모를 수정 가능합니다.
- 메모의 제목은 **30**글자, 내용은 **1,000**글자까지 입력이 가능합니다.
- 메모 수정 중 Cancel 버튼을 클릭하면 해당 메모의 수정사항을 취소하고 이전 상태로 되돌아갑니다.
- `Delete Memo`버튼을 클릭하면 해당 메모를 삭제할 수 있습니다.
- **메모는 최소 1개 이상 존재**해야 하므로, 메모가 1개 있을 경우에는 해당 메모는 삭제가 불가합니다. 

<br />

### 💡 메모 색상변경
https://github.com/qwe8851/sticker-memo-app/assets/101406386/92d0e730-3eb6-4881-9e52-0e0b163f6860

- 메모 폼의 오른쪽 상단 `톱니바퀴`를 클릭하면 선택됨 메모지의 **배경 색상 변경**이 가능합니다.

<br />

### 💡 파일 다운로드 및 업로드
https://github.com/qwe8851/sticker-memo-app/assets/101406386/590b6dca-dfd9-4644-b310-ae283ea75987

- 메모 폼의 왼쪽 상단 `다운로드`버튼을 클릭하면 **.txt파일로 다운로드**가 가능합니다.
- 메모의 제목은 파일명, 내용은 파일내용으로 변환되어 저장됩니다.
- 메모 리스트에서 왼쪽 상단 `업로드`버튼을 클릭하면 파일 업로드가 가능합니다.
- **.txt파일만 업로드**가 가능하며 파일명은 메모 제목, 파일 내용은 메모 내용으로 변환되어 저장됩니다.

<br />

### 💡 메모 크기 및 위치 변경
https://github.com/qwe8851/sticker-memo-app/assets/101406386/fd151cc4-ae9b-4e28-8490-826896926ccf

- 메모의 오른쪽 하단을 클릭 후 움직이면 `크기 조절`이 가능합니다. 
- 메모 상단의 빈공간을 클릭하여 드래그 앤 드롭으로 `위치 변경`이 가능합니다. 
- 변경된 크기와 위치는 로컬스토리지에 저장되어 메모창을 다시 열어도 지정된 위치에서 열리게 됩니다. 
<br />
 -->
