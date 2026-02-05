import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import degit from 'degit';
import { rimrafSync } from 'rimraf';

/**
 * Options used to generate a new Next.js project.
 */
export type NextOptions = {
  /** Name of the project directory and npm package */
  name: string;

  /**
   * Output path for the generated Next.js project
   * (default: the current working directory)
   */
  path: string;
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
  deleteFiles(nextOptions);
  updatePackageJson(nextOptions);
}

async function cloneNextTemplate({ name, path }: NextOptions): Promise<void> {
  const emitter = degit('rdarida/template-next#main');
  return await emitter.clone(join(path, name));
}

function deleteFiles({ name, path }: NextOptions): void {
  ['package-lock.json'].forEach(file => {
    const filePath = join(path, name, file);
    rimrafSync(filePath);
  });
}

function updatePackageJson({ name, path }: NextOptions): void {
  const packageJsonPath = join(path, name, 'package.json');
  const content = readFileSync(packageJsonPath, { encoding: 'utf-8' });

  const object = {
    ...JSON.parse(content),
    name,
    version: '0.0.0'
  };

  writeFileSync(packageJsonPath, JSON.stringify(object, null, 2));
}
