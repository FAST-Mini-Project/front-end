# 📑 당연해 (DangYeonHae)

<p>React, TypeScript, Rest API를 활용한 연차 / 당직 관리 웹사이트 입니다.</p>

<br />

## 프로젝트 소개

> **패스트캠퍼스 프론트엔드 개발 부트캠프 5기**<br />
> **개발 기간** : 2023. 07. 24 ~ 2023. 08. 10<br />
> **배포 주소** : [당연해](https://dev--boisterous-nasturtium-8f3a3d.netlify.app/)<br />
> **프론트엔드 레포지토리** : [프론트](https://github.com/FAST-Mini-Project/front-end)<br />
> **백엔드 레포지토리** : [백엔드](https://github.com/FAST-Mini-Project/back-end)
<br />

## 개발자

| **[황인승](https://github.com/hwanginseung)** | **[김경원](https://github.com/ruddnjs3769)** | **[윤금엽](https://github.com/DevYBecca)** |


<br />

## 사용기술 및 개발환경

### Development

<p>
<img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white" />
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=TypeScript&logoColor=white" />
<img src="https://img.shields.io/badge/Sass-CC6699?style=flat&logo=Sass&logoColor=white" />
<br />
<img src="https://img.shields.io/badge/Ant Design-0170FE?style=flat&logo=antdesign&logoColor=white" />
</p>

### Config

<p>
<img src="https://img.shields.io/badge/Vite-646CFF?style=flat&logo=Vite&logoColor=white"/></a>
<img src="https://img.shields.io/badge/npm-CB3837?style=flat&logo=npm&logoColor=white"/></a>
</p>

### Deployment

<img src="https://img.shields.io/badge/netlify-00C7B7?style=flat&logo=netlify&logoColor=white"/></a>

### Environment

<p>
<img src="https://img.shields.io/badge/Visual Studio Code-007ACC?style=flat&logo=Visual Studio Code&logoColor=white"/></a>
<img src="https://img.shields.io/badge/Git-F05032?style=flat&logo=Git&logoColor=white"/></a>
<img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=GitHub&logoColor=white"/></a>
</p>

### Cowork Tools
<p>
<img src="https://img.shields.io/badge/Slack-4A154B?style=flat&logo=Slack&logoColor=white" />
<img src="https://img.shields.io/badge/Notion-000000?style=flat&logo=Notion&logoColor=white" />
<img src="https://img.shields.io/badge/Zoom-2D8CFF?style=flat&logo=Zoom&logoColor=white" />
</p>

<br />

## 프로젝트 테스트

### clone project

```bash
$ git clone https://github.com/FAST-Mini-Project/front-end.git
```

### install npm

```bash
$ npm install
```

### start project

```bash
$ npm run dev
```

<br />



## 프로젝트 상세 기능

### Main
+ DatePicker 이용하여 날짜별 데이터 출력
+ 일일, 월간, 연간, 전체 통계(지출, 수입, 총합) 출력
+ 일일, 주간, 월간, 전체 리스트 출력
+ 가계추가(/add) 페이지 이동 버튼 구현
#### 일일 (/main/daily)
+ 선택한 달을 기준으로, 각 일별 데이터 출력 (기본값 : 현재 연도, 월, 일)
+ 일별 지출, 수입 통계 표시
+ 컴포넌트로 태그, 내용, 금액, 시간 표시
+ 컴포넌트 클릭 시 수정(/edit) 페이지로 이동
#### 주간 (/main/weekly)
+ 선택한 달을 기준으로, 각 주간별 데이터 출력 (기본값 : 현재 연도, 월)
+ 주간별 지출, 수입 통계 표시
+ 주간 데이터 클릭 시 해당 주간의 일일 데이터 출력 (태그, 내용, 금액, 시간 등)
#### 월간 (/main/monthly)
+ 월별 기간, 지출, 수입 통계 표시
+ 선택한 연도를 기준으로, 각 월별 데이터 출력 (기본값 : 현재 연도)
+ 월간별 지출, 수입 통계 표시
+ 각 월 컴포넌트 클릭 시 해당 월의 모든 주간별 통계 표시 (지출, 수입)
### Add
+ ➕ 버튼 클릭 시 가계 추가 페이지로 이동
+ 날짜, 시간, 금액, 태그, 내용 입력 가능
+ 지출, 수입 버튼으로 구분하여 사용
+ 날짜, 시간: 각각 HTML Input 태그의 date, time 타입 이용 (기본값 : 현재 날짜, 시간)
+ 태그: HTML select 태그 이용, 지출, 수입 활성화 여부에 따라 변경됨

### Edit
+ 일일 데이터 클릭 시 해당 데이터 수정 페이지 이동
+ 날짜, 시간, 금액, 태그, 내용 등 기존 데이터 수정 기능
+ 삭제하기 버튼 클릭시 데이터 삭제 기능 

## 관리자 페이지
+ 관리자 아이디 외 접근불가 
 - 접근시 로그인 페이지로 이동
  
### 사원 관리
+ 사내 모든 사원 리스트 출력
+ 사원명, 이메일, 잔여 연차, 당직 근무일 수 출력
+ 사원명 검색 기능
+ 사원명, 잔여 연차, 당직 근무일 수로 정렬 가능
+ 10명씩 pagenation
  
### 당직관리
+ 당직 근무자 캘린더 형식으로 출력
+ 달력 일일 칸에 근무자 출력, 근무 취소 기능
+ 해당 일 클릭시, 당직 근무자 설정 가능
+ 오늘 이전 날짜의 당직 근무자는 변경 불가능
  
### 연차관리
+ 연차 신청 목록, 취소 신청 목록 2가지 목록 출력
+ 연차 신청 목록 
  - 연차를 신청한 사원명, 연차 날짜 출력, 관리자가 연차의 승인/거부 가능
+ 취소 신청 목록 
  - 승인된 연차를 사원이 변경 신청을 한 경우 
    사원명, 연차 날짜 출력, 관리자가 취소신청의 승인/거부 가능
+ 사원명 검색 기능
+ 사원명, 날짜별 정렬 기능


### 기타 기능
+ uuid 사용하여 중복 없는 사용자 id 및 무작위 닉네임 자동생성, localStorage로 관리
+ loadable 사용하여 코드 스플릿 및 로딩 컴포넌트 추가
+ day.js 및 moment 사용하여 날짜 포멧팅


<br />

## 프로젝트 구조
