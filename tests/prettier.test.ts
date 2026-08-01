import * as fs from 'node:fs';
import { join } from 'node:path';

import { afterEach, describe, it, expect, vi } from 'vitest';

import { prettier } from '../src/prettier';

import { TEST_TEMP_DIR } from './constants';

vi.mock('node:fs', () => {
  return {
    readdirSync: vi.fn(),
    copyFileSync: vi.fn(),
  };
});

describe('Test prettier function', () => {
  const mockReaddirSync = vi.mocked(fs.readdirSync);
  const mockCopyFileSync = vi.mocked(fs.copyFileSync);

  it('copies prettier files to root', () => {
    const files = ['prettierrc', 'prettierignore'];
    mockReaddirSync.mockReturnValue(files as any);

    prettier({ path: TEST_TEMP_DIR });

    for (const fileName of files) {
      const src = join(__dirname, '..', 'templates', 'prettier', fileName);
      const dest = join(TEST_TEMP_DIR, `.${fileName}`);

      expect(mockCopyFileSync).toHaveBeenCalledWith(src, dest);
    }

    expect(mockCopyFileSync).toHaveBeenCalledTimes(files.length);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });
});
