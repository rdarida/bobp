import { existsSync, mkdirSync } from 'node:fs';

import { rimrafSync } from 'rimraf';

import { TEST_TEMP_DIR } from './constants';

export function setup(): void {
  if (existsSync(TEST_TEMP_DIR)) {
    rimrafSync(TEST_TEMP_DIR);
  }

  mkdirSync(TEST_TEMP_DIR, { recursive: true });
}

export function teardown(): void {
  rimrafSync(TEST_TEMP_DIR);
}
