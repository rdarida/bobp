import * as fs from 'node:fs';
import { join } from 'node:path';

import { afterEach, describe, it, expect, vi } from 'vitest';

import { LicenseOptions, license } from '../src/license';

import { TEST_TEMP_DIR } from './constants';

vi.mock('node:fs', () => {
  return {
    readFileSync: vi.fn(),
    writeFileSync: vi.fn(),
  };
});

describe('Test license function', () => {
  const mockReadFileSync = vi.mocked(fs.readFileSync);
  const mockWriteFileSync = vi.mocked(fs.writeFileSync);

  it('should generate a LICENSE file', () => {
    const options: LicenseOptions = {
      type: 'MIT',
      year: '2025',
      author: 'John Doe',
      path: TEST_TEMP_DIR
    };

    mockReadFileSync.mockReturnValue('Copyright (c) [year] [author]' as any);

    license(options);

    const expectedContent = 'Copyright (c) 2025 John Doe';
    const expectedFilePath = join(TEST_TEMP_DIR, 'LICENSE');

    expect(mockWriteFileSync).toHaveBeenCalledWith(
      expectedFilePath,
      expectedContent
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });
});
