import { rimrafSync } from 'rimraf';

import { TEST_TEMP_DIR } from './constants';

export default function globalTeardown(): void {
  rimrafSync(TEST_TEMP_DIR);
}
