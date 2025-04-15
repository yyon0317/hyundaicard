# HyundaiStore 프로젝트

이 저장소는 현대백화점 웹 페이지의 프론트엔드 구현 및 클론 프로젝트입니다. HTML, SCSS, JavaScript를 활용하여 현대백화점의 UI와 사용자 경험을 재현하는 데 중점을 둔 프로젝트입니다.

## 프로젝트 개요

### 주요 기능
- **정적 웹 페이지 구현**: HTML, SCSS, JavaScript를 사용한 현대백화점 웹사이트의 클론 구현
- **반응형 디자인**: 다양한 디바이스에서 일관된 사용자 경험 제공
- **애니메이션 및 인터랙션**: CSS와  jQuery,JavaScript를 활용한 사용자 인터페이스 개선
- **패럴랙스 효과 구현**: GSAP(https://greensock.com/gsap)를 활용한 다이나믹한 패럴랙스 효과 추가
- **웹 표준 및 접근성 준수**: 웹 표준 및 ARIA(Accessible Rich Internet Applications)를 준수하여 접근성을 개선
- **BUI 스타일 가이드 준수**: BUI(Basic User Interface)에서 정의한 기준에 따라 일관성 있고 최적화된 마크업 코드 작성
- **SCSS 기능 활용**: 중첩 규칙, 변수, 믹스인, 상속 등 SCSS의 다양한 기능을 활용한 효율적인 스타일 작성

### 목표
- 현대백화점 웹사이트의 UI 및 UX 학습
- 웹 개발 및 디자인 기술 향상
- 포트폴리오용 웹 프로젝트 제작
- **BUI 스타일 가이드 목적**: 마크업 개발자가 지켜야 할 기준을 제시하여, 일관성 있고 최적화된 코드로 불필요한 자원을 줄이고, 유지관리 시 작업능률 향상과 생산성 제고를 극대화함

## 사용 기술

- **프로그래밍 언어**: HTML, SCSS, JavaScript
- **프레임워크 및 라이브러리**: GSAP, jQuery
- **빌드 도구**: Gulp
- **버전 관리**: Git, GitHub
- **웹 표준 및 접근성 도구**: ARIA 적용

## 시작하기

### 필수 조건
- 웹 브라우저
- Git 설치 (선택 사항)
- Gulp 설치:
  ```bash
  npm install --global gulp-cli
  ```

### 설치

1. 저장소 클론:
   ```bash
   git clone https://github.com/yyon0317/hyundaicard.git
   cd hyundaicard
   ```

2. 종속성 설치:
   ```bash
   npm install
   ```

3. Gulp를 사용하여 빌드 실행:
   ```bash
   gulp
   ```

## 프로젝트 구조

```
HyundaiCard/
├── src/
│   ├── data/                  # 데이터 파일
│   ├── fonts/                 # 폰트 파일
│   ├── html/                  # HTML 파일
│   │   ├── bui/               # BUI 관련 HTML
│   │   │   ├── intro/         # BUI 인트로
│   │   │   ├── pages/         # BUI 페이지
│   │   │   └── partials/      # BUI 파셜 HTML
│   │   ├── front/             # MAIN HTML
│   │   │   ├── main/          # 메인 페이지
│   │   │   ├── pages/         # 기타 페이지
│   │   │   └── partials/      # 공통 파셜 HTML
│   ├── img/                   # 이미지 파일
│   │   ├── common/            # 공통 이미지
│   │   ├── guide/             # 가이드 이미지
│   │   └── main/              # 메인 이미지
│   ├── js/                    # JavaScript 파일
│   │   ├── libs/              # 라이브러리 파일
│   │   │   ├── jquery-3.6.0.min.js
│   │   │   ├── slick.min.js
│   │   │   ├── gsap.min.min.js
│   │   │   ├── jquery.marquee.min.js
│   │   │   ├── ScrollTrigger.min.js
│   │   │   └── swiper-bundle.min.min.js
│   │   └── common.js          # 공통 스크립트
│   ├── scss/                  # SCSS 파일
│   │   ├── bui/               # BUI 관련 SCSS
│   │   │   ├── components/    # 컴포넌트 스타일
│   │   │   ├── config/        # 설정 스타일
│   │   │   ├── fonts/         # 폰트 스타일
│   │   │   ├── helper/        # 헬퍼 스타일
│   │   │   ├── layout/        # 레이아웃 스타일
│   │   │   ├── plugins/       # 플러그인 스타일
│   │   │   ├── _reset.scss    # reset 스타일
│   │   │   └── common.scss    # common 스타일
│   │   ├── front/             # BUI 관련 SCSS
│   │   │   ├── components/    # 컴포넌트 스타일
│   │   │   ├── config/        # 설정 스타일
│   │   │   ├── fonts/         # 폰트 스타일
│   │   │   ├── helper/        # 헬퍼 스타일
│   │   │   ├── layout/        # 레이아웃 스타일
│   │   │   ├── plugins/       # 플러그인 스타일
│   │   │   ├── _reset.scss    # reset 스타일
│   │   │   └── common.scss    # common 스타일
│   │   └── plugins/           # BUI 관련 SCSS
├── gulpfile.js                # Gulp 설정 파일
├── package.json               # 프로젝트 의존성 정보
├── package-lock.json          # 의존성 잠금 파일
├── index.html                 # 메인 HTML 파일
└── README.md                  # 프로젝트 설명
```


감사합니다. 
