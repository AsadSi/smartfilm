import { Cormorant_Garamond } from 'next/font/google';
import TemplateUdsigt from '@/components/v2/TemplateUdsigt';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

export const metadata = {
  title: 'J · Udsigt — SmartFilm designskabelon',
  description: 'LuxTrips-retningen: en rejsebrochure hvor rejsemålene er de rum, glasset er lavet til.',
};

export default function Page() {
  return (
    <div className={cormorant.variable}>
      <TemplateUdsigt />
    </div>
  );
}
