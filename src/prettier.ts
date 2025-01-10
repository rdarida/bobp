import { join } from 'path';
import { copyFileSync, readdirSync } from 'fs';

import { TEMP_DIR } from './constants';

const PRETTIER_DIR = join(TEMP_DIR, 'prettier');

export function prettier(): void {
  const files = readdirSync(PRETTIER_DIR);

  for (const fileName of files) {
    const src = join(PRETTIER_DIR, fileName);
    const dest = join(process.cwd(), `.${fileName}`);
    copyFileSync(src, dest);
  }
}
