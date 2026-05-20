#!/usr/bin/env python3
"""UserPromptSubmit hook: 매 요청마다 스킬 매칭 점검 리마인더 주입."""
import json
import sys

sys.stdout.reconfigure(encoding="utf-8")

REMINDER = """[skill-check] 답변 작성 전에 한 번 점검:

1. 이번 turn의 시스템 리마인더에 나열된 user-invocable skills 목록을 훑고, 사용자 요청 의도와 매칭되는 스킬이 있는지 판단한다.

2. 매칭되면 다른 작업 전에 Skill 도구로 즉시 invoke. 주요 매칭 가이드:
   - 버그/에러/"안돼요"/스크린샷 + 에러 → /bugfix
   - 발표자료/가이드/트러블슈팅/매뉴얼/문서 → /ccfm-deck
   - 웹사이트·내부툴 기획 (스택 판정부터) → /plan-site
   - 웹사이트 QA/감사 (코드+UX+E2E+보안) → /qa-site
   - 시행착오·발견·해결책 정리해 위키에 저장 → /wiki-add
   - 다른 세션으로 인수인계 → /handoff
   - AX 가이드북 스타일 UI 스캐폴딩 → /가이드북느낌
   - 자동 루프(무인 반복) → /ouroboros-loop
   - UI/UX 설계·구현 → /ui-ux-pro-max, /frontend-design
   - 새 스킬 만들기/기존 스킬 개선·평가 → /skill-creator
   - 슬래시 명령(.claude/commands/*.md) 만들기 → /command-creator
   - hook 만들기/이벤트 자동화(Pre/PostToolUse·Stop·UserPromptSubmit 등) → /hook-development
   - 서브에이전트 만들기 → /agent-development
   - MCP 서버 만들기(FastMCP·TS SDK) → /mcp-builder
   - 다이어그램(flowchart·sequence·ERD·C4·state) → /mermaid-diagram-specialist
   - 접근성 점검(WCAG·ARIA·키보드) → /accessibility
   - Core Web Vitals/프론트 성능 → /core-web-vitals
   - 디자인 시스템(토큰·컴포넌트 체계) 시작 → /design-system-starter
   - 기능 설계 워크숍 → /feature-design-assistant
   - React 컴포넌트·UI 패턴 → /react-dev, /react-ui-patterns
   - OpenAPI/REST 문서 자동 생성 → /api-documentation-generator
   - ADR(Architecture Decision Records) 작성 → /architecture-decision-records
   - 릴리스 변경로그 → /changelog-generator
   - GitHub Actions 워크플로우 → /github-actions-creator, /github-workflow-automation
   - E2E 시나리오(Playwright) 작성 → /playwright-e2e-builder
   - 배포(Vercel/Netlify/Cloudflare Pages) → /vercel-deploy, /netlify-deploy, /cloudflare-deploy
   - PowerShell 스크립팅(윈도우) → /powershell-windows
   - Git worktree 사용/관리 → /using-git-worktrees

3. 매칭이 애매하면 후보 1-2개를 한 줄로 제시한 뒤 사용자 선택을 받고 진행.

4. 다음 경우는 이 점검을 생략하고 그냥 답변:
   - 이미 스킬이 진행 중인 turn
   - 짧은 잡담/사실 확인/단순 질문
   - 사용자가 명시적으로 "스킬 쓰지 마"라고 지시한 경우

5. **사용자 명시 호출 전용 스킬 (disable-model-invocation: true)** — 절대 Skill 도구로 직접 invoke하지 말 것. 단, 사용 적기가 감지되면 한 줄로 제안하고 사용자 yes/no 받기:
   - 코드 영역을 모르거나 "이게 어디서 호출돼?"·"전체 그림이?" 같은 큰그림 질문이 감지되면 →
     "/zoom-out 스킬을 쓰면 한 단계 위 추상화로 관련 모듈·호출자 지도를 도메인 용어로 받을 수 있습니다. 쓰시겠어요?"
   - 새 프로젝트에서 to-issues/to-prd/triage/diagnose/tdd/improve-codebase-architecture/zoom-out 중 하나를 쓰려는데 이슈 트래커·triage 라벨·CONTEXT.md 셋업이 부재하면 →
     "/setup-matt-pocock-skills로 이 레포의 이슈 트래커·triage 라벨·CONTEXT.md 위치를 먼저 셋업하는 게 좋습니다. 진행할까요?"
   - 사용자가 yes 하면 그 슬래시 명령을 사용자가 직접 입력하도록 안내 (모델이 임의로 Skill invoke 금지).
"""

output = {
    "hookSpecificOutput": {
        "hookEventName": "UserPromptSubmit",
        "additionalContext": REMINDER,
    }
}

print(json.dumps(output, ensure_ascii=False))
