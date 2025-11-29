import { join } from 'node:path';
import { readFileSync, writeFileSync } from 'node:fs';

import { TEMP_DIR } from './constants';

const LICENSE_DIR = join(TEMP_DIR, 'license');

export type LicenseOptions = {
  type: string;
  year: string;
  author: string;
};

export function license({ type, year, author }: LicenseOptions): void {
  const fileName = `${type}.txt`;
  const filePath = join(LICENSE_DIR, fileName);
  const template = readFileSync(filePath, { encoding: 'utf-8' });
  const content = template.replace('[year]', year).replace('[author]', author);
  const destination = join(process.cwd(), 'LICENSE');
  writeFileSync(destination, content);
}
