import { existsSync } from 'node:fs';
import { join } from 'node:path';

import { next } from '../src/next';

import { TEST_TEMP_DIR } from './constants';

describe('Test next function', () => {
  it('should create a Next.js project', async () => {
    const name = 'test-next';
    const outputPath = join(TEST_TEMP_DIR, name);

    await next({ name, path: TEST_TEMP_DIR });

    expect(existsSync(outputPath)).toBe(true);
  });
});
