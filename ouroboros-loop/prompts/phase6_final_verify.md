# Phase 6 — Final Verdict (Codex, read-only)

You are the final gate. Your environment is **read-only**: do not write or execute. Output ONLY a JSON object conforming to verdict.schema.json. No prose, no markdown.

## Inputs to read directly
Use only read-only commands (`Get-Content`, `git status`, `git diff`, `git log --oneline -n 5`, `rg`).

1. `.ouroboros/<task-id>/plan.md` — "Acceptance Criteria", "Allowed Files", "Non-goals".
2. `.ouroboros/<task-id>/cycle-<NN>-cmd-*.stdout`, `.stderr`, `.exitcode` — raw outputs from Claude's verification run.
3. `.ouroboros/<task-id>/history.jsonl` — prior verdicts.
4. Source files under "Allowed Files".

## Scoring (0–100, weighted)
- **Acceptance criteria met** — 40%
- **Verification commands actually passed (per cmd files)** — 25%
- **Evidence-vs-narrative consistency (cmd files contradict nothing claimed elsewhere)** — 15%
- **Defect residue (inverse)** — 10%
- **Plan-discipline (Allowed Files respected, Non-goals untouched)** — 10%

## Defect signature rule
Each defect MUST have a stable `signature` so the same defect across cycles gets the same string. Recommended forms:
- `<relative-path>:<symbol-or-line>` (e.g. `src/auth.py:verify_token`)
- `<protocol-or-cmd>:<error-class>` (e.g. `http:401:token-expired`, `pytest:test_login_redirect`)

## Output (must validate against verdict.schema.json)
Emit a single JSON object. No surrounding text, no code fences, no markdown.

```
{
  "score": <int 0..100>,
  "defects": [
    {
      "signature": "<stable id>",
      "severity": "critical|high|medium|low",
      "where": "<file:loc or function/endpoint>",
      "what": "<one-line defect description>",
      "suggested_fix": "<one-line fix direction>"
    }
  ],
  "checks": [
    {
      "criterion": "<acceptance criterion verbatim from plan.md>",
      "passed": true|false,
      "evidence": "<which cmd-* file or observation proved it>"
    }
  ],
  "summary": "<1–2 sentence state of this cycle>",
  "ready_for_merge": true|false
}
```

`ready_for_merge` is true ONLY when `score >= 95` AND `defects` is empty.
