---
name: ouroboros-loop
description: Claude(Plan·구현·재검토·실행) ↔ Codex(read-only 진단자)가 6-phase로 맞물리는 무인 자동 루프. "/ouroboros-loop <task>" 또는 "우르보로스로 돌려"라는 요청에 사용. 최대 9 사이클까지 사용자 개입 0으로 굴리고 Cycle 3·6에 텍스트 보고 후 즉시 다음 사이클로 이어 감. 수렴/정체/진동/상한 중 먼저 충족된 조건으로 멈춤. push는 절대 자동으로 하지 않고 최종 보고에서 git config 정보만 보여 줌.
---

# ouroboros-loop

Claude(쓰기·실행 전부 담당) + Codex(read-only 진단자) 6-phase 무인 루프.

## 역할 분담 — 중요
- **Claude**: 모든 파일 작성·수정·삭제, 검증 명령 실행, git 작업. 적용자·기록자.
- **Codex**: **read-only**. 작업 폴더의 파일을 자기 눈으로 직접 읽어 텍스트 권고/판정만 출력. 파일·명령 절대 수정·실행 안 함.

이유: Codex(ChatGPT 인증 모드)는 sandbox가 강제로 read-only 라 쓰기·실행이 막힌다. 그래서 의도적으로 read-only 진단자로 격하하고, 모든 쓰기·실행은 Claude 가 책임진다.

## 트리거
- `/ouroboros-loop <task 설명>`
- `/ouroboros <task 설명>`
- "우르보로스로 돌려"

## 핵심 원칙 (절대 어기지 않음)
1. **사용자 개입 0**. 진행 중 어떤 질문도 하지 않는다. 막다른 길이면 베스트 추측 + plan.md 에 가정 명시.
2. **상한 9 사이클**. Cycle 3, 6 끝 시점에 텍스트 보고 후 같은 응답에서 즉시 다음 사이클로 진입.
3. **사이클당 git commit 1개**. 메시지는 한 줄, prefix·번호·태그 금지.
4. **자동 push 금지**. 최종 보고에서 git config 정보만 출력하고 push 는 사용자에게 위임.
5. **작업 산출물 외 광역 변경 금지** — lockfile, .env, .git/, node_modules/ 등 손대지 않는다.
6. **plan·prompt·결과 파일은 영어** — PowerShell 5.1 인코딩 문제 회피.
7. **사용자에게 보이는 보고는 한국어**.

## 사전 준비 (Cycle 0)
1. 환경 점검 (병렬):
   - `codex --version` 없으면 즉시 멈추고 사용자에게 보고
   - `git --version`
   - cwd 확인
2. `.git/` 없으면 사용자에게 짧게 확인받고 `git init`.
3. task-id 자동 생성: `<yyyymmdd>-<짧은 slug>` (예: `20260520-add-greeting`)
4. 작업 폴더: `.ouroboros/<task-id>/`
   - `plan.md` (영어)
   - `history.jsonl`
   - `README.md` (task 한 줄 설명, 시작 시각)
5. 초기 git 스냅샷: `git add -A; git commit -am "ouroboros initial snapshot"` (변경 없으면 skip)

## 1 사이클 = 6 Phase

### Phase 1 — Claude: Plan Creation (write)
직전 사이클 verdict 가 있으면 먼저 읽고, **영어로** plan.md 갱신. 섹션 5개 고정:
```
# Plan (Cycle N)

## 1. Changes
- (what files / behavior)

## 2. Allowed Files
- src/foo.py
- src/bar.tsx
(No file outside this list may be modified by any phase.)

## 3. Acceptance Criteria
- Each criterion is verifiable (test cmd / output condition).

## 4. Verification Range
- Exact commands to run (npm test / pytest / python ...).

## 5. Non-goals
- Things this cycle will NOT touch.
```

### Phase 2 — Codex: Plan Review (read-only)
Codex 가 작업 폴더를 직접 읽고 권고만 출력. 호출 패턴 (PowerShell):

```powershell
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8
$ctx = "[CONTEXT]`ntask_id : <task-id>`ncycle : <NN>`nphase : 2`nproject_root: <abs>`nplan_path : .ouroboros/<task-id>/plan.md`nhistory_path: .ouroboros/<task-id>/history.jsonl`n`n"
$body = Get-Content "C:\Users\MKM10011\.claude\skills\ouroboros-loop\prompts\phase2_plan_review.md" -Raw -Encoding UTF8
($ctx + $body) | codex exec `
  -C "<project-root>" `
  -c approval_policy="never" `
  --skip-git-repo-check `
  -o ".ouroboros/<task-id>/cycle-<NN>-phase2.summary.md" `
  -
```

Codex 출력의 권고 사항을 **Claude 가 읽고 plan.md 에 반영**한다 (필요 시).

### Phase 3 — Claude: Initial Code (write)
plan.md 의 "Allowed Files" 안에서만 코드를 작성. 그 밖 파일은 손대지 않는다.

### Phase 4a — Claude: Run Verification (execute)
plan.md 의 "Verification Range" 명령을 **있는 그대로** 실행한다. 결과를 가공 없이 파일에 저장:
```
.ouroboros/<task-id>/cycle-<NN>-cmd-<MM>.stdout
.ouroboros/<task-id>/cycle-<NN>-cmd-<MM>.stderr
.ouroboros/<task-id>/cycle-<NN>-cmd-<MM>.exitcode
```
요약·필터링·파싱 금지. stdout/stderr 그대로 박는다. 이 파일들은 같은 사이클 안에서 다시 쓰지 않는다 (Codex 신뢰의 근간).

### Phase 4b — Codex: Code Verification (read-only)
Codex 가 작업 폴더 + cmd 결과 파일을 직접 읽고 결함 리포트를 출력. 호출은 Phase 2 와 동일 패턴, 프롬프트만 `phase4_code_verify.md`. summary 파일: `cycle-<NN>-phase4.summary.md`.

### Phase 5 — Claude: Apply Fixes (write)
Codex 결함 리포트를 읽고 "Allowed Files" 안에서 수정. 비-목표 영역은 손대지 않는다.

### Phase 6 — Codex: Final Verdict (read-only)
Codex 가 작업 폴더를 다시 직접 읽어 verdict JSON 출력. `--output-schema` 로 스키마 강제:

```powershell
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8
$ctx = "..."  # same prefix
$body = Get-Content "...phase6_final_verify.md" -Raw -Encoding UTF8
($ctx + $body) | codex exec `
  -C "<project-root>" `
  -c approval_policy="never" `
  --skip-git-repo-check `
  --output-schema "C:\Users\MKM10011\.claude\skills\ouroboros-loop\schemas\verdict.schema.json" `
  --output-last-message ".ouroboros/<task-id>/cycle-<NN>-phase6.verdict.json" `
  -
```

## 사이클 마무리
1. verdict.json 을 history.jsonl 에 한 줄로 append.
2. `git commit -am "<진짜 변화 한 줄>"`. 변경 없으면 skip.
   - 좋은 예: `add greeting helper`, `fix token expiry 401`
   - 나쁜 예: `feat: cycle 3`, `w1 update`, `wip`
3. 정지 조건 평가 → 보고/계속.

## 정지 조건 (먼저 충족된 것)
| 코드 | 조건 |
|---|---|
| `CONVERGED` | 직전 2 사이클 모두 `score ≥ 95` AND `defects=[]` |
| `STAGNATED` | 직전 3 사이클 점수 변화 모두 < 2 |
| `OSCILLATING` | 같은 `defect.signature` 가 2번 재출현 |
| `MAX_CYCLES` | 9 사이클 완료 |

## 보고

### 중간 보고 (Cycle 3, 6 끝나는 시점)
질문 없이 텍스트만, 6~8줄:
```
[ouroboros · cycle <N>/9 · 계속 진행]
score : <이전들> → <이번> (Δ <+x>)
fixed : <이번 사이클에 닫힌 결함 한 줄>
open  : <남아 있는 결함 한 줄>
next  : <다음 사이클에 시도할 것 한 줄>
```
→ 같은 응답에서 즉시 다음 사이클 진입.

### 최종 보고 (정지 조건 충족 시)
```
[ouroboros · 종료]
정지 사유 : <CONVERGED | STAGNATED | OSCILLATING | MAX_CYCLES>
총 사이클  : <N>/9
점수 추이  : 71 → 80 → 86 → 91 → 95 → 97
머지 가능  : ✓ / ✗

[git config / push 대기]
user.name        : <git config user.name>
user.email       : <git config user.email>
remote.origin    : <git config --get remote.origin.url   (없으면 "(none)")>
브랜치           : <git branch --show-current>
사이클 커밋 수   : <N>

[변경 파일]
<git diff --name-only HEAD~N..HEAD 결과>

[다음 단계]
git push 는 자동 실행하지 않았습니다. 위 계정 확인 후 직접 push.
```

git config 4줄은 PowerShell 로 실제 읽어와서 출력. 추측 금지.

## Codex 호출 — 공통 규칙
- 항상 `codex exec` (대화형 codex 단독 금지).
- 매 호출 직전에 `[Console]::OutputEncoding = UTF8; $OutputEncoding = UTF8`.
- `-s workspace-write` 는 ChatGPT 인증 모드에선 무시되므로 **넣지 않는다** (혼란 방지).
- `-c approval_policy="never"` 필수.
- `-C "<project-root>"`, `--skip-git-repo-check` 필수.
- Phase 6 만 `--output-schema` 로 JSON 강제 + `--output-last-message` 로 verdict.json 저장.
- Phase 2/4 는 `-o "...summary.md"` 로 마지막 메시지 저장 (free-form).
- stdin 끝에 `-` (prompt 를 stdin 으로 흘려보냄).
- prompt 파일은 **영어**. plan.md, README.md, cmd 결과 파일도 ASCII/영어 (인코딩 깨짐 방지).

## 절대 금지
- 진행 중 사용자에게 질문 (사전 준비의 `git init` 확인만 예외)
- `git push`, `git push -f`, `git reset --hard`, `git checkout -- .`, `git clean -f`
- `--no-verify`, `--no-gpg-sign`
- 작업 산출물 외 광역 변경 (lockfile, .env, .git/, node_modules/ 등)
- prefix·태그 commit 메시지 (`feat:`, `chore:`, `w1`, `wip`, `cycle3`, `auto`)
- `--dangerously-bypass-approvals-and-sandbox`
- 검증 결과 파일(`cycle-<NN>-cmd-*.{stdout,stderr,exitcode}`) 을 사이클 안에서 다시 수정
- plan.md/prompt 에 한국어 본문 작성 (식별자·명령어는 영어로 원문 유지)

## 실패 처리
- Codex 호출 비-0 종료 → 동일 phase 1회 재시도. 다시 실패면 그 사이클을 `OSCILLATING` 으로 처리하고 종료 보고에 stderr 마지막 30줄 첨부.
- `--output-schema` 검증 실패 (Phase 6) → 1회 재시도. 또 실패면 `score=0, defects=[{signature:"schema_violation",...}]` 으로 history 에 기록하고 다음 사이클로.
- 작업 디렉토리 dirty 인 채로 commit 실패 → `git status` 결과를 plan.md 하단에 append 하고 그 사이클 점수 그대로 두고 정지 보고.
