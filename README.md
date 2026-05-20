# ClaudeSkills

[Claude Code](https://docs.claude.com/en/docs/claude-code) 글로벌 스킬 모음.
회사 Windows ↔ 집 Mac 동기화용 개인 레포.

> ⚠️ **Claude Code가 인식하는 스킬 경로는 `~/.claude/skills/<skill>/SKILL.md` 만입니다.**
> 다른 경로(`~/Documents/ClaudeSkills` 등)에 둬도 스킬로 동작하지 않습니다.

---

## 빠른 설치

### Option A — Clean install (가장 단순, 추천)

`~/.claude/skills/` 가 비어있는 새 머신에서:

**Mac / Linux:**
```bash
git clone https://github.com/taeeho/ClaudeSkills.git ~/.claude/skills
```

**Windows (PowerShell):**
```powershell
git clone https://github.com/taeeho/ClaudeSkills.git "$env:USERPROFILE\.claude\skills"
```

→ 이러면 끝. Claude Code 재시작하면 스킬 자동 인식.

---

### Option B — 별도 위치에 clone + 심볼릭 링크

작업 폴더(예: `~/Documents/ClaudeSkills`)에 두고 git pull로 관리하고 싶을 때.
폴더 분리 + Claude Code 인식 둘 다 가능.

**Mac / Linux:**
```bash
git clone https://github.com/taeeho/ClaudeSkills.git ~/Documents/ClaudeSkills

# 기존 ~/.claude/skills 가 있으면 백업
mv ~/.claude/skills ~/.claude/skills.bak 2>/dev/null

# 심볼릭 링크 생성
ln -s ~/Documents/ClaudeSkills ~/.claude/skills
```

**Windows (관리자 PowerShell — 심볼릭 링크는 관리자 권한 필요):**
```powershell
git clone https://github.com/taeeho/ClaudeSkills.git "$env:USERPROFILE\Documents\ClaudeSkills"

# 기존 폴더 백업
if (Test-Path "$env:USERPROFILE\.claude\skills") {
  Rename-Item "$env:USERPROFILE\.claude\skills" "skills.bak"
}

# 심볼릭 링크
New-Item -ItemType SymbolicLink `
  -Path "$env:USERPROFILE\.claude\skills" `
  -Target "$env:USERPROFILE\Documents\ClaudeSkills"
```

→ 이러면 `~/Documents/ClaudeSkills` 에서 `git pull` 하면 자동으로 `~/.claude/skills` 에 반영됨.

---

### Option C — git 없이 zip 다운로드

GitHub에서 "Code → Download ZIP" 클릭 후:

**Mac / Linux:**
```bash
unzip ClaudeSkills-main.zip
mv ClaudeSkills-main ~/.claude/skills
```

**Windows:**
```powershell
Expand-Archive ClaudeSkills-main.zip -DestinationPath "$env:USERPROFILE\.claude"
Rename-Item "$env:USERPROFILE\.claude\ClaudeSkills-main" "skills"
```

---

## 포함된 스킬

| 스킬 | 용도 |
|---|---|
| **ccfm-deck** | CCFM 1280×720 슬라이드 데크 (자유 구조 + 트러블슈팅 모드) |
| **wiki-add** | theowiki 시행착오 캡처 (가치 판정 → raw 저장 → ingest) |
| **guidebook-ui-preset** | AX팀 Claude 가이드북 스타일 React 프리셋 |
| **frontend-design** | 디자인 우선 프론트엔드 코드 생성 |
| **ui-ux-pro-max** | UI/UX 디자인 인텔리전스 (50 styles, 21 palettes 등) |
| **handoff** | 새 세션이 이어받을 수 있게 대화 압축 (임시 디렉토리 저장) |
| **ouroboros-loop** | Claude ↔ Codex 6-phase 무인 자동 루프 (최대 9 사이클) |

> 각 스킬의 상세 설명은 해당 폴더의 `SKILL.md` 참고.

---

## 경로 컨벤션

이 레포의 스킬들은 머신 종속 절대경로 대신 `~` 을 사용합니다:

```
~/Desktop/theowiki        # Mac 에서: /Users/<name>/Desktop/theowiki
                          # Windows 에서: C:\Users\<name>\Desktop\theowiki
```

OS에 맞춰 자동 expand 됩니다 (`PowerShell` 은 `$env:USERPROFILE`, `Bash/zsh` 는 `$HOME`).

---

## 머신별 추가 설정 (이 레포에 포함되지 않음)

다음 파일들은 머신마다 다르므로 별도 관리:

| 파일 | 위치 | 용도 |
|---|---|---|
| `CLAUDE.md` | `~/.claude/CLAUDE.md` | 사용자 프로필 (이름, 역할, 톤, 스택) |
| `settings.json` | `~/.claude/settings.json` | 글로벌 권한, hook, theme |
| `settings.local.json` | `~/.claude/settings.local.json` | 머신별 권한 allow 리스트 |
| `hooks/` | `~/.claude/hooks/` | Stop hook, PreToolUse 등 사용자 hook 스크립트 |

새 머신 첫 셋업 시:

1. [Claude Code 설치](https://docs.claude.com/en/docs/claude-code/setup)
2. 이 레포를 위 절차로 clone
3. `~/.claude/CLAUDE.md` 직접 작성 또는 다른 머신에서 복사
4. (선택) 권한 allow 리스트는 사용하면서 점차 추가

---

## 라이센스 / 출처

- 일부 스킬은 third-party (예: `frontend-design/LICENSE.txt`). 각 폴더의 LICENSE 파일을 확인하세요.
- 본인이 직접 만든 스킬: `wiki-add`, `ccfm-deck`, `guidebook-ui-preset` (외부 출처 있다면 SKILL.md에 명시)
- 상세는 각 스킬 폴더의 `SKILL.md` frontmatter 또는 `LICENSE` 파일 참조.

---

## 업데이트

```bash
# 새 스킬을 추가/수정한 후
cd ~/.claude/skills          # (또는 Option B 라면 ~/Documents/ClaudeSkills)
git add .
git commit -m "Add: my-new-skill"
git push

# 다른 머신에서 동기화
cd ~/.claude/skills
git pull
```
