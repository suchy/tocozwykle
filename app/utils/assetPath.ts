import { fingerprint } from './fingerprint.ts';

export function assetPath(path: string) {
  const hashedPath = fingerprint.getAssetHashedPath(path);

  if (!hashedPath) {
    console.log(
      `Static asset not found in fingerpring manifest: ${path}.`,
    );

    return path;
  }

  return hashedPath;
}
