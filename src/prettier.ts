import { cp, mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import degit from 'degit';
import { rimraf } from 'rimraf';

const URL = 'https://gist.github.com/rdarida/d087f8bbf55735a85a36967c20409678';

export type PrettierOptions = {
  /**
   * Output path for the generated Prettier configuration files
   * (default: the current working directory)
   */
  path: string;
};

/**
 * Copies Prettier configuration files into the current working directory.
 */
export async function prettier({ path }: PrettierOptions): Promise<void> {
  const tempPrefix = join(tmpdir(), 'bobp-prettier-');
  const tempDir = await mkdtemp(tempPrefix);

  try {
    const emitter = degit(URL);

    await emitter.clone(tempDir);

    await cp(tempDir, path, { recursive: true });
  }
  finally {
    await rimraf(tempDir);
  }
}
