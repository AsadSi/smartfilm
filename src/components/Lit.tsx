'use client';

import { useEffect } from 'react';

/**
 * The body starts at opacity 0 and fades once the page is ready, so the
 * reader never sees the fonts swap or the grid snap into place. Nothing
 * renders here — it only flips the class the stylesheet is waiting for.
 */
export function Lit() {
  useEffect(() => {
    document.body.classList.add('lit');
  }, []);
  return null;
}
