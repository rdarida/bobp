import { existsSync } from 'node:fs';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

import { audit } from '../src/audit';

describe('Test audit function', () => {
  it('', async () => {
    const path = join(process.cwd(), 'package.json');

    await audit({ path });

    expect(existsSync(path)).toBe(true);
  });
});
