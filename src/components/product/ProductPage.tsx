'use client';

import ApplicationsGrid from '@/components/ApplicationsGrid';
import EndCta from '@/components/EndCta';
import FaqAccordion from '@/components/FaqAccordion';
import SpecSheet from '@/components/SpecSheet';
import ProductHero from './ProductHero';
import ProductSubnav from './ProductSubnav';
import { ClaimBands, FigureRow, NextProducts, ProductLoop, ProductPhoto } from './ProductBody';
import { getProduct } from '@/content/products';

/** Every product page is the same sequence, driven by the product record. */
export default function ProductPage({ slug }: { slug: string }) {
  const product = getProduct(slug);
  if (!product) return null;

  return (
    <>
      <ProductHero product={product} />
      <ProductSubnav name={product.name} />
      <FigureRow product={product} />
      <ClaimBands product={product} />
      <ProductLoop product={product} />
      <ApplicationsGrid slug={product.slug} />
      <ProductPhoto product={product} />
      <SpecSheet slug={product.slug} name={product.name} />
      <FaqAccordion product={product.slug} />
      <NextProducts slug={product.slug} />
      <EndCta />
    </>
  );
}
