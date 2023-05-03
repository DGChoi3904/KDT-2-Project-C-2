# 2조 newdevs

Project name = 'IA'  
임시 프로젝트 이름 : '이야'

## 구성인원

| 구분 | 이름    |
| :--: | :------ |
| 팀장 | 박준형★ |
| 팀원 | 장루빈  |
|      | 권예준  |
|      | 곽윤호  |
|      | 성해경  |

## 프로젝트 목표

90 ~ 00년대 사람에게 친숙한 매체인 포켓몬스터와 디지몬 api를 활용하여 지인 또는 처음 보는 사람들과 자유롭게 소통할 수 있는 공간 제작

## 제작 순서

### _**1. 설계를 근거로 DB 제작, Table구성**_

- Database 이름 : 'IA'
  - IA를 구글에 검색하였을 때 나온 결과인 '이야'가 인상이 깊었기에 <u>팀원과 합의 과정을 거쳐</u> 임시 서비스 네임으로 결정 - _(23.03.31)_
  - 워크벤치와 Command Line Client를 병행하며 사용하기로 결정.  
    -> 워크벤치는 사용 법을 아는 기준 하에 사용 가능하며, 처음 사용하는 기능이나 워크벤치로 찾아 볼 수 있었던 기능은 추후 개인 연습 과정을 거쳐 CLI로도 사용이 가능하도록 연습할 예정 - _(23.03.31)_
- DBMS : 팀 회의 간 협의를 거쳐
  > MySQL 사용하기로 결정 - _(23.03.31)_
- DB 접속 계정
  |ID|memo|
  |:---:|:---|
  |root|'localhost'전용|
  |admin_개발자|개발자 전용 모든 권한 계정|
  |sign_master|로그인 전용 계정 - SELECT,INSERT만 가능|
  - root : 'localhost'전용 계정으로 DB가 설치 된 데스크탑에서만 사용할 예정
  - admin_개발자 : 5명이 각각의 모든 권한을 가진 접속 계정을 가짐 - _(23.03.31)_
    - 5명 모두 CLI로 계정 만들기 시도 -> 권한 부여까지 완료 하였음
      - CLI로 접속 권한 설정하였으나 query문 기재 시 DB에 대한 권한만 부여하고 table에 대한 권한부여를 놓쳤으며, 워크벤치 작업 중 알게되어 워크벤치로 추가적인 권한부여 작업을 진행함. 이 부분에 대해서는 추후 개인 연습을 통해 테이블의 권한까지 CLI로 부여하는 것을 연습하기로 결정 - _(23.03.31)_
  - sign_master : user_information 테이블에서 SELECT, INSERT 권한만 가지고 있는 계정. - _(23.04.21)_
- Table 구성 :
  - user_information - _(23.03.31)_
    - 회원가입시 정보 저장 테이블 :
      아이디, 비밀번호 등 기초적인 회원의 정보를 저장하고 관리하는 테이블
      - 총 11개의 열이 있으며
        - 데이터 타입으로는 INT,VARCHAR, BIGINT, TINYINT, TIMESTAMP 사용
        - Default설정으로는 Not Null, Auto_increment, Current_timestamp 사용

### _**2. 로그인, 회원가입에 필요한 페이지 제작**_

**회원가입**
1. createAccount.html - 회원가입을 진행할 페이지 _(23.04.12)_
  - form태그를 포함, 클라이언트가 서비스에 데이터를 인풋 할 때 사용
2. accountSuccess.html - _(23.04.12)_
  - 회원가입이 완료 되었을 때 출력 될 페이지
  - 로그인 버튼이 포함되어있습니다

**로그인**
1. login.html - _(23.04.12)_
  - 회원가입시 입력했던 데이터 중 ID와 PW의 데이터를 서버로 보내는 form 태그 포함
  - 로그인과 계정찾기, 회원가입 버튼과 링크가 포함되어있습니다.
2. loginFail.html - _(23.04.12)_
  - 로그인 페이지와 생김새나 처리 로직이 같지만 로그인에 실패하였다는 메세지를 포함하고 있습니다
3. findAccount.html - _(23.04.12)_
  - 계정에 대한 데이터를 잊어버렸을 때, 본인인증을 완료하면, 비밀번호를 초기화 시켜주는 페이지

**메인페이지**
- index.html
  - 로그인, 회원가입을 포함하고 있습니다. - _(23.04.12)_

### _**3. server controller.js 생성**_

1. 페이지 요청에 대한 응답을 실행하는 controller.js파일 생성 - _(23.04.13)_
2. 로직 공통 부분 제작 - _(23.04.13)_
3. responseModule.js 모듈 적용을 통해 리팩토링 진행 - _(23.04.25)_

### _**4. 환경변수 파일을 이용하여 DBConnect 만들기**_

1. .env파일 생성, 환경 변수를 입력 - _(23.04.13)_
2. DBConfig.js파일을 생성 - _(23.04.13)_
  - 로그인, 회원가입 시 사용 될 DBConnector를 export하는 모듈

### _**5. 프로젝트 폴더링**_

- 서비스의 파일 및 폴더의 구조화 진행 - _(23.04.19)_

### _**6. 회원가입, 로그인 기능 도입**_

**회원가입**
1. createAccount페이지로부터 받은 클라이언트 인풋 데이터를 서버에서 json파일로 생성 - _(23.04.21)_
2. json파일을 이용하여 데이터베이스의 멤버 테이블에 데이터 입력 - _(23.04.21)_

**로그인**
1. login페이지와 loginFail페이지에서 받은 클라이언트 인풋 데이터를 서버에서 json파일로 생성 - _(23.04.21)_
2. json파일의 데이터와 멤버 테이블에 존재하는 데이터를 대조 - _(23.04.21)_


### _**7. 모듈화 도입**_
1. tagMaker.js
  - HTML의 태그 생성용 모듈 생성 - _(23.04.24)_
  - 해당 모듈로 모든 페이지 태그 생성 방식 통일화 - _(23.04.24)_
2. responseModule.js
  - controller.js 파일 내 request별 중복되는 response.writeHead/write/end 부분 모듈 생성 - _(23.04.25)_a# 2조 newdevs

Project name = 'IA'  
임시 프로젝트 이름 : '이야'

## 구성인원

| 구분 | 이름    |
| :--: | :------ |
| 팀장 | 박준형★ |
| 팀원 | 장루빈  |
|      | 권예준  |
|      | 곽윤호  |
|      | 성해경  |

## 프로젝트 목표

90 ~ 00년대 사람에게 친숙한 매체인 포켓몬스터와 디지몬 api를 활용하여 지인 또는 처음 보는 사람들과 자유롭게 소통할 수 있는 공간 제작

## 제작 순서

### _**1. 설계를 근거로 DB 제작, Table구성**_

- Database 이름 : 'IA'
  - IA를 구글에 검색하였을 때 나온 결과인 '이야'가 인상이 깊었기에 <u>팀원과 합의 과정을 거쳐</u> 임시 서비스 네임으로 결정 - _(23.03.31)_
  - 워크벤치와 Command Line Client를 병행하며 사용하기로 결정.  
    -> 워크벤치는 사용 법을 아는 기준 하에 사용 가능하며, 처음 사용하는 기능이나 워크벤치로 찾아 볼 수 있었던 기능은 추후 개인 연습 과정을 거쳐 CLI로도 사용이 가능하도록 연습할 예정 - _(23.03.31)_
- DBMS : 팀 회의 간 협의를 거쳐
  > MySQL 사용하기로 결정 - _(23.03.31)_
- DB 접속 계정
  |ID|memo|
  |:---:|:---|
  |root|'localhost'전용|
  |admin_개발자|개발자 전용 모든 권한 계정|
  |sign_master|로그인 전용 계정 - SELECT,INSERT만 가능|
  - root : 'localhost'전용 계정으로 DB가 설치 된 데스크탑에서만 사용할 예정
  - admin_개발자 : 5명이 각각의 모든 권한을 가진 접속 계정을 가짐 - _(23.03.31)_
    - 5명 모두 CLI로 계정 만들기 시도 -> 권한 부여까지 완료 하였음
      - CLI로 접속 권한 설정하였으나 query문 기재 시 DB에 대한 권한만 부여하고 table에 대한 권한부여를 놓쳤으며, 워크벤치 작업 중 알게되어 워크벤치로 추가적인 권한부여 작업을 진행함. 이 부분에 대해서는 추후 개인 연습을 통해 테이블의 권한까지 CLI로 부여하는 것을 연습하기로 결정 - _(23.03.31)_
  - sign_master : user_information 테이블에서 SELECT, INSERT 권한만 가지고 있는 계정. - _(23.04.21)_
- Table 구성 :
  - user_information - _(23.03.31)_
    - 회원가입시 정보 저장 테이블 :
      아이디, 비밀번호 등 기초적인 회원의 정보를 저장하고 관리하는 테이블
      - 총 11개의 열이 있으며
        - 데이터 타입으로는 INT,VARCHAR, BIGINT, TINYINT, TIMESTAMP 사용
        - Default설정으로는 Not Null, Auto_increment, Current_timestamp 사용

### _**2. 로그인, 회원가입에 필요한 페이지 제작**_

**회원가입**
1. createAccount.html - 회원가입을 진행할 페이지 _(23.04.12)_
  - form태그를 포함, 클라이언트가 서비스에 데이터를 인풋 할 때 사용
2. accountSuccess.html - _(23.04.12)_
  - 회원가입이 완료 되었을 때 출력 될 페이지
  - 로그인 버튼이 포함되어있습니다

**로그인**
1. login.html - _(23.04.12)_
  - 회원가입시 입력했던 데이터 중 ID와 PW의 데이터를 서버로 보내는 form 태그 포함
  - 로그인과 계정찾기, 회원가입 버튼과 링크가 포함되어있습니다.
2. loginFail.html - _(23.04.12)_
  - 로그인 페이지와 생김새나 처리 로직이 같지만 로그인에 실패하였다는 메세지를 포함하고 있습니다
3. findAccount.html - _(23.04.12)_
  - 계정에 대한 데이터를 잊어버렸을 때, 본인인증을 완료하면, 비밀번호를 초기화 시켜주는 페이지

**메인페이지**
- index.html
  - 로그인, 회원가입을 포함하고 있습니다. - _(23.04.12)_

### _**3. server controller.js 생성**_

1. 페이지 요청에 대한 응답을 실행하는 controller.js파일 생성 - _(23.04.13)_
2. 로직 공통 부분 제작 - _(23.04.13)_
3. responseModule.js 모듈 적용을 통해 리팩토링 진행 - _(23.04.25)_

### _**4. 환경변수 파일을 이용하여 DBConnect 만들기**_

1. .env파일 생성, 환경 변수를 입력 - _(23.04.13)_
2. DBConfig.js파일을 생성 - _(23.04.13)_
  - 로그인, 회원가입 시 사용 될 DBConnector를 export하는 모듈

### _**5. 프로젝트 폴더링**_

- 서비스의 파일 및 폴더의 구조화 진행 - _(23.04.19)_

### _**6. 회원가입, 로그인 기능 도입**_

**회원가입**
1. createAccount페이지로부터 받은 클라이언트 인풋 데이터를 서버에서 json파일로 생성 - _(23.04.21)_
2. json파일을 이용하여 데이터베이스의 멤버 테이블에 데이터 입력 - _(23.04.21)_

**로그인**
1. login페이지와 loginFail페이지에서 받은 클라이언트 인풋 데이터를 서버에서 json파일로 생성 - _(23.04.21)_
2. json파일의 데이터와 멤버 테이블에 존재하는 데이터를 대조 - _(23.04.21)_


### _**7. 모듈화 도입**_
1. tagMaker.js
  - HTML의 태그 생성용 모듈 생성 - _(23.04.24)_
  - 해당 모듈로 모든 페이지 태그 생성 방식 통일화 - _(23.04.24)_
2. responseModule.js
  - controller.js 파일 내 request별 중복되는 response.writeHead/write/end 부분 모듈 생성 - _(23.04.25)_

### _**8. 공용 CSS 제작, 웹 디자인**_
1. 공통 CSS 적용
  - 각 파일에서 common.css 호출 
2. 중복되는 코드 제거 혹은 주석처리
  - 작업 내용 주석, 팀 노션에 남겨둠
3. img 폴더 생성
  - root/src/views/img
4. controller 내용 추가 및 수정
  - 이미지 파일 불러올 때 MIME, Charset 값이 달라 별도로 함수 제작
  - 기존 조건문 includes()에서 endswith()로 변경