import { Michroma } from 'next/font/google';
import TemplateOrbit from '@/components/v2/TemplateOrbit';

const michroma = Michroma({ subsets: ['latin'], weight: '400', variable: '--font-michroma', display: 'swap' });

export const metadata = {
  title: 'K · Orbit — SmartFilm designskabelon',
  description: 'Den futuristiske retning: enhedsrammer med hak, en kugle med en lysspalte, orange og en glasbue.',
};

export default function Page() {
  return (
    <div className={michroma.variable}>
      <TemplateOrbit />
    </div>
  );
}
