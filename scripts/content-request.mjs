#!/usr/bin/env node
/**
 * Prints what SmartFilm needs to supply, generated from the content files so it
 * cannot drift from the site.
 *
 *   node scripts/content-request.mjs > CONTENT-REQUEST.md
 */
import { readFileSync } from 'node:fs';

const specsFile = readFileSync('src/content/specs.ts', 'utf8');
const specs = specsFile.slice(specsFile.indexOf('export const SPEC_GROUPS'));
const da = (s) => (s.match(/L\('([^']*)'/) ?? [])[1];

const out = [];
out.push('# Indhold vi mangler fra SmartFilm\n');
out.push('Sitet er færdigbygget og kan gå live. Intet herunder vises som tomt felt —');
out.push('rækker uden tal er skjult, indtil I sender dem. Men de to punkter under');
out.push('"Skal på plads inden lancering" er lovkrav.\n');

out.push('\n## Skal på plads inden lancering\n');
out.push('- **CVR-nummer** — står som `00000000` i footeren. Et dansk erhvervssite skal oplyse det.');
out.push('- **Privatlivspolitik** — dataansvarlig og opbevaringsperiode skal bekræftes (GDPR).');
out.push('- **Modtager af kontaktformularen** — sæt `ENQUIRY_WEBHOOK_URL`, ellers lander forespørgsler ingen steder.\n');

out.push('\n## Rettighed til videomateriale\n');
out.push('Referencevideoen havde et **FILMBASE-vandmærke** indlejret, hvilket tyder på');
out.push('en preview-fil frem for en licenseret download. Vandmærket er nu klippet væk,');
out.push('men I bør bekræfte, at I har rettighederne til klippet.\n');

out.push('\n## Datablade — de tal, der mangler\n');
out.push('Disse rækker er bygget ind i databladet, men skjules, indtil I sender tallene.\n');
for (const [, slug, body] of specs.matchAll(/^  '([a-z0-9-]+)': \[$([\s\S]*?)^  \],$/gm)) {
  out.push(`\n**${slug}**\n`);
  for (const [, group, rows] of body.matchAll(
    /title: (L\('[^']*'[^)]*\)),\n(?:\s*standard:[^\n]*\n)?\s*rows: \[([\s\S]*?)\n      \],/g,
  )) {
    const pending = [...rows.matchAll(/\n\s*p\((L\('[^']*'[^)]*\))\)/g)].map((m) => da(m[1]));
    if (pending.length) out.push(`- _${da(group)}:_ ${pending.join(', ')}`);
  }
}

out.push('\n\n## Når I har mere materiale\n');
out.push('Disse sektioner er taget ud, fordi vi ikke opfinder indhold. Sig til, når I har:\n');
out.push('- **Referenceprojekter** — kundenavn (eller accept af fx "Retailkæde, København"),');
out.push('  sted, årstal, og helst tre tal pr. projekt. Så bygger vi casesektionen.');
out.push('- **Kundelogoer** — dem I har lov til at vise.');
out.push('- **Godkendelser** — CE, brandklasse (EN 13501-1), garantiperiode, leveringstid.');
out.push('- **Filer til download** — datablad, snitdetaljer (CAD), montagevejledning, garantibetingelser.');
out.push('  Indtil de findes, henviser databladet til at rekvirere dem hos jer.\n');

console.log(out.join('\n'));
