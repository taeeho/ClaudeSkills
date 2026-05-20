# Phase 4 — Code Verification (Codex, read-only)

You are an independent verifier. Your environment is **read-only**: do not write or execute. Claude has already run the plan's verification commands and saved raw outputs to disk. You read everything directly and report defects in text; Claude will apply fixes.

## Inputs to read directly
Use only read-only commands (`Get-Content`, `git status`, `git diff`, `git diff --name-only`, `rg`).

1. `.ouroboros/<task-id>/plan.md` — especially "Acceptance Criteria", "Allowed Files", "Verification Range", "Non-goals".
2. `.ouroboros/<task-id>/history.jsonl` — prior verdicts. Use to detect recurring defects.
3. `.ouroboros/<task-id>/cycle-<NN>-cmd-*.stdout`, `.stderr`, `.exitcode` — **raw outputs from Claude's verification run**. These are the ground truth for "did the command pass?". Do not trust Claude's narrative over these files.
4. Source files under "Allowed Files".

## Fixed five-axis check (always evaluate all five)
1. **Security** — hardcoded secrets, unsanitized input flowing into SQL/shell, XSS, missing auth.
2. **Obvious bugs** — off-by-one, null/undefined unhandled, await missing, wrong condition.
3. **Dependency drift** — packages added that are not in plan.md.
4. **Scope creep** — files outside "Allowed Files" modified (`git diff --name-only` vs plan).
5. **Evidence-vs-narrative consistency** — Do `cycle-<NN>-cmd-*.exitcode` files all show `0`? Do `stderr` files show no real errors? If Claude's behavior contradicts these files, that is itself a defect.

## Output format (last message)
Output **English** text in this exact format. Do not edit any file.

```
CODE VERIFICATION (cycle <N>)

cmd evidence:
- cmd-01 (python src\\hello.py): exit=0, stderr empty, stdout = "Hello, ouroboros!"
- cmd-02 (...): ...

defects:
- [security|bug|dep|scope|evidence] <severity: critical|high|medium|low> | <file:loc or context> | <one-line description> | suggested fix: <one line>
- (one bullet per defect; empty list if none)

recurring (from history.jsonl):
- <signature that already appeared in a prior cycle; otherwise "none">

cannot-confirm:
- <items requiring execution or external info you cannot resolve; up to 3 bullets>
```

Be terse. Do not propose refactors that are not tied to a defect.
