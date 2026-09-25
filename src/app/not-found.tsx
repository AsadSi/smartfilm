import type { Metadata } from 'next';
import { Footer } from '@/components/Footer';
import { Lit } from '@/components/Lit';
import { NotFound } from '@/components/NotFound';
import { NOT_FOUND } from '@/content/site';

export const metadata: Metadata = {
  title: NOT_FOUND.title,
};

/**
 * Next's own 404 renders inside the root layout without <Lit />, so the body
 * never lost its opacity:0 and a mistyped address showed a blank page.
 */
export default function NotFoundPage() {
  return (
    <>
      <Lit />
      <div className="env" aria-hidden="true" />

      <div className="page">
        <NotFound />
        <Footer base="/" />
      </div>
    </>
  );
}
