import { existsSync } from 'node:fs';
import { join } from 'node:path';

import { rimrafSync } from 'rimraf';

import { next } from '../src/next';

describe('cover()', () => {
  const name = 'test-next';
  const outputPath = join(process.cwd(), name);

  it('should create a Next.js project', async () => {
    await next({ name, path: process.cwd() });

    expect(existsSync(outputPath)).toBe(true);
  });

  afterEach(() => {
    rimrafSync(outputPath);
  });
});
