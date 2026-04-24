# Getting Started — Your First Book in 10 Minutes

This walkthrough takes you from empty clone to a live library page for your first book.

## Prerequisites

- Node.js 18 or newer
- A GitHub account (for hosting)
- A Vercel account (for deployment) — free tier is fine
- 10 minutes

## 1. Clone and boot

```bash
git clone https://github.com/frankxai/library-os.git my-library
cd my-library
npm install
npm run dev
```

Open [http://localhost:3000/library](http://localhost:3000/library) — you'll see the two example books (Profit First + Fabric of Reality).

## 2. Add your first book

Open `data/book-reviews.ts` and append a new entry to the `bookReviews` array.

Minimum viable shape:

```ts
{
  slug: 'my-first-book',
  title: 'My First Book',
  author: 'Author Name',
  coverImage: '/images/library/my-first-book.jpg',
  rating: 5,
  reviewDate: '2026-04-24',
  categories: ['Self-Development'],
  readingTime: '5 min',
  keyInsights: [
    'Insight 1 — one sentence stating a concrete idea.',
    'Insight 2 — another concrete idea.',
    'Insight 3 — keep going, non-overlapping.',
    'Insight 4 — specific, not vague.',
    'Insight 5 — five total.',
  ],
  bestFor: [
    'Target audience descriptor 1',
    'Target audience descriptor 2',
    'Target audience descriptor 3',
  ],
},
```

Save. Refresh [http://localhost:3000/library](http://localhost:3000/library) — your book appears at the top (sorted by reviewDate DESC).

Click into it at [http://localhost:3000/library/my-first-book](http://localhost:3000/library/my-first-book).

## 3. Add a cover (optional)

Download a cover from OpenLibrary by ISBN:

```bash
curl -sL -o public/images/library/my-first-book.jpg \
  "https://covers.openlibrary.org/b/isbn/YOUR_ISBN-L.jpg?default=false"
```

If the file is 0 bytes, the ISBN has no cover on OpenLibrary — either leave `hasCover` out (falls back to letter-gradient) or sideload your own 2:3 JPEG (~330×500).

Then set `hasCover: true` on your entry.

## 4. Deepen the book (optional but powerful)

Add these optional fields to turn the review-page into a deep-dive hub:

```ts
// Added to your entry
tldr: 'One to two sentences stating the book\'s thesis.',
faq: [
  { q: 'A question readers ask about this book', a: 'A direct answer.' },
  { q: 'Another common question', a: 'Another answer.' },
  // 4 or 5 total
],
publicationYear: 2024,
quotes: [
  {
    text: 'A memorable quote from the book.',
    chapter: 'Chapter 3 — Chapter Title',
    context: 'Optional — one sentence framing why this matters.',
  },
  // 10–20 total
],
chapters: [
  {
    number: 1,
    title: 'Exact Chapter Title',
    keyIdea: 'One sentence — the chapter\'s thesis.',
    summary: 'Two to four sentences — what the chapter argues.',
  },
  // Every chapter of the book
],
continueReading: [
  {
    title: 'Related Book Title',
    author: 'That Author',
    reason: 'One to two sentences explaining why this pairs with your book.',
    url: 'https://example.com/optional-url',
  },
  // 6–8 total
],
videos: [
  {
    title: 'Video or Talk Title',
    creator: 'Channel or Speaker',
    url: 'https://youtube.com/...',
    description: 'One to two sentences: what the viewer learns.',
    duration: '1h 20m',
    kind: 'interview', // or 'lecture', 'talk', 'explainer', 'summary'
  },
  // 3–6 total
],
```

Save. The TOC on the detail page now shows all the sections you populated.

## 5. Deploy

Push to your GitHub:

```bash
git remote add origin git@github.com:YOUR_USERNAME/my-library.git
git push -u origin main
```

Then on [Vercel](https://vercel.com/new):

1. Import your GitHub repo
2. Framework preset: Next.js (auto-detected)
3. Click Deploy

Your library is now live at `your-project.vercel.app/library`. Add your own domain in Vercel project settings.

## Using the slash commands (Claude Code)

If you're using Claude Code, three commands automate most of this:

```
/library-add "Book Title" by Author
/library-deepen {slug}
/library-research {slug}
```

See `.claude/commands/` for the full prompts.

## Using it with ChatGPT / other AI tools

See [`docs/cross-ai-guide.md`](./cross-ai-guide.md) for paste-ready prompts that work anywhere.

## Next steps

- [Read the Manifesto](../MANIFESTO.md) — why we build libraries
- [Schema reference](./schema.md) — every field of BookReview explained
- [Cross-AI guide](./cross-ai-guide.md) — the workflow without Claude Code
- [Live reference](https://frankx.ai/library) — see a fully-populated library in production
