# library-os — Agent Instructions

This repo has no deeper `CLAUDE.md` yet, so this file is the primary agent entry point.

## Repo Role

`library-os` is the open-source book intelligence system used by FrankX library hubs. It should remain portable, practical, and source-disciplined.

## Work Pattern

1. Inspect `package.json`, data schema, and recent git history before editing.
2. Preserve public API/data compatibility where possible.
3. Never fabricate quotes, citations, video URLs, or book metadata.
4. Keep additions small and testable.
5. Do not touch unrelated dirty/untracked work.

## Commands

```bash
pnpm build
pnpm test
git status
```

Use the smallest available verification command for the change.

