import { resolve } from 'node:path';
import { readFileSync, writeFileSync } from 'node:fs';

import degit from 'degit';
import { rimrafSync } from 'rimraf';

export type NextOptions = {
  name: string;
};

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
