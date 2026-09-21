import { existsSync } from 'node:fs';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

import { prettier } from '../src/prettier';

import { TEST_TEMP_DIR } from './constants';

describe('Test prettier function', () => {
  it('should create prettier configuration files in the target directory', async () => {
    const path = join(TEST_TEMP_DIR, 'test-prettier');

    await prettier({ path });

    expect(existsSync(join(path, '.editorconfig'))).toBe(true);
    expect(existsSync(join(path, '.prettierignore'))).toBe(true);
    expect(existsSync(join(path, '.prettierrc'))).toBe(true);
  });
});
