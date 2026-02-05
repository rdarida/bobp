import * as fs from 'node:fs';
import { join } from 'node:path';

import { LicenseOptions, license } from '../src/license';

import { TEST_TEMP_DIR } from './constants';

jest.mock('fs');

describe('Test license function', () => {
  const mockReadFileSync = fs.readFileSync as jest.Mock;
  const mockWriteFileSync = fs.writeFileSync as jest.Mock;

  it('should generate a LICENSE file', () => {
    const options: LicenseOptions = {
      type: 'MIT',
      year: '2025',
      author: 'John Doe',
      path: TEST_TEMP_DIR
    };

    mockReadFileSync.mockReturnValue('Copyright (c) [year] [author]');

    license(options);

    const expectedContent = 'Copyright (c) 2025 John Doe';
    const expectedFilePath = join(TEST_TEMP_DIR, 'LICENSE');

    expect(mockWriteFileSync).toHaveBeenCalledWith(
      expectedFilePath,
      expectedContent
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
