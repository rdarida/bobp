import { existsSync } from 'node:fs';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

import { TEST_TEMP_DIR } from './test_constants';

import { LicenseOptions, license } from '../src/license';

describe('Test license function', () => {
  it('should create a LICENSE file for the MIT license', async () => {
    const options: LicenseOptions = {
      type: 'MIT',
      year: '2025',
      author: 'John Doe',
      path: TEST_TEMP_DIR
    };

    await license(options);

    expect(existsSync(join(TEST_TEMP_DIR, 'LICENSE'))).toBe(true);
  });
});
