import { existsSync } from 'node:fs';
import { join } from 'node:path';

import { rimrafSync } from 'rimraf';

import { normalize } from '../src/utils';
import { electron } from '../src/electron';

describe('Test electron function', () => {
  const productName = 'Electron App';
  const name = normalize(productName);
  const outputPath = join(process.cwd(), name);

  it('should create an Electron project', async () => {
    await electron({ name, productName, path: process.cwd() });

    expect(existsSync(outputPath)).toBe(true);
  });

  afterEach(() => {
    rimrafSync(outputPath);
  });
});
