import * as fs from 'fs';
import { join } from 'path';

import { LicenseOptions, license } from '../src/license';

jest.mock('fs');

describe('Test license function', () => {
  const mockReadFileSync = fs.readFileSync as jest.Mock;
  const mockWriteFileSync = fs.writeFileSync as jest.Mock;

  it('should generate a LICENSE file', () => {
    const options: LicenseOptions = {
      type: 'MIT',
      year: '2025',
      author: 'John Doe'
    };

    mockReadFileSync.mockReturnValue('Copyright (c) [year] [author]');

    license(options);

    const expectedContent = 'Copyright (c) 2025 John Doe';
    const expectedFilePath = join(process.cwd(), 'LICENSE');

    expect(mockWriteFileSync).toHaveBeenCalledWith(
      expectedFilePath,
      expectedContent
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
