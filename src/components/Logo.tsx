import Image from 'next/image';

/**
 * The client's own logo, cut from their brand guide (smartfilm-brand/logo/cut_logo.py, outside this repo):
 * the glass S, then SMARTFILM over DANMARK, without the tagline. It is a
 * picture, so it cannot take the header's colour; there are two, and the
 * stylesheet shows the one that suits the ground — white lettering over the
 * hero and in the dark theme, navy lettering on paper.
 */
export function Logo({ priority }: { priority?: boolean }) {
  return (
    <>
      <Image className="logo-on-dark" src="/assets/logo-dark.webp" alt="" width={588} height={168} priority={priority} />
      <Image className="logo-on-light" src="/assets/logo-light.webp" alt="" width={524} height={168} priority={priority} />
    </>
  );
}
