/**
 * books-registry — your OWN books that library reviews can cross-link to.
 *
 * When a library review sets `relatedBook: 'your-book-slug'`, the detail page
 * renders an "If You Liked This, Read Ours" section pointing at your book.
 *
 * If you don't have your own books yet, leave this array empty —
 * the section just won't render for any review.
 *
 * Shape is intentionally minimal; extend as you need for your site.
 */

export interface OwnBook {
  slug: string;
  title: string;
  subtitle?: string;
  description?: string;
}

export const booksRegistry: OwnBook[] = [
  // {
  //   slug: 'my-first-book',
  //   title: 'My First Book',
  //   subtitle: 'A subtitle',
  //   description:
  //     'A short description used in the "If You Liked This" callout.',
  // },
];
