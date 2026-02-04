import { join } from 'node:path';
import { copyFileSync, readdirSync } from 'node:fs';

import { TEMP_DIR } from './constants';

/**
 * Absolute path to the Prettier configuration directory.
 * This directory contains Prettier-related configuration files.
 */
const PRETTIER_DIR = join(TEMP_DIR, 'prettier');

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
export function prettier({ path }: PrettierOptions): void {
  const files = readdirSync(PRETTIER_DIR);

  for (const fileName of files) {
    const src = join(PRETTIER_DIR, fileName);
    const dest = join(path, `.${fileName}`);
    copyFileSync(src, dest);
  }
}
