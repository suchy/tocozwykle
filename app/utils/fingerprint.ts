import { basename, extname, join } from '@std/path';
import { ensureFile, walk } from '@std/fs';
import { encodeHex } from '@std/encoding';
import { crypto } from '@std/crypto';

type FingerpringManifest = {
  timestamp?: string;
  assets: Record<string, string>;
};

export class Fingerprint {
  config: {
    manifestFilePath: string;
    staticAssetsDirPath: string;
    appDirPath: string;
  };

  manifest: FingerpringManifest = {
    assets: {},
    timestamp: '',
  };

  constructor(
    config: {
      manifestFilePath: string;
      staticAssetsDirPath: string;
      appDirPath: string;
    },
  ) {
    this.config = config;
  }

  async loadManifestFile() {
    try {
      await ensureFile(this.config.manifestFilePath);

      const manifestContent = await Deno.readTextFile(
        this.config.manifestFilePath,
      );

      this.manifest = JSON.parse(manifestContent);
    } catch {
      console.log('Manifest file not found. Using empty manifest.');
    }
  }

  async saveManifestFile() {
    await Deno.writeTextFile(
      this.config.manifestFilePath,
      JSON.stringify(this.manifest, null, 2),
    );
  }

  async run() {
    await this.loadManifestFile();

    const assetsToFingerprint = await this.#getAssetsToFingerprint();

    if (!assetsToFingerprint.length) {
      return;
    }

    for (const asset of assetsToFingerprint) {
      const hash = await this.#getAssetHash(asset);

      const assetRelativePath = asset.replace(
        this.config.staticAssetsDirPath,
        '',
      );

      const filename = basename(assetRelativePath);

      const extension = extname(filename);

      const hashedFilename = filename.replace(
        extension,
        `-${hash}${extension}`,
      );

      const assetHashedRelativePath = assetRelativePath.replace(
        filename,
        hashedFilename,
      );

      const hashedPath = join(
        this.config.staticAssetsDirPath,
        assetHashedRelativePath,
      )
        .replace(this.config.appDirPath, '');

      const relativePath = asset.replace(this.config.appDirPath, '');

      const manifestEntry = Object.entries(fingerprint.manifest.assets).find(
        ([, originalPath]) => originalPath === relativePath,
      );

      if (manifestEntry) {
        const [existingHashedPath] = manifestEntry;
        delete fingerprint.manifest.assets[existingHashedPath];
      }

      fingerprint.manifest.assets[hashedPath] = relativePath;
    }

    fingerprint.manifest.timestamp = new Date().toISOString();

    await fingerprint.saveManifestFile();
  }

  getAssetHashedPath(assetOriginalPath: string) {
    const manifestEntries = Object.entries(fingerprint.manifest.assets);

    for (const [hashedPath, originalPath] of manifestEntries) {
      if (originalPath === assetOriginalPath) {
        return hashedPath;
      }
    }

    return assetOriginalPath;
  }

  getAssetOriginalPath(assetHashedPath: string) {
    return fingerprint.manifest.assets[assetHashedPath];
  }

  getScriptsImportMap() {
    const imports: Record<string, string> = {};

    const manifestEntries = Object.entries(fingerprint.manifest.assets);

    for (const [hashedPath, originalPath] of manifestEntries) {
      if (!originalPath.endsWith('.js')) {
        continue;
      }

      imports[originalPath] = hashedPath;
    }

    return { imports };
  }

  async #getAssetsToFingerprint() {
    const filesAndDirs = await Array.fromAsync(
      walk(this.config.staticAssetsDirPath),
    );

    const manifestTimestamp = this.manifest.timestamp
      ? new Date(this.manifest.timestamp)
      : undefined;

    const assets: string[] = [];

    for (const f of filesAndDirs) {
      if (!f.isFile) {
        continue;
      }

      const { mtime } = await Deno.lstat(f.path);

      if (!mtime) {
        continue;
      }

      if (manifestTimestamp && mtime <= manifestTimestamp) {
        continue;
      }

      assets.push(f.path);
    }

    return assets;
  }

  async #getAssetHash(filePath: string) {
    const fileContent = await Deno.readFile(filePath);
    const hashBuffer = await crypto.subtle.digest('MD5', fileContent);
    const hash = encodeHex(hashBuffer);

    return hash;
  }
}

export const fingerprint = new Fingerprint({
  manifestFilePath: join(Deno.cwd(), 'data', 'fingerprint.json'),
  staticAssetsDirPath: join(Deno.cwd(), 'app', 'static'),
  appDirPath: join(Deno.cwd(), 'app'),
});
