import { existsSync, mkdirSync } from 'node:fs';

import { rimrafSync } from 'rimraf';

import { TEST_TEMP_DIR } from './constants';

export default function globalSetup(): void {
  if (existsSync(TEST_TEMP_DIR)) {
    rimrafSync(TEST_TEMP_DIR);
  }

  mkdirSync(TEST_TEMP_DIR, { recursive: true });
}
