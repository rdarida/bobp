import { resolve } from 'node:path';

import degit from 'degit';

/**
 * Options used to generate a new Electron project.
 */
export type ElectronOptions = {
  /** Name of the application */
  name: string;
};

/**
 * Creates a new Electron project from a
 * [predefined template](https://github.com/rdarida/template-electron)
 * in the current working directory.
 *
 * @param options Configuration options for the Electron project.
 */
export async function electron(
  electronOptions: ElectronOptions
): Promise<void> {
  await cloneNextTemplate(electronOptions);
}

async function cloneNextTemplate({ name }: ElectronOptions): Promise<void> {
  const emitter = degit('rdarida/template-electron#main');
  return await emitter.clone(resolve(process.cwd(), name));
}
