# Cross-AI Guide — Library OS Without Claude Code

Library OS is designed to work with any AI pair-programmer, and without one. The intelligence lives in the **schema + prompts**, not in any specific tool.

This guide gives you paste-ready prompts for the three canonical workflow steps. Use them in ChatGPT, Claude.ai web, Cursor, Codex, Gemini CLI, or any capable AI.

---

## Workflow step 1 — `/library-add` (create a baseline entry)

**When to use:** you just finished a book, or you want to stub out a future entry.

**Paste this prompt into your AI, replacing the bracketed sections:**

```
I'm adding a book to my Library OS (schema at app/books/types.ts, data in data/book-reviews.ts).

Book: [TITLE]
Author: [AUTHOR]
ISBN: [ISBN, optional]

Produce a BookReview entry in TypeScript matching this shape:

{
  slug: kebab-case from title,
  title: exact,
  author: exact,
  coverImage: `/images/library/{slug}.jpg`,
  rating: 1-5 (default 5),
  reviewDate: today's ISO date (YYYY-MM-DD),
  categories: 1-3 from [Self-Development, Habits, Psychology, Productivity, Focus,
    Mindset, Fitness, Fiction, Philosophy, Stoicism, Creativity, Wealth,
    Classic, Writing, Career, Spirituality, Memoir, Autobiography, Discipline],
  readingTime: "N min",
  keyInsights: exactly 5 items, each 1-2 sentences, non-overlapping, concrete,
  bestFor: 3-4 audience descriptors,
  amazonUrl: canonical amazon link,
  publicationYear: year,
  tldr: 1-2 sentence answer to "what is this book about?",
  faq: 4-5 Q&A pairs for common reader questions,
}

Rules:
- No AI-sounding phrases (no "delve", "dive into", "it's worth noting")
- Lead with specifics, not generalities
- Each insight names a concrete idea, not a vibe
- FAQ answers the question directly, then gives context

Return only the TypeScript object literal.
```

**Then:**
1. Paste the returned object into the `bookReviews` array in `data/book-reviews.ts`
2. Download the cover: `curl -sL -o public/images/library/{slug}.jpg "https://covers.openlibrary.org/b/isbn/{ISBN}-L.jpg?default=false"`
3. If the file is >0 bytes, add `hasCover: true` to the entry

---

## Workflow step 2 — `/library-deepen` (add quotes + chapters)

**When to use:** the book deserves a hub, not just a review.

**Paste this prompt:**

```
I'm deepening a Library OS entry for [TITLE] by [AUTHOR].

Produce two arrays matching these TypeScript types:

type BookQuote = {
  text: string;         // verbatim quote, ideally under 30 words
  chapter?: string;     // "Chapter N — Title" format
  page?: number;        // optional
  context?: string;     // optional one-sentence framing of why it matters
};

type BookChapterSummary = {
  number: number;       // 1-indexed
  title: string;        // exact chapter title
  keyIdea: string;      // one sentence — the chapter's thesis
  summary: string;      // 2-4 sentences — what the chapter argues
};

Produce:
- quotes: 10-20 memorable, load-bearing quotes spread across chapters
- chapters: every chapter of the book, no exceptions

Quality rails:
- Never fabricate. If you can't verify a quote, paraphrase in `context` instead
- Use exact chapter titles as printed in the book
- `keyIdea` is what the reader should remember if they forget everything else
- No spoilers for fiction; for non-fiction, spoil freely

Return two TypeScript array literals.
```

**Then:**
1. Paste `quotes` and `chapters` into the existing entry in `data/book-reviews.ts`
2. The detail page TOC automatically picks up the new sections

---

## Workflow step 3 — `/library-research` (add continue-reading + videos)

**When to use:** final enrichment step. Makes the hub feel like a wiki.

**Paste this prompt:**

```
I'm researching adjacents for a Library OS entry on [TITLE] by [AUTHOR].
Context: it's categorized as [CATEGORIES] and its TL;DR is [TLDR].

Produce two arrays:

type RelatedReadingItem = {
  title: string;
  author: string;
  reason: string;    // ONE SENTENCE explaining why it pairs with [TITLE] — not a summary of the recommended book
  url?: string;      // amazon or publisher URL
};

type BookVideo = {
  title: string;
  creator: string;
  url: string;       // YouTube URL preferred; if uncertain, use a YouTube search URL
  description: string; // 1-2 sentences: what the viewer learns
  duration?: string; // e.g. "16m" or "2h"
  kind?: 'interview' | 'lecture' | 'talk' | 'explainer' | 'summary';
};

Produce:
- continueReading: 6-8 items
  - 1-2 foundational (intellectual ancestors)
  - 1-2 contemporaries (similar arguments, different angle)
  - 1-2 contrarians (challenge or extend the source)
  - 1-2 practical / adjacent applications
- videos: 3-6 items — prioritize the author in long-form, the author's canonical talk, critical engagement, domain explainer

Quality rails:
- `reason` is a connection, not a blurb. "X is where Y's epistemology comes from" beats "A classic of the field"
- Never fabricate URLs. If uncertain, use a YouTube search URL: https://www.youtube.com/results?search_query=...
- Disclose contrarians honestly — e.g. "Penrose argues consciousness is non-computable, directly contradicting Deutsch's Turing principle"

Return two TypeScript array literals.
```

**Then:** paste `continueReading` and `videos` into the entry. Done.

---

## The pen-and-paper path

Library OS works without any AI. Curate your quotes by hand. Write your own chapter summaries. The schema is the spine; the AI is scaffolding that you can remove.

A hand-curated library of 20 books beats an LLM-scraped library of 500. Always.

---

## Working offline / air-gapped

None of Library OS's runtime requires any AI. Once your data is in `data/book-reviews.ts`, `next build` produces static pages that render without any AI calls at request time. You can host the output anywhere static files work (Vercel, Netlify, GitHub Pages, S3, your own box).

The AI is only for the authoring phase — and only if you want it.

---

## Integration into existing tools

- **Readwise users**: export your highlights as CSV, use the AI to cluster by book and produce `quotes[]` arrays
- **Kindle users**: `My Clippings.txt` on the device root — the same pattern works
- **Notion users**: export a book page as markdown, paste into the `/library-deepen` prompt
- **Obsidian users**: your daily note with "just finished [book]" is already a capture signal

The system is deliberately small at its core so it composes with whatever you already do.
