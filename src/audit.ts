import { existsSync, readFileSync } from 'node:fs';

type PackageJSON = {
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
};

export type AuditOptions = {
  path: string;
};

export async function audit({ path }: AuditOptions): Promise<void> {
  if (!existsSync(path)) {
    return;
  }

  const { dependencies, devDependencies } = JSON.parse(
    readFileSync(path, 'utf-8')
  ) as PackageJSON;

  console.log('audit');

  let keys = Object.keys(dependencies);
  console.log('dependencies:', keys.length);

  for (const key of keys) {
    const response: any = await fetch(`https://registry.npmjs.org/${key}`);
    const json: any = await response.json();
    const latest: string = json['dist-tags'].latest;

    console.log(`${key}:`, dependencies[key], '==>', latest);
  }

  keys = Object.keys(devDependencies);
  console.log('devDependencies:', keys.length);

  for (const key of keys) {
    const response = await fetch(`https://registry.npmjs.org/${key}`);
    const json: any = await response.json();
    const latest: string = json['dist-tags'].latest;

    console.log(`${key}:`, devDependencies[key], '==>', latest);
  }
}
