#!/usr/bin/env node
/**
 * Reports what SmartFilm still owes before the site is finished.
 *
 * Two different things are tracked:
 *
 *  - **Pending spec rows** live in `src/content/specs.ts` but are filtered out
 *    of the rendered datasheet, so they cost the visitor nothing. They are a
 *    to-do list, not a defect.
 *  - **Legal placeholders** — the CVR number and the privacy statements — DO
 *    ship, because a Danish business site is required to carry them. These are
 *    the ones that must not survive to launch.
 *
 *   node scripts/check-placeholders.mjs --strict   # fails on legal placeholders
 */
import { readFileSync } from 'node:fs';

const strict = process.argv.includes('--strict');
const read = (f) => readFileSync(`src/${f}`, 'utf8');

const pendingSpecs = (read('content/specs.ts').match(/\n\s*p\(L\(/g) ?? []).length;
const cvrPending = /cvrPlaceholder: true/.test(read('content/site.ts'));
const privacyPending = (read('app/privatlivspolitik/PrivacyContent.tsx').match(/pending: true/g) ?? [])
  .length;

console.log('');
if (pendingSpecs) {
  console.log(`  ${pendingSpecs} datasheet figures not yet supplied (hidden from the site).`);
} else {
  console.log('  Datasheets complete.');
}

const legal = [];
if (cvrPending) legal.push('CVR number is still 00000000 (required on a Danish business site)');
if (privacyPending) legal.push(`${privacyPending} privacy statement(s) need confirming`);

if (legal.length) {
  console.log('\n  MUST FIX BEFORE LAUNCH:');
  for (const item of legal) console.log(`    - ${item}`);
} else {
  console.log('  No legal placeholders outstanding.');
}
console.log('\n  Full list: CONTENT-REQUEST.md\n');

process.exit(strict && legal.length ? 1 : 0);
