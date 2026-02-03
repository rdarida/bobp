import { resolve } from 'node:path';
import { readFileSync, writeFileSync } from 'node:fs';

import degit from 'degit';
import { rimrafSync } from 'rimraf';

/**
 * Options used to generate a new Next.js project.
 */
export type NextOptions = {
  /** Name of the project directory and npm package */
  name: string;
};

/**
 * Creates a new Next.js project from a
 * [predefined template](https://github.com/rdarida/template-next)
 * in the current working directory.
 *
 * @param options Configuration options for the Next.js project.
 */
export async function next(nextOptions: NextOptions): Promise<void> {
  await cloneNextTemplate(nextOptions);
  updatePackageJson(nextOptions);
  deleteFiles(nextOptions);
}

async function cloneNextTemplate({ name }: NextOptions): Promise<void> {
  const emitter = degit('rdarida/template-next#main');
  return await emitter.clone(resolve(process.cwd(), name));
}

function updatePackageJson({ name }: NextOptions): void {
  const packageJsonPath = resolve(process.cwd(), name, 'package.json');
  const content = readFileSync(packageJsonPath, { encoding: 'utf-8' });

  const object = {
    ...JSON.parse(content),
    name,
    version: '0.0.0'
  };

  writeFileSync(packageJsonPath, JSON.stringify(object, null, 2));
}

function deleteFiles({ name }: NextOptions): void {
  ['package-lock.json'].forEach(file => {
    const filePath = resolve(process.cwd(), name, file);
    rimrafSync(filePath);
  });
}
