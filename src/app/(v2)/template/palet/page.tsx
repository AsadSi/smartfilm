import { Unbounded } from 'next/font/google';
import TemplatePalet from '@/components/v2/TemplatePalet';

const unbounded = Unbounded({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-unbounded', display: 'swap' });

export const metadata = {
  title: 'I · Palet — SmartFilm designskabelon',
  description: 'Produktskærme med deres palet svævende over sig. Vælg en farve, og glasset tænder.',
};

export default function Page() {
  return (
    <div className={unbounded.variable}>
      <TemplatePalet />
    </div>
  );
}
