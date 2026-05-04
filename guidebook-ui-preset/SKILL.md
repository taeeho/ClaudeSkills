---
name: guidebook-ui-preset
description: AX팀 "Claude 가이드북" 사이트(claude-guide-weld.vercel.app) 스타일을 그대로 물려받은 React + Vite + Tailwind 프리셋. 크림색 페이퍼 톤 + 티얼/오렌지 2컬러 악센트, PageShell/Section/Steps/Tabs/Callout 컴포넌트 체계로 가이드·가이드북·내부 매뉴얼·랜딩 페이지를 바로 preview 가능한 상태까지 스캐폴딩합니다. 사용자가 "/가이드북느낌" 커맨드를 치거나, "가이드북 스타일로", "AX 톤으로", "claude-guide처럼" 같이 이 프리셋을 명시적으로 요구할 때만 사용하세요. 일반적인 새 React 프로젝트에는 자동으로 적용하지 마세요.
---

# Guidebook UI Preset

이 스킬은 사용자가 좋아하는 **Claude 가이드북 사이트(`claude-guide-weld.vercel.app`)의 UI 언어**를 다른 프로젝트에 그대로 이식합니다.

**스택 전제**: React 18 + Vite 6 + Tailwind 3 + react-router-dom 7.
다른 스택(Next.js, 순수 HTML 등)은 **현재 미지원** — 요청 들어오면 사용자와 먼저 확인 후 이 스킬의 토큰/규칙만 참고해 수동 이식.

---

## 1. 언제 실행하나

- `/가이드북느낌` 슬래시 커맨드가 호출됐을 때
- 사용자가 "가이드북 스타일로", "이 톤으로", "AX 스타일 UI" 같이 **명시적으로** 이 프리셋을 지목했을 때

그 외에는 개입하지 말 것. 일반 "React 페이지 만들어줘" 요청엔 자동 적용 금지.

---

## 2. 실행 흐름 (반드시 Plan → 승인 → 실행)

### STEP A. 현재 상태 파악

Bash + Read로 현재 작업 디렉토리를 확인:

1. `package.json` 존재 여부
2. `tailwind.config.js` / `vite.config.js` 존재 여부
3. `src/` 구조 (기존 파일 있는가?)
4. git 초기화 여부 (있어도 건드리지 않음)

상태에 따라 두 가지 모드:

| 모드 | 판단 기준 | 동작 |
|---|---|---|
| **🆕 새 프로젝트** | 디렉토리가 비었거나 `package.json` 없음 | 전체 스캐폴딩 |
| **🔁 기존 프로젝트에 적용** | 이미 Vite+React+Tailwind가 돌아감 | 토큰·컴포넌트만 병합 (기존 파일 덮어쓰기 전 사용자 확인) |

기존 프로젝트가 **Vite/React/Tailwind가 아닌** 경우엔 멈추고 사용자에게 알림:
> "이 스킬은 React+Vite+Tailwind만 지원해요. 이 프로젝트는 XXX로 보이는데 어떻게 할까요?"

### STEP B. Plan 제시

**반드시 아래 항목을 모두 담아** 짧은 Plan을 만들고 사용자에게 승인 요청:

- 새로 만들 파일 목록 (경로 + 역할)
- 수정할 파일 목록 (있다면)
- 설치할 의존성 (정확한 버전은 `reference/package.sample.json` 참고)
- Preview 실행 방법 (`npm run dev` 또는 `npx vite`)
- 사용자가 결정해야 할 입력값 질문:
  - 프로젝트 이름 / 사이트 제목 / 부제
  - 기본 톤 선택: `teal` 기본 / `orange` 강조 (홈 카드 몇 개·섹션별)
  - Footer의 조직명·이메일·외부 링크 (없으면 생략 가능)

### STEP C. Plan 승인 후 파일 생성

다음 파일들을 `reference/` 폴더의 원본을 복사·치환해 생성:

| 대상 경로 | 원본 |
|---|---|
| `tailwind.config.js` | `reference/tailwind.config.js` (그대로) |
| `postcss.config.js` | `reference/postcss.config.js` (그대로) |
| `vite.config.js` | `reference/vite.config.js` (그대로) |
| `index.html` | `reference/index.html` (`__PROJECT_TITLE__` 치환) |
| `package.json` | `reference/package.sample.json` (`__PROJECT_NAME__` 치환) |
| `src/index.css` | `reference/index.css` (그대로) |
| `src/main.jsx` | `reference/main.jsx` (그대로) |
| `src/App.jsx` | `reference/App.sample.jsx` (라우트는 실제 페이지에 맞게) |
| `src/components/primitives.jsx` | `reference/primitives.jsx` (그대로) |
| `src/components/Nav.jsx` | `reference/Nav.jsx` (links 배열은 실제 라우트에 맞게) |
| `src/components/Footer.jsx` | `reference/Footer.jsx` (그대로 — props로 주입) |
| `src/pages/HomePage.jsx` | `reference/HomePage.sample.jsx` (카드 내용은 실제에 맞게) |
| 필요한 서브 페이지 | `reference/SamplePage.sample.jsx` 참고해 새로 |

### STEP D. 의존성 설치 + Preview

```bash
npm install
npm run dev
```

`dev` 서버 뜨면 주소(`http://localhost:5173`)를 사용자에게 알려주고,
여유되면 Playwright MCP로 실제 렌더 확인 + 스크린샷 한 장.

### STEP E. 확장이 필요하면

사용자가 "이런 페이지 추가해줘", "이 부분 다른 톤으로" 같은 요청을 하면
**이 스킬의 컴포넌트/토큰 규칙 범위 안에서만** 페이지를 추가·수정.
새로운 컴포넌트가 필요하면 `reference/primitives.jsx`의 네이밍/스타일 컨벤션을 따라 작성하고, 사용자 동의 후 원본에 반영할지 물어볼 것.

---

## 3. 디자인 토큰·규칙

전체 토큰과 쓰임은 `reference/tokens.md` 참고. 핵심만:

- **배경**: 크림 페이퍼 `#FAF9F5` / 소프트 `#F2EEE5` / 화이트 `#FFFFFF`
- **텍스트**: ink `#1F1E1B` / inksoft `#5C5A52` / inkmuted `#8A877E`
- **악센트 2컬러 원칙**: `teal`(정보·기본) vs `accent`(실습·CTA). 한 섹션에서 혼용 금지.
- **라운드 3단**: `r1=8` / `r2=12` / `r3=18`
- **반응형**: 모바일 타이트(`px-3`), `sm:` 기점 넉넉(`px-7`~`px-9`)
- **폰트**: Pretendard(sans) + JetBrains Mono(code)

---

## 4. 컴포넌트 사용 규칙

| 컴포넌트 | 쓰임 | 주의 |
|---|---|---|
| `PageShell` | 홈이 아닌 서브 페이지 **최상단 래퍼** | `backTo`, `backLabel` 필수 |
| `Section` | 페이지 내 주제 단위 | `tone="teal"` 기본, 실습·주의는 `"orange"` |
| `Steps` + `Step` | 순서 있는 절차 | 2~6개 사이가 가독성 최상 |
| `Tabs`/`Tab`/`TabPane` | OS별·플랫폼별 분기 | `initial` 꼭 지정 |
| `Callout tone="info\|warn"` | 짧은 강조 | 한 섹션에 1~2개로 자제 |
| `CodeBlock` | 복사 버튼 달린 다크 코드 | `copyText` prop에 실제 복사 내용 |
| `Shot` | 스크린샷 | 클릭 라이트박스 포함. 데스크톱 스크린샷 권장 |
| `ImagePlaceholder` | 이미지 준비 전 자리표시 | 최종 배포 전엔 `Shot`으로 교체 |
| `Kbd` | 키보드 키 | `<Kbd>Ctrl</Kbd>+<Kbd>C</Kbd>` 형태 |

---

## 5. 하지 말 것

- 기본 톤(`teal`)과 악센트 톤(`orange`)을 같은 섹션에서 동시에 악센트로 쓰지 말 것
- 화려한 그라디언트·네온색 추가 금지 (히어로 제목 `.grad-text`만 예외)
- 그림자 `lg2`는 모달·라이트박스 전용. 카드엔 `sm2`/`md2`까지만.
- 모바일 패딩을 `p-5` 이상으로 잡지 말 것 (원본은 모바일 `p-3` 기준)
- React 외 스택에 이 스킬을 억지로 맞추지 말 것 — 멈추고 사용자에게 확인

---

## 6. 파일 목록 (이 스킬 폴더 안)

```
guidebook-ui-preset/
├── SKILL.md                  # 지금 이 파일
└── reference/
    ├── tailwind.config.js    # 디자인 토큰 정의
    ├── postcss.config.js
    ├── vite.config.js
    ├── index.html            # __PROJECT_TITLE__ 치환
    ├── index.css             # 글로벌 + code 스타일
    ├── main.jsx
    ├── App.sample.jsx        # 라우터 샘플
    ├── Nav.jsx               # 상단 네비 (title/sub props)
    ├── Footer.jsx            # 푸터 (org/email/link props)
    ├── HomePage.sample.jsx   # 홈 카드 그리드 샘플
    ├── SamplePage.sample.jsx # PageShell + Section 조합 예시
    ├── primitives.jsx        # 공통 컴포넌트 모음
    ├── package.sample.json   # 의존성 버전
    └── tokens.md             # 색/타이포/간격 규칙 상세
```

---

## 7. 확장 가이드 (필요할 때만)

다음 스택이 요청되면 사용자에게 먼저 확인:
- Next.js: `HashRouter` 대신 App Router, `Link`·`useLocation`도 Next용으로 교체 필요
- 다크 모드: 현재 페이퍼 톤 기반. 필요하면 `dark:` 변형 별도 정의 필요
- i18n: 현재 한국어 하드코딩. 필요하면 `react-i18next` 등 도입

이런 확장이 들어오면 이 SKILL.md를 업데이트하고, 예제는 `reference/`에 추가 파일로 저장.
