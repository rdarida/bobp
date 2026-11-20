import { existsSync } from 'node:fs';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

import { game } from '../src/game';

import { TEST_TEMP_DIR } from './constants';

describe('Test game function', () => {
  it('should create a game project', async () => {
    const name = 'test-game';
    const outputPath = join(TEST_TEMP_DIR, name);

    await game({ name, path: TEST_TEMP_DIR });

    expect(existsSync(outputPath)).toBe(true);
  });
});
