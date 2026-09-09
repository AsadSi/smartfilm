'use client';

import PlaceholderBadge from '@/components/PlaceholderBadge';
import { useT } from '@/components/LanguageProvider';
import { SITE } from '@/content/site';
import { L } from '@/content/types';

/**
 * A named data controller and a stated retention period are what make a
 * confidentiality promise on the enquiry form mean anything. The specifics
 * marked below need SmartFilm's confirmation before launch.
 */
const SECTIONS = [
  {
    title: L('Dataansvarlig', 'Data controller'),
    body: L(
      `SmartFilm Danmark, CVR ${SITE.cvr}, er dataansvarlig for de oplysninger, du afgiver her på sitet. Du kan altid kontakte os på ${SITE.email}.`,
      `SmartFilm Danmark, company reg. no. ${SITE.cvr}, is the data controller for the information you submit on this site. You can always reach us at ${SITE.email}.`,
    ),
    pending: true,
  },
  {
    title: L('Hvad vi indsamler', 'What we collect'),
    body: L(
      'Når du sender en forespørgsel, modtager vi navn, e-mail, eventuelt telefonnummer, hvilket produkt du spørger til, og din beskrivelse af projektet. Vi indsamler ikke andet, og vi beder aldrig om oplysninger, vi ikke skal bruge for at give dig et tilbud.',
      'When you send an enquiry we receive your name, email, any phone number, which product you are asking about, and your description of the project. We collect nothing else, and never ask for information we do not need in order to quote.',
    ),
  },
  {
    title: L('Hvad vi bruger det til', 'What we use it for'),
    body: L(
      'Udelukkende til at besvare din henvendelse og give et tilbud. Vi sælger ikke oplysninger videre, og vi bruger dem ikke til markedsføring, medmindre du selv beder om det.',
      'Solely to answer your enquiry and provide a quote. We do not sell information on, and do not use it for marketing unless you ask us to.',
    ),
  },
  {
    title: L('Hvor længe vi gemmer det', 'How long we keep it'),
    body: L(
      'Forespørgsler, der ikke fører til en opgave, slettes efter 12 måneder. Bliver det til et projekt, gemmer vi materialet, så længe bogføringsloven kræver det.',
      'Enquiries that do not lead to work are deleted after 12 months. If it becomes a project, we keep the material for as long as accounting law requires.',
    ),
    pending: true,
  },
  {
    title: L('Dine rettigheder', 'Your rights'),
    body: L(
      'Du kan altid bede om indsigt i, rettelse af eller sletning af de oplysninger, vi har om dig. Skriv til os, så svarer vi inden for en måned. Du kan klage til Datatilsynet, hvis du ikke er tilfreds med vores svar.',
      'You can always ask for access to, correction of, or deletion of the information we hold about you. Write to us and we will respond within a month. You may complain to the Danish Data Protection Agency if you are not satisfied with our answer.',
    ),
  },
  {
    title: L('Cookies', 'Cookies'),
    body: L(
      'Sitet sætter ikke sporingscookies. Dit sprogvalg gemmes lokalt i din egen browser og sendes aldrig til os.',
      'This site sets no tracking cookies. Your language choice is stored locally in your own browser and is never sent to us.',
    ),
  },
];

export default function PrivacyContent() {
  const t = useT();

  return (
    <section className="band pt-[calc(var(--header-h)+clamp(3rem,6vw,5rem))]">
      <div className="shell-narrow">
        <p className="eyebrow mb-5 block">{t(L('Juridisk', 'Legal'))}</p>
        <h1 className="display-lg text-ink">{t(L('Privatlivspolitik', 'Privacy policy'))}</h1>
        <p className="lead mt-6">
          {t(L(
            'Kort fortalt: vi bruger dine oplysninger til at svare dig, og til ingenting andet.',
            'In short: we use your information to answer you, and for nothing else.',
          ))}
        </p>

        <div className="mt-[clamp(2.5rem,5vw,4rem)] flex flex-col gap-10">
          {SECTIONS.map((section) => (
            <div key={t(section.title)} className="border-t border-line pt-6">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="display-sm text-ink">{t(section.title)}</h2>
                {section.pending ? <PlaceholderBadge label="Skal bekræftes" /> : null}
              </div>
              <p className="mt-3 max-w-[64ch] text-[15.5px] leading-[1.75] text-mut-2">
                {t(section.body)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
