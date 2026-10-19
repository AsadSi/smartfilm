import type { Metadata } from 'next';
import { Footer } from '@/components/Footer';
import { NotFound } from '@/components/NotFound';
import { NOT_FOUND } from '@/content/site';

export const metadata: Metadata = {
  title: NOT_FOUND.title,
};

export default function NotFoundPage() {
  return (
    <>
      <div className="env" aria-hidden="true" />

      <div className="page">
        <NotFound />
        <Footer base="/" />
      </div>
    </>
  );
}
