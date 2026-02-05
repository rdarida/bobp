import { existsSync } from 'node:fs';
import { join } from 'node:path';

import { cover } from '../src/cover';

import { TEST_TEMP_DIR } from './constants';

describe('Test cover function', () => {
  it('should create a non-empty cover.png file', () => {
    const outputPath = join(TEST_TEMP_DIR, 'cover.png');

    cover({
      title: 'Test Title',
      description: 'Line 1\nLine 2',
      path: TEST_TEMP_DIR
    });

    expect(existsSync(outputPath)).toBe(true);
  });
});
