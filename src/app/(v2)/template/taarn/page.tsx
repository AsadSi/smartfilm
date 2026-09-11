import { Italiana } from 'next/font/google';
import TemplateTaarn from '@/components/v2/TemplateTaarn';

const italiana = Italiana({ subsets: ['latin'], weight: '400', variable: '--font-italiana', display: 'swap' });

export const metadata = {
  title: 'H · Tårn — SmartFilm designskabelon',
  description: 'Et tårn i skyerne, og en rulning der flyver ind gennem facaden og et vindue, der klarner.',
};

export default function Page() {
  return (
    <div className={italiana.variable}>
      <TemplateTaarn />
    </div>
  );
}
