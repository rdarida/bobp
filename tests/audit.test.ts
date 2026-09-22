import { existsSync } from 'node:fs';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

import { audit } from '../src/audit';

describe('Test audit function', () => {
  it('should audit the package.json file at the provided path', async () => {
    const path = join(process.cwd(), 'package.json');

    await audit({ path });
    await audit({ path: join('wrong.json') });

    expect(existsSync(path)).toBe(true);
  });
});
