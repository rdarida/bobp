import { join } from 'node:path';
import { existsSync, unlinkSync } from 'node:fs';

import { cover } from '../src/cover';

describe('cover()', () => {
  const outputPath = join(process.cwd(), 'cover.png');

  it('should create a non-empty cover.png file', () => {
    cover({
      title: 'Test Title',
      description: 'Line 1\nLine 2',
      path: process.cwd()
    });

    expect(existsSync(outputPath)).toBe(true);
  });

  afterEach(() => {
    if (existsSync(outputPath)) {
      unlinkSync(outputPath);
    }
  });
});
