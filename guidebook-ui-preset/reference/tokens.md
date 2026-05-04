# Guidebook UI — 디자인 토큰 & 규칙

## 🎨 색 팔레트

### 배경 & 표면
| 역할 | 토큰 | HEX | 쓰임 |
|---|---|---|---|
| 페이지 배경 | `bg` | `#FAF9F5` | body 바탕 (크림톤) |
| 부드러운 배경 | `bgsoft` | `#F2EEE5` | Section 헤더 그라데이션 시작, Kbd, Tabs 바 |
| 종이 | `paper` | `#FFFFFF` | 카드/섹션 본체 |

### 텍스트
| 역할 | 토큰 | HEX | 쓰임 |
|---|---|---|---|
| 본문 | `ink` | `#1F1E1B` | 제목/강조 텍스트 |
| 보조 | `inksoft` | `#5C5A52` | 설명 문단 |
| 희미 | `inkmuted` | `#8A877E` | 메타/footer/오버레이 |

### 선
| 역할 | 토큰 | HEX |
|---|---|---|
| 기본 선 | `line` | `#E6E1D6` |
| 강조 선 (호버) | `linestrong` | `#D4CDBE` |

### 악센트 (2컬러 규칙)
| 톤 | 토큰 | 본 | 배경 | 쓰임 |
|---|---|---|---|---|
| 오렌지 | `accent` / `accentsoft` | `#C2410C` | `#FBEADD` | 실습·CTA·주요 강조 |
| 티얼 | `teal` / `teal-soft` | `#0F766E` | `#E6F2F0` | 정보·설명·기본 톤 |
| 경고 | `warn` / `warn-soft` | `#B45309` | `#FDF3D8` | Callout warn 톤 |
| 빨강 | (하드코딩) | `#B4281E` / `#FCE9E7` | — | 안전·위험 카드 |

**원칙**: 한 섹션에서 두 가지 악센트 이상 혼용하지 않는다 (teal OR orange). 빨강은 "하면 안 되는 것" 같은 경고 한정.

### 코드
| 역할 | HEX |
|---|---|
| 코드 배경 | `#1B1B19` |
| 코드 텍스트 | `#F2EFE6` |
| 코드 프롬프트 | `#7BC596` |

---

## ✏️ 타이포

- **Sans**: Pretendard → Inter → system
- **Mono**: JetBrains Mono → Fira Code → Menlo
- 본문 `line-height: 1.65`
- 레터스페이싱:
  - 히어로 제목: `-0.025em`
  - 섹션 제목: `-0.02em`
  - Step/카드 제목: `-0.01em`
  - 탭/eyebrow: `.06em~.08em` (uppercase)

### 크기 스케일
| 용도 | 모바일 | 데스크톱 (`sm:`) |
|---|---|---|
| 히어로 h1 | 36 | 48~56 |
| 섹션 h2 | 24 | 32 |
| 카드/Step 제목 | 15~18 | 17~19 |
| 본문 | 14 | 14.5~15.5 |
| 메타/Eyebrow | 11~12 | 12~13.5 |

---

## 📐 간격 / 레이아웃

- 최대 폭: `max-w-[1100px]` (본문) · `max-w-[1200px]` (Nav/히어로)
- 섹션 사이: `mt-14`
- **반응형 원칙**: 모바일은 패딩 좁게(`px-3`/`px-4`/`p-3`), `sm:` 기점 넉넉히(`px-7`/`px-9`/`p-5`)
- 라운드 `r1=8` / `r2=12` / `r3=18` — 작을수록 안쪽 요소, 클수록 감싸는 섹션
- 그림자:
  - `sm2` — 카드 평시
  - `md2` — 카드 호버
  - `lg2` — 모달·라이트박스

---

## 🧩 컴포넌트 역할

| 컴포넌트 | 언제 |
|---|---|
| `PageShell` | 홈 외 서브 페이지 래퍼 (뒤로가기 + 스크롤 리셋) |
| `Section` | 페이지 안의 주제 단위. `tone="teal"` 기본, 주의/실습은 `orange` |
| `Steps` / `Step` | 순서 있는 절차 설명 |
| `Tabs` + `TabList`/`Tab`/`TabPane` | OS별·플랫폼별 분기 설명 |
| `OsBanner` | 탭 안 구분선 겸 OS 라벨 |
| `Callout` | `info`(teal) / `warn`(amber) 짧은 강조 박스 |
| `CodeBlock` + `CodeLine` | 복사 버튼 달린 다크 코드박스 |
| `Shot` | 스크린샷 (클릭 시 확대 라이트박스) |
| `ImagePlaceholder` | 이미지 준비 전 자리표시 |
| `Kbd` | 키보드 키 inline 표시 |

---

## 🎯 홈 카드 패턴 (3-tone)

```js
const toneClass = {
  orange: { tag: 'bg-accentsoft text-accent',    ring: 'hover:border-accent hover:bg-accentsoft/40' },
  teal:   { tag: 'bg-teal-soft text-teal',       ring: 'hover:border-teal hover:bg-teal-soft/50'    },
  red:    { tag: 'bg-[#FCE9E7] text-[#B4281E]',  ring: 'hover:border-[#B4281E] hover:bg-[#FCE9E7]/50' }
}
```

- 카드 그리드: 모바일 1열 → `sm:` 2열 → `lg:` 3~4열
- 좌상단 숫자 배지(ink 배경), 우상단 태그(톤별 soft 배경)

---

## ✨ 모션

- `animate-fade` — 페이지/탭 진입 (0.25s)
- `animate-slide` — 모바일 메뉴 드롭다운 (0.2s)
- Nav 블러: `backdrop-filter: blur(14px)` + 반투명 바탕

---

## 🚫 안 쓰는 것

- 화려한 그라디언트 (히어로 텍스트 `.grad-text`만 예외)
- 네온/고채도 색
- 둥글지 않은 모서리 (카드/버튼은 최소 `r1` 이상)
- 그림자 `lg2` 남용 (모달 한정)
