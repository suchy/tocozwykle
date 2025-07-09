import { fingerprint } from '../app/utils/fingerprint.ts';

console.log('Fingerprinting static assets...');

await fingerprint.run();

console.log('Fingerprinting completed.');
