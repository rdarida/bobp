import { join } from 'node:path';
import * as fs from 'node:fs';

import { prettier } from '../src/prettier';

jest.mock('fs');

describe('prettier', () => {
  const mockReaddirSync = fs.readdirSync as jest.Mock;
  const mockCopyFileSync = fs.copyFileSync as jest.Mock;

  it('copies prettier files to root', () => {
    const files = ['prettierrc', 'prettierignore'];
    mockReaddirSync.mockReturnValue(files);

    prettier();

    for (const fileName of files) {
      const src = join(__dirname, '..', 'templates', 'prettier', fileName);
      const dest = join(process.cwd(), `.${fileName}`);

      expect(mockCopyFileSync).toHaveBeenCalledWith(src, dest);
    }

    expect(mockCopyFileSync).toHaveBeenCalledTimes(files.length);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
