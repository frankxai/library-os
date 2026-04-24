# Schema Reference

Every field of `BookReview` and its sub-types, documented.

Canonical source: [`app/books/types.ts`](../app/books/types.ts).

## BookReview

### Required

| Field | Type | Notes |
|---|---|---|
| `slug` | `string` | kebab-case, unique. Used in the URL `/library/{slug}` |
| `title` | `string` | Exact book title |
| `author` | `string` | Exact author name |
| `coverImage` | `string` | Path under `/public/`, e.g. `/images/library/atomic-habits.jpg` |
| `rating` | `number` | 1–5 |
| `reviewDate` | `string` | ISO date `YYYY-MM-DD`. Used to sort the index (newest first) |
| `categories` | `string[]` | 1–3 from the color-mapped set (see `app/library/page.tsx`) |
| `readingTime` | `string` | Free-form, e.g. `"6 min"` |
| `keyInsights` | `string[]` | Exactly 5 items, each 1–2 sentences, non-overlapping |
| `bestFor` | `string[]` | 3–4 audience descriptors |

### Optional — core

| Field | Type | Notes |
|---|---|---|
| `amazonUrl` | `string` | Canonical amazon.com URL |
| `relatedBook` | `string` | slug of one of YOUR books from `booksRegistry` |
| `publicationYear` | `number` | Appears in JSON-LD `Book.datePublished` |
| `hasCover` | `boolean` | Gates the `<Image>` render. False/absent → letter-gradient fallback |

### Optional — AEO layer

| Field | Type | Notes |
|---|---|---|
| `tldr` | `string` | 1–2 sentence thesis. Shown as "The Short Answer" card above Key Insights. Used in meta description |
| `faq` | `Array<{q, a}>` | 4–5 Q&A pairs. Shown as accordion below Best For. Emits FAQPage schema |

### Optional — deep-dive layer

| Field | Type | Notes |
|---|---|---|
| `quotes` | `BookQuote[]` | 10–20 curated quotes. Emits Quotation schema per item |
| `chapters` | `BookChapterSummary[]` | Every chapter of the book |
| `continueReading` | `RelatedReadingItem[]` | 6–8 external books with why-they-pair reason |
| `videos` | `BookVideo[]` | 3–6 videos with kind + duration |

## BookQuote

```ts
{
  text: string;       // verbatim quote
  chapter?: string;   // "Chapter N — Title" format
  page?: number;      // optional
  context?: string;   // optional one-sentence framing
}
```

### Quality rails
- Quotes over paraphrases. If you can't find the exact wording, note it in `context`, never in `text`
- Under 30 words ideally, under 60 hard limit
- Spread across chapters (diverse coverage)

## BookChapterSummary

```ts
{
  number: number;   // 1-indexed
  title: string;    // exact chapter title as printed
  keyIdea: string;  // one sentence — the chapter's thesis
  summary: string;  // 2-4 sentences — what the chapter argues
}
```

### Quality rails
- Cover every chapter, no cherry-picking
- `keyIdea` is what the reader should remember if they forget everything else
- `summary` argues, doesn't recap (especially for non-fiction)

## RelatedReadingItem

```ts
{
  title: string;
  author: string;
  reason: string;     // ONE SENTENCE connection — not a blurb
  url?: string;       // amazon or publisher URL
}
```

### Quality rails
- `reason` is a *connection*, not a description of the recommended book
- Never fabricate URLs; omit `url` if uncertain
- If you only have 4 strong pairings, ship 4 — don't pad

## BookVideo

```ts
{
  title: string;
  creator: string;         // channel or host
  url: string;             // YouTube URL or YouTube search URL
  description: string;     // 1-2 sentences — what the viewer learns
  duration?: string;       // e.g. "16m", "2h 30m"
  kind?: 'interview' | 'lecture' | 'talk' | 'explainer' | 'summary';
}
```

### Quality rails
- Never fabricate direct URLs. If uncertain, use `https://www.youtube.com/results?search_query=...`
- Describe the value, not the video
- Prioritize entry points (short talks) over comprehensiveness (3h podcasts)

## JSON-LD schema graph

The detail page emits, via `app/library/[slug]/page.tsx::JsonLd`:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "BreadcrumbList", ... },
    { "@type": "Article", ... },
    { "@type": "Review", ... },
    { "@type": "FAQPage", ... },       // if faq present
    { "@type": "Quotation", ... }      // one per quote
  ]
}
```

A deeply-populated book emits 20–30+ schema nodes. All are validated by [Google Rich Results Test](https://search.google.com/test/rich-results).

## Categories — color-mapped set

The index page (`app/library/page.tsx`) renders category chips with color. Existing colors:

- Self-Development, Habits, Psychology, Productivity, Focus, Mindset, Fitness
- Fiction, Philosophy, Stoicism, Creativity, Wealth, Classic
- Writing, Career, Spirituality, Memoir, Autobiography, Discipline

To add a new category, edit `categoryColors` at the top of `app/library/page.tsx`.

## booksRegistry (your own books)

`app/books/lib/books-registry.ts` holds YOUR books. When a BookReview sets `relatedBook: 'your-slug'`, the detail page shows an "If You Liked This, Read Ours" section linking to your book.

Empty array is fine — the section simply won't render for any review.
