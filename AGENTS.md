# library-os — Agent Instructions

This repo has no deeper `CLAUDE.md` yet, so this file is the primary agent entry point.

## Repo Role

`library-os` is the open-source book intelligence system used by FrankX library hubs. It should remain portable, practical, and source-disciplined.
## Ownership Boundary

`library-os` owns reusable capture, enrichment, review, and publishing software plus its examples. It does not own the canonical FrankX historical sacred-text corpus, Sacred Visions, or fictional Arcanea canon. Those artifacts remain in their Registry-authorized repositories; this system may import or publish reviewed projections with provenance.

Before adding a portfolio corpus or collection, load the latest reviewed `frankxai/agentic-ops/registry` commit, record its SHA, and resolve `artifact_authorities.yaml`. If no authority exists, stop at a proposal. This clarification was authored against Registry commit `81765d65fde9ed8692787425cfd1381a4f6dc40a`.


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

