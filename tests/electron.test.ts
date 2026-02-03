import { join } from 'node:path';
import { existsSync } from 'node:fs';

import { rimrafSync } from 'rimraf';

import { electron } from '../src/electron';

describe('cover()', () => {
  const name = 'test-electron';
  const outputPath = join(process.cwd(), name);

  it('should create an Electron project', async () => {
    await electron({ name });

    expect(existsSync(outputPath)).toBe(true);
  });

  afterEach(() => {
    rimrafSync(outputPath);
  });
});
