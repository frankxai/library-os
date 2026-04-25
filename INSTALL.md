# Install — Library OS

Three install paths depending on your situation. Pick one.

---

## Path 1 — Bootable, full Next.js site (zero config)

If you don't yet have a website, or you want a dedicated library site:

```bash
git clone https://github.com/frankxai/library-os.git my-library
cd my-library
npm install
npm run dev
```

Open [http://localhost:3000/library](http://localhost:3000/library). Edit `data/book-reviews.ts` to add your first book. `git push` to deploy on Vercel.

The repo IS the deployable Next.js app — no separate template/generator step.

---

## Path 2 — Drop into an existing Next.js App Router project

If you already have a Next.js 14+ site:

```bash
# From your project root
git clone --depth=1 https://github.com/frankxai/library-os.git /tmp/library-os
rsync -av /tmp/library-os/app/library/ app/library/
rsync -av /tmp/library-os/app/api/quote/ app/api/quote/
rsync -av /tmp/library-os/app/books/ app/books/
rsync -av /tmp/library-os/data/book-reviews.ts data/
rsync -av /tmp/library-os/components/share/ components/share/
rsync -av /tmp/library-os/public/images/library/ public/images/library/
rm -rf /tmp/library-os
```

Then customize `data/book-reviews.ts` for your books, edit `app/books/lib/books-registry.ts` if you have your own books to cross-link.

Requires Tailwind CSS v3+ in the host project.

---

## Path 3 — Claude Code plugin only (commands + skill + subagent)

If you just want the **authoring workflow** (3 slash commands + 1 skill + 1 subagent) without the website template:

```bash
# From your project root
git clone --depth=1 https://github.com/frankxai/library-os.git /tmp/library-os
rsync -av /tmp/library-os/.claude/ .claude/
rm -rf /tmp/library-os
```

Now in Claude Code you have:
- `/library-add` — create baseline book entry
- `/library-deepen` — extract quotes + chapters
- `/library-research` — add related books + videos
- Skill: `library-os` (auto-activates when you mention books/library/quotes)
- Subagent: `book-distiller`

Pair with **any** schema and template you already have, or build your own. The commands write to `data/book-reviews.ts` by default but the skill explains the contract for retargeting.

---

## Path 4 — Cross-AI install (ChatGPT / Cursor / Codex / Gemini)

Library OS is platform-neutral. The Claude Code commands are plain-text prompts you can paste into any AI:

1. Copy `docs/cross-ai-guide.md` from the repo
2. Paste the relevant prompt into your AI of choice
3. Replace `[TITLE]` / `[AUTHOR]` / `[ISBN]`
4. Get back a structured TypeScript object literal
5. Paste into your `data/book-reviews.ts`

See [`docs/cross-ai-guide.md`](./docs/cross-ai-guide.md) for paste-ready prompts.

---

## Path 5 — Via ACOS (Agentic Creator OS)

If you use [@frankx/agentic-creator-os](https://github.com/frankxai/agentic-creator-os), Library OS is included as a plugin from v11.x. The slash commands appear automatically.

```bash
npx @frankx/agentic-creator-os init
# Library OS commands now available via /library-add, /library-deepen, /library-research
```

---

## After install — your first book

Whatever path you picked, the workflow is:

```
/library-add "Atomic Habits" by James Clear
/library-deepen atomic-habits
/library-research atomic-habits
git commit -am "feat(library): add Atomic Habits"
git push
```

In ~30 minutes you'll have a permanent deep-dive page at `/library/atomic-habits` with:
- TL;DR + 5 key insights + 5 FAQ + Best For
- 12-15 curated quotes with chapter references
- Every chapter distilled (keyIdea + summary)
- 6 related books with connection-reasons
- 3-5 videos with kind + duration
- Per-quote landing pages (`/q/{n}`) with auto-generated OG cards
- BreadcrumbList + Article + Review + FAQPage + Quotation JSON-LD

That's one book. Now do another.

---

## Verify install

```bash
# Check the commands registered
ls .claude/commands/library-*.md
ls .claude/skills/library-os/
ls .claude/agents/book-distiller.md

# Check the plugin manifest
cat claude-plugin.json
```

In Claude Code, type `/library-` — autocomplete should suggest the three commands.

---

## Reference implementation

[frankx.ai/library](https://frankx.ai/library) — 22 deep-dived books, 277 quotes, full system live in production. Anything you can do there is what you'll get from this install.

Anything missing or unclear? Open an issue: [github.com/frankxai/library-os/issues](https://github.com/frankxai/library-os/issues).
