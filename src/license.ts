import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { TEMPLATES_DIR } from './constants';

/**
 * Absolute path to the license template directory.
 * This directory contains license text templates.
 */
const LICENSE_DIR = join(TEMPLATES_DIR, 'license');

/**
 * Options used to generate a LICENSE file.
 */
export type LicenseOptions = {
  /** License type (e.g. `MIT`) */
  type: string;

  /** Year to be inserted into the license text */
  year: string;

  /** Author or copyright holder name */
  author: string;

  /**
   * Output path for the generated LICENSE file
   * (default: the current working directory)
   */
  path: string;
};

/**
 * Generates a LICENSE file in the current working directory.
 *
 * @param options Configuration options for the license generation.
 */
export function license({ type, year, author, path }: LicenseOptions): void {
  const fileName = `${type}.txt`;
  const filePath = join(LICENSE_DIR, fileName);
  const template = readFileSync(filePath, { encoding: 'utf-8' });
  const content = template.replace('[year]', year).replace('[author]', author);
  const destination = join(path, 'LICENSE');
  writeFileSync(destination, content);
}
