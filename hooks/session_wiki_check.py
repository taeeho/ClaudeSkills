"""
Stop hook: 현재 세션 transcript에서 시행착오 후보 개수만 카운트하고
1건 이상이면 systemMessage로 사용자에게 알림.
"""
import json
import os
import re
import sys

TROUBLE_RE = re.compile(
    r"안\s*돼|안\s*되|왜\s*안|버그|에러|오류|실패|깨졌|막혔|작동\s*안|동작\s*안|"
    r"\berror\b|\bfail(ed)?\b|\bbroken\b|doesn'?t work|not working|"
    r"\bundefined\b|traceback|exception|\bcrash",
    re.IGNORECASE,
)

SKIP_PREFIXES = ("<command-name>", "<local-command", "<system-reminder>")


def get_transcript_path():
    try:
        raw = sys.stdin.read()
        if raw.strip():
            data = json.loads(raw)
            p = data.get("transcript_path") or data.get("transcriptPath")
            if p:
                return p
    except Exception:
        pass
    return os.environ.get("CLAUDE_TRANSCRIPT_PATH")


def extract_text(content):
    if isinstance(content, str):
        return content
    if isinstance(content, list):
        out = []
        for blk in content:
            if isinstance(blk, dict) and blk.get("type") == "text":
                out.append(blk.get("text", ""))
        return "\n".join(out)
    return ""


def main():
    path = get_transcript_path()
    if not path or not os.path.isfile(path):
        return

    count = 0
    try:
        with open(path, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if not line:
                    continue
                try:
                    obj = json.loads(line)
                except json.JSONDecodeError:
                    continue
                if obj.get("type") != "user":
                    continue
                text = extract_text(obj.get("message", {}).get("content", ""))
                if not text or len(text) < 8:
                    continue
                if text.startswith(SKIP_PREFIXES):
                    continue
                if TROUBLE_RE.search(text):
                    count += 1
    except Exception:
        return

    if count >= 1:
        msg = f"[wiki-check] 이번 세션 시행착오 후보 {count}건. 정리하려면 /wiki-add 사용."
        print(json.dumps({"systemMessage": msg, "suppressOutput": True}))


if __name__ == "__main__":
    main()
