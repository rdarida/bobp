import { join } from 'node:path';
import { existsSync } from 'node:fs';

import { rimrafSync } from 'rimraf';

import { normalize } from '../src/utils';
import { electron } from '../src/electron';

describe('cover()', () => {
  const productName = 'Electron App';
  const name = normalize(productName);
  const outputPath = join(process.cwd(), name);

  it('should create an Electron project', async () => {
    await electron({ name, productName });

    expect(existsSync(outputPath)).toBe(true);
  });

  afterEach(() => {
    rimrafSync(outputPath);
  });
});
