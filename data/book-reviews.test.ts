import assert from 'node:assert';
import test from 'node:test';
import {
  getReviewBySlug,
  getReviewsByCategory,
  getAllReviewSlugs,
  getAllReviewCategories,
  bookReviews,
// @ts-ignore
} from './book-reviews.ts';

test('getReviewBySlug returns the correct review for a known slug', () => {
  const review = getReviewBySlug('atomic-habits');
  assert.ok(review);
  assert.strictEqual(review.slug, 'atomic-habits');
  assert.strictEqual(review.title, 'Atomic Habits');
});

test('getReviewBySlug returns undefined for an unknown slug', () => {
  const review = getReviewBySlug('unknown-slug-12345');
  assert.strictEqual(review, undefined);
});

test('getReviewsByCategory returns reviews containing the category', () => {
  const reviews = getReviewsByCategory('Psychology');
  assert.ok(reviews.length > 0);
  reviews.forEach(review => {
    assert.ok(review.categories.includes('Psychology'));
  });
});

test('getReviewsByCategory returns an empty array for an unknown category', () => {
  const reviews = getReviewsByCategory('UnknownCategory12345');
  assert.strictEqual(reviews.length, 0);
});

test('getAllReviewSlugs returns an array of all review slugs', () => {
  const slugs = getAllReviewSlugs();
  assert.strictEqual(slugs.length, bookReviews.length);
  assert.ok(slugs.includes('atomic-habits'));
});

test('getAllReviewCategories returns a unique, sorted array of all categories', () => {
  const categories = getAllReviewCategories();
  assert.ok(categories.length > 0);
  assert.ok(categories.includes('Psychology'));

  // Check uniqueness
  const uniqueCategories = new Set(categories);
  assert.strictEqual(categories.length, uniqueCategories.size);

  // Check sorting
  const sortedCategories = [...categories].sort();
  assert.deepStrictEqual(categories, sortedCategories);
});
