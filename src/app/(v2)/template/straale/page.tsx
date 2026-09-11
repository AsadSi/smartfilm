import { Geist } from 'next/font/google';
import TemplateStraale from '@/components/v2/TemplateStraale';

// Loaded here rather than in the shared layout: the second set of templates
// each bring their own face, and only the route that uses one should pay for it.
const geist = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap' });

export const metadata = {
  title: 'G · Stråle — SmartFilm designskabelon',
  description: 'Huly-retningen: en lysstråle i mørket, og styringen af glasset som et rigtigt app-vindue.',
};

export default function Page() {
  return (
    <div className={geist.variable}>
      <TemplateStraale />
    </div>
  );
}
