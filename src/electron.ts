import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

import degit from 'degit';
import { rimrafSync } from 'rimraf';

/**
 * Options used to generate a new Electron project.
 */
export type ElectronOptions = {
  /** Name of the project directory and npm package */
  name: string;

  /** Name of the application */
  productName: string;
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
  updatePackageJson(electronOptions);
  deleteFiles(electronOptions);
}

async function cloneNextTemplate({ name }: ElectronOptions): Promise<void> {
  const emitter = degit('rdarida/template-electron#main');
  return await emitter.clone(resolve(process.cwd(), name));
}

function updatePackageJson({ name, productName }: ElectronOptions): void {
  const packageJsonPath = resolve(process.cwd(), name, 'package.json');
  const content = readFileSync(packageJsonPath, { encoding: 'utf-8' });

  const object = {
    ...JSON.parse(content),
    name,
    productName,
    version: '0.0.0'
  };

  writeFileSync(packageJsonPath, JSON.stringify(object, null, 2));
}

function deleteFiles({ name }: ElectronOptions): void {
  ['package-lock.json'].forEach(file => {
    const filePath = resolve(process.cwd(), name, file);
    rimrafSync(filePath);
  });
}
