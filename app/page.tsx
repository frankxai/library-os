import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-2xl text-center">
        <p className="text-[11px] uppercase tracking-[0.3em] text-amber-400/70 mb-6">
          Library OS
        </p>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          Your library lives at{' '}
          <Link
            href="/library"
            className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent underline decoration-amber-400/30 underline-offset-4 hover:decoration-amber-300/60"
          >
            /library
          </Link>
        </h1>
        <p className="text-white/55 leading-relaxed text-[16px] max-w-lg mx-auto mb-10">
          This is a fresh Library OS deployment. Edit{' '}
          <code className="text-white/80 bg-white/5 px-1.5 py-0.5 rounded text-[13px]">
            data/book-reviews.ts
          </code>{' '}
          to add your first book. Then visit{' '}
          <Link href="/library" className="text-amber-300 hover:text-amber-200 underline">
            /library
          </Link>{' '}
          to see it.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/library"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors"
          >
            Go to /library
          </Link>
          <Link
            href="/library/approach"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white/80 text-sm font-medium hover:bg-white/10 transition-colors"
          >
            Read the approach
          </Link>
        </div>
      </div>
    </main>
  );
}
