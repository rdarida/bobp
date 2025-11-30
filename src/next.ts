import { resolve } from 'node:path';

import degit from 'degit';

export type NextOptions = {
  name: string;
};

export async function next({ name }: NextOptions): Promise<void> {
  const emitter = degit('rdarida/template-next#main');
  return await emitter.clone(resolve(process.cwd(), name));
}
