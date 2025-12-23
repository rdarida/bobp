import { join } from 'node:path';
import { existsSync } from 'node:fs';

import { rimrafSync } from 'rimraf';

import { next } from '../src/next';

describe('cover()', () => {
  const name = 'test-next';
  const outputPath = join(process.cwd(), name);

  it('should create a next project', async () => {
    await next({ name });

    expect(existsSync(outputPath)).toBe(true);
  });

  afterEach(() => {
    rimrafSync(outputPath);
  });
});
