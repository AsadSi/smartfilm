'use client';

import Image from 'next/image';
import { useT } from './lang';

type Item = { image: string; alt: string; matte?: string; panes?: string[] };

/**
 * A product's picture with the "Visualisering" label, and for Smart Film the
 * matte photograph over its left half, so one picture shows both states. Shared by the front-page cards and the
 * product pages so the label can never be left off one of them.
 */
export function ProductShot({ item, sizes, priority }: { item: Item; sizes: string; priority?: boolean }) {
  const { REFS } = useT();
  return (
    <div className="prod-shot">
      <span className="badge">{REFS.badge}</span>
      <Image src={item.image} alt={item.alt} width={943} height={621} sizes={sizes} priority={priority} />
      {item.matte && item.panes ? (
        <>
          <Image src={item.matte} alt="" aria-hidden="true" className="half" width={943} height={621} sizes={sizes} priority={priority} />
          <div className="split" aria-hidden="true">
            {item.panes.map((label) => <i key={label}><b>{label}</b></i>)}
          </div>
        </>
      ) : null}
    </div>
  );
}
