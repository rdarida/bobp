import { join } from 'node:path';
import { copyFileSync, readdirSync } from 'node:fs';

import { TEMP_DIR } from './constants';

/**
 * Absolute path to the Prettier configuration directory.
 * This directory contains Prettier-related configuration files.
 */
const PRETTIER_DIR = join(TEMP_DIR, 'prettier');

/**
 * Copies Prettier configuration files into the current working directory.
 */
export function prettier(): void {
  const files = readdirSync(PRETTIER_DIR);

  for (const fileName of files) {
    const src = join(PRETTIER_DIR, fileName);
    const dest = join(process.cwd(), `.${fileName}`);
    copyFileSync(src, dest);
  }
}
