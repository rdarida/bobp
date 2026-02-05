import { existsSync } from 'node:fs';
import { join } from 'node:path';

import { normalize } from '../src/utils';
import { electron } from '../src/electron';

import { TEST_TEMP_DIR } from './constants';

describe('Test electron function', () => {
  const productName = 'Electron App';
  const name = normalize(productName);
  const outputPath = join(TEST_TEMP_DIR, name);

  it('should create an Electron project', async () => {
    await electron({ name, productName, path: TEST_TEMP_DIR });

    expect(existsSync(outputPath)).toBe(true);
  });
});
