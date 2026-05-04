---
name: ccfm-deck
description: CCFM 1280x720 슬라이드 데크 양식(Rausch #ff385c 악센트 + Inter/Pretendard + JetBrains Mono)으로 보고서·교육자료·발표자료·소개자료·랜딩 한 장짜리·인포그래픽·트러블슈팅 가이드 등 모든 슬라이드를 HTML로 만들고, 필요시 PDF/PPT로 변환합니다. 사용자가 "보고서 만들어줘", "교육자료로 만들어줘", "PPT 만들어줘", "발표자료 만들어줘", "슬라이드로", "한 장짜리 정리", "1페이저", "CCFM 스타일로", "내 데크 템플릿으로", "가이드 만들어줘", "트러블슈팅 정리", "문제 해결 문서로 만들어줘", "PDF로 정리해줘" 같은 요청을 할 때 사용. 자유 구조와 고정 스키마(증상-원인-해결) 둘 다 처리.
---

# ccfm-deck

CCFM 가이드 데크 디자인(1280×720 16:9, light/tint/ink/dark, Rausch 악센트)을 자산으로 가지는 슬라이드 빌더 스킬.

원본 톤 참고: `~/Desktop/5/9/index.html` 와 `~/Desktop/CCFM_ClaudeCodeTerminalSetup_20260427/assets/tokens.css` (이 머신에 있을 때만 참고용. 없어도 스킬은 자체 자산으로 동작).

> 경로 안의 `~` 은 OS에 맞춰 expand:
> - PowerShell: `$env:USERPROFILE` 로 치환 후 도구 호출
> - Bash/zsh: `$HOME` 으로 치환 후 도구 호출

## 언제 쓰나

- "보고서/발표자료/교육자료/PPT/슬라이드/1페이저 만들어줘"
- "CCFM 스타일로 / 내 데크 템플릿으로 / Rausch 톤으로"
- 자유 구조 슬라이드 (보고서, 교육자료, 1페이저 등)
- **트러블슈팅 가이드** (증상→원인→해결 단계) — `templates/troubleshoot.html` 사용

**쓰지 말 것**:
- React 가이드북 사이트(여러 페이지 라우팅 필요) → `guidebook-ui-preset`

## 자산 (스킬 폴더 안)

- `tokens.css` — 디자인 토큰(색·폰트·크기·radii·.slide/.card/.pill/.code/.kpi/.steps/.toc/.dd/.quote 등 컴포넌트 베이스). 그대로 `<link rel="stylesheet">` 또는 인라인 `<style>` 로 import.
- `template.html` — **자유 구조** 데크 시작점. 6개 대표 슬라이드 골격 포함(Cover / Title / KPI / Cards / Steps / Closing).
- `templates/troubleshoot.html` — **트러블슈팅 가이드** 시작점. 6슬라이드 고정 스키마(Cover / Symptoms / Cause / Steps / Verify / Warnings).
- `components.md` — 컴포넌트별 HTML 스니펫 카탈로그. 채울 콘텐츠가 정해지면 여기서 복사·조립.

## 모드 선택 (가장 먼저 결정)

사용자 요청에서 다음 키워드가 있으면 **트러블슈팅 모드**:
- "트러블슈팅", "문제 해결", "에러 해결", "버그 가이드", "BIOS/드라이버/환경 이슈 가이드"
- 입력 데이터에 "증상 + 원인 + 해결 단계" 가 명확히 분리되어 있음

→ 트러블슈팅 모드면 `templates/troubleshoot.html` 복사 + 트러블슈팅 스키마(`title`, `summary`, `symptoms[]`, `cause`, `steps[]`, `verification`, `warnings[]`) 추출 후 placeholder 치환.

→ 그 외 모든 케이스는 **자유 구조 모드** = `template.html` 사용.

## 사용 절차 (생성 모드)

### 1) 사용자 요청 파싱
사용자 메시지에서 다음을 추출. 없으면 한 번만 묻고, 그래도 모자라면 합리적 기본값으로 채움.

| 항목 | 예 |
|---|---|
| 목적 | 보고서 / 교육자료 / 사내공유 / 외부발표 / 1페이저 |
| 청중 | 팀 내부 / 임원 / 비개발자 / 클라이언트 |
| 슬라이드 수 | 6~12장이 기본 권장. 미지정 시 8장 |
| 주제 키 메시지 | 한 줄 요약 (있으면 cover에 그대로 사용) |
| 출력 위치 | 미지정 시 `~/Desktop/<주제>/index.html` (OS에 맞춰 expand) |
| PDF/PPT 필요 여부 | "PDF로", "PPT로" 단어 등장 시 변환까지 진행 |

### 2) 데크 스캐폴딩
- 출력 폴더 만들고 `tokens.css`를 같이 복사 (또는 절대경로 link). 절대경로 link가 더 깔끔.
- `template.html`을 복사 → 슬라이드 head/body 채워넣기.
- 페이지당 footer는 `NN / 총개수` 형식 유지.
- Cover 슬라이드는 `.slide.ink.hide-footer`로 두고, 본문은 light/tint를 번갈아 쓰면 리듬이 좋음.

### 3) 콘텐츠 채우기 — 기본 슬라이드 패턴
| 패턴 | 용도 | 핵심 컴포넌트 |
|---|---|---|
| Cover | 표지 | `.slide.ink.hide-footer` + `.t-display` + `.pill-row` |
| Why/문제정의 | 왜 이걸 하는가 | `.col-2` + `.card` 비교(기존 vs 개선) |
| 비교/선택지 | 도구·방법론 비교 | `.col-3` + `.card` + `.notice` |
| 단계/절차 | 순서 있는 흐름 | `.steps` 또는 `.col-2` + 번호 카드 |
| KPI/숫자 | 임팩트 강조 | `.kpi` (.v 56px + .l 라벨) 가로 정렬 |
| 코드/터미널 | 명령·프롬프트 시연 | `.code` 또는 검정 배경 mono 박스 |
| Do/Don't | 권장/지양 | `.dd.do` / `.dd.dont` |
| Cases | 활용 사례 | `.col-3` + `.card.elevated` |
| Closing | 정리·CTA | `.t-title` + `.pill.accent` + 짧은 한 줄 |

### 4) 검증 (반드시)
1. **Playwright MCP로 직접 띄워서 확인**: `mcp__playwright__browser_navigate` → `mcp__playwright__browser_take_screenshot`. 첫 1~2장 이상은 시각 확인 후 다음 슬라이드 작업.
2. **레이아웃 깨짐 체크**: 1280×720 고정. 콘텐츠가 720px를 넘기면 폰트 크기·gap을 줄이거나 슬라이드를 분할.
3. **이미지 경로**: 절대경로 `file:///C:/...` 또는 데크와 같은 폴더의 상대경로. 사용자가 별도로 이미지 경로를 안 줬으면 `<div class="img-slot">` 플레이스홀더로 두고 이후 채우라고 말함.

### 5) PDF / PPT 변환 (요청 시)
- **PDF**: 가장 간단한 방법은 사용자가 Chrome에서 데크를 열어 인쇄(Ctrl+P) → "Save as PDF", **용지 크기 1280×720px(또는 16:9 사용자정의)**, 여백 없음, 배경 그래픽 켜기. 자동화가 필요하면 Playwright `page.pdf({width:'1280px', height:'720px', printBackground:true})`. 슬라이드별 분리는 `.page` 요소를 PDF 페이지에 1:1 매핑하도록 `@page { size: 1280px 720px; margin: 0 }` + `.page { page-break-after: always }` 추가.
- **PPTX**: 1슬라이드 = 1이미지(PNG)로 익스포트한 뒤 python-pptx의 빈 레이아웃에 배치하는 게 현실적. 텍스트 편집 가능성을 사용자가 요구하면 problem-guide-pdf 패턴 참고.

## 출력 보고
완료 후 사용자에게 알려줘:
- 파일 경로
- 슬라이드 수와 슬라이드별 한 줄 제목 목록
- 어떤 슬라이드가 placeholder(`.img-slot` 등)로 비어있는지
- 다음으로 해야 할 1~2개 액션 (예: "스크린샷 경로를 알려주시면 슬라이드 3에 넣겠습니다")

## 주의
- 자유 구조 데크 빌더. 고정 스키마(필수 필드 검증) 두지 말고, 콘텐츠 흐름은 사용자 요청에서 추출.
- Inter + Pretendard 폰트는 인터넷 연결 시 자동 로드. 오프라인 발표면 사용자에게 미리 폰트 캐시 확인 안내.
- 강조색 변경 요청 시 `--accent`만 바꾸면 됨(예: 파랑 톤은 `--accent: #2c6ee5; --accent-deep: #194fb5; --accent-soft: #eff5ff;`). tokens.css 직접 수정 대신 데크 `<style>`에서 오버라이드 권장.
- 슬라이드 번호 footer는 자동 번호가 아니라 수동 `NN / 총개수`. 슬라이드 추가/삭제 시 모든 footer 갱신 잊지 말 것.
