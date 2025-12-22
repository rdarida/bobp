import { resolve } from 'node:path';

import degit from 'degit';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';

export type NextOptions = {
  name: string;
};

export async function next(nextOptions: NextOptions): Promise<void> {
  await cloneNextTemplate(nextOptions);
  updatePackageJson(nextOptions);
}

async function cloneNextTemplate({ name }: NextOptions): Promise<void> {
  const emitter = degit('rdarida/template-next#main');
  return await emitter.clone(resolve(process.cwd(), name));
}

function updatePackageJson({ name }: NextOptions): void {
  const packageJsonPath = resolve(process.cwd(), name, 'package.json');

  if (!existsSync(packageJsonPath)) {
    return;
  }

  const content = readFileSync(packageJsonPath, { encoding: 'utf-8' });

  const object = {
    ...JSON.parse(content),
    name
  };

  writeFileSync(packageJsonPath, JSON.stringify(object, null, 2));
}
