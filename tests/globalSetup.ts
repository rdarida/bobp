import { existsSync, mkdirSync } from 'node:fs';

import { TEST_TEMP_DIR } from './test_constants';

import { rimrafSync } from 'rimraf';

export function setup(): void {
  if (existsSync(TEST_TEMP_DIR)) {
    rimrafSync(TEST_TEMP_DIR);
  }

  mkdirSync(TEST_TEMP_DIR, { recursive: true });
}

export function teardown(): void {
  rimrafSync(TEST_TEMP_DIR);
}
