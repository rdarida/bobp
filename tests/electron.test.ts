import { existsSync } from 'node:fs';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

import { TEST_TEMP_DIR } from './test_constants';

import { normalize } from '../src/utils';
import { electron } from '../src/electron';

describe('Test electron function', () => {
  const productName = 'Electron App';
  const name = normalize(productName);
  const outputPath = join(TEST_TEMP_DIR, name);

  it('should create an Electron project', async () => {
    await electron({ name, productName, path: TEST_TEMP_DIR });

    expect(existsSync(outputPath)).toBe(true);
  });
});
