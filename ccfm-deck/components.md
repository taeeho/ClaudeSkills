# CCFM Deck — Components Catalog

각 슬라이드 안의 콘텐츠 영역을 채울 때 골라 쓰는 HTML 스니펫 카탈로그.
모든 스니펫은 1280×720 슬라이드 안에서 동작하도록 설계됨. tokens.css 변수를 사용.

---

## Typography

```html
<span class="kicker">SECTION KICKER</span>
<p class="t-display">표지급 타이틀</p>
<p class="t-title">슬라이드 타이틀</p>
<p class="t-subtitle">서브 타이틀</p>
<p class="t-lede">리드 문장 — 슬라이드 의도를 한 줄로</p>
<p class="t-body">본문 텍스트</p>
<p class="t-small">보조 설명</p>
<p class="t-caption">캡션 / 메타</p>
```

색 변형: `t-ash` (회색), `t-mute` (더 흐림), `t-accent` (Rausch 빨강).

---

## Pill (배지)

```html
<div class="pill-row">
  <span class="pill accent">강조 배지</span>
  <span class="pill">기본</span>
  <span class="pill outline">아웃라인</span>
</div>
```

다크/Ink 슬라이드에서 기본 pill은 다음 인라인 스타일이 어울림:
```html
<span class="pill" style="background: rgba(255,255,255,0.09); border-color: rgba(255,255,255,0.14); color: rgba(255,255,255,0.75);">텍스트</span>
```

---

## Card

```html
<div class="card">
  <h3>제목</h3>
  <p>본문</p>
</div>

<div class="card elevated" style="border-top: 3px solid var(--accent);">
  <h3>강조 카드</h3>
  <p>본문</p>
</div>
```

비교 카드 권장 패턴: 왼쪽 `.card` + 오른쪽 `.card.elevated` (둘 다 상단 3px 보더로 색 구분).

---

## KPI

```html
<div style="display: flex; gap: 64px; align-items: flex-end;">
  <div class="kpi"><div class="v">98%</div><div class="l">정확도</div></div>
  <div class="kpi"><div class="v">3.5x</div><div class="l">처리 속도</div></div>
  <div class="kpi"><div class="v">1.2k</div><div class="l">월간 사용자</div></div>
</div>
```

---

## Steps (4단계)

```html
<div class="steps">
  <div class="step">
    <span class="step-num">STEP 1</span>
    <h4>설치</h4>
    <p>한 줄 명령으로 시작</p>
    <code>pip install foo</code>
  </div>
  <!-- step 2~4 동일 패턴 -->
</div>
```

3단계로 줄이려면 `.steps { grid-template-columns: repeat(3, 1fr); }` 인라인 오버라이드.

---

## Pros / Cons

```html
<div class="col-2">
  <div class="pc pros">
    <h3>✓ 장점</h3>
    <ul>
      <li>빠른 도입</li>
      <li>기존 도구와 호환</li>
    </ul>
  </div>
  <div class="pc cons">
    <h3>✗ 단점</h3>
    <ul>
      <li>러닝커브 존재</li>
      <li>특정 케이스 미지원</li>
    </ul>
  </div>
</div>
```

---

## Do / Don't

```html
<div class="dd do">
  <span class="tag">DO</span>
  <p><strong>실제 페이지 HTML 구조를 먼저 확인</strong>하고 선택자를 추출</p>
</div>
<div class="dd dont">
  <span class="tag">DON'T</span>
  <p>짐작으로 선택자 작성 — 깨지기 쉬움</p>
</div>
```

---

## TOC (목차)

```html
<div class="toc">
  <div class="toc-row">
    <span class="n">01</span>
    <span class="t">크롤링이 뭔가요</span>
    <span class="meta">2분</span>
  </div>
  <!-- 행 반복 -->
</div>
```

---

## Code / Terminal

기본 코드 블록:
```html
<div class="code">
  <span class="cmt"># 주석</span>
  <span class="kw">def</span> <span class="fn">crawl</span>():
      <span class="prompt">return</span> <span class="str">"data"</span>
</div>
```

Claude Code 터미널 미니 목업(원본 index.html 5/6/7번 슬라이드 패턴):
```html
<div style="background: #1b1d2b; border-radius: var(--r-14); overflow: hidden; font-family: var(--font-mono); font-size: 12px; color: #c8ccd8;">
  <div style="padding: 7px 16px; background: #13141f; color: #555a7a; font-size: 11px;">
    (base) PS C:\Users\&lt;user&gt;&gt; <span style="color: #ff6b6b;">claude</span>
  </div>
  <div style="padding: 12px 16px; display: flex; gap: 10px; align-items: flex-start;">
    <span style="color: #ff6b6b; font-weight: 700; font-size: 16px;">›</span>
    <span style="color: #e2e8f0; white-space: pre-wrap; line-height: 1.65; font-size: 12.5px;">사용자 프롬프트 텍스트</span>
  </div>
  <div style="padding: 6px 16px; background: #13141f; display: flex; justify-content: space-between;">
    <span style="font-size: 11px;"><span style="color: #ff8c42; font-weight: 700;">▶▶ bypass permissions on</span></span>
    <span style="color: #555a7a; font-size: 11px;">● high · /effort</span>
  </div>
</div>
```

---

## Notice / Callout

```html
<div class="notice">
  <span style="font-size: 20px;">💡</span>
  <p>핵심 메시지 한 줄</p>
</div>
```

성공 톤(녹색):
```html
<div style="display: flex; align-items: center; gap: 12px; padding: 13px 18px; background: rgba(46,204,113,0.07); border: 1px solid rgba(46,204,113,0.22); border-radius: var(--r-8);">
  <span style="font-size: 20px;">✅</span>
  <p style="font-size: 15px; color: #2ecc71; font-weight: 600; margin: 0;">성공 메시지</p>
</div>
```

---

## Quote

```html
<div class="quote">
  사용자에게 가장 강한 인상을 주는 한 문장.
  <div class="quote-author">— 인용 출처</div>
</div>
```

---

## Image Slot (이미지 미리 자리잡기)

이미지 경로를 사용자가 안 줬을 때 placeholder:
```html
<div class="img-slot" style="height: 360px;">IMAGE 1280x360</div>
```

실제 이미지를 채울 때:
```html
<div style="height: 360px; border-radius: var(--r-14); overflow: hidden; border: 1px solid var(--hairline);">
  <img src="file:///C:/path/to/image.png"
       style="width: 100%; height: 100%; object-fit: cover; object-position: top left; display: block;">
</div>
```

---

## Divider chapter slide (장 구분용)

```html
<div class="page">
  <div class="slide ink" style="justify-content: center; align-items: center; text-align: center;">
    <div class="divider-num">02</div>
    <p class="t-title" style="color: white; margin-top: 24px;">데이터 수집</p>
  </div>
</div>
```

---

## Slide footer (모든 본문 슬라이드 공통)

```html
<div class="slide-footer">
  <span class="footer-brand"><span class="dot"></span>CCFM</span>
  <span>02 / 08</span>
</div>
```

`hide-footer` 클래스를 슬라이드에 붙이면 푸터 숨김 (cover/closing에서 사용).

---

## Accent 색 변경 가이드

데크 `<style>`에서 오버라이드. tokens.css는 건드리지 말 것.

```css
:root {
  --accent: #2c6ee5;       /* 파랑 */
  --accent-deep: #194fb5;
  --accent-soft: #eff5ff;
}
```

자주 쓰는 대안:
- **티얼 (AX팀 가이드북)**: `#0F6E56 / #0a4f3d / #e8f5f0`
- **오렌지**: `#ff7a45 / #cc5e2c / #fff3eb`
- **퍼플**: `#7c3aed / #5b21b6 / #f3edff`
