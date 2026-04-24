import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'My Library — Powered by Library OS',
  description:
    'A permanent, intelligent library of every book I read — built with Library OS.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
