import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import degit from 'degit';
import { rimrafSync } from 'rimraf';

/**
 * Options used to generate a new game project.
 */
export type GameOptions = {
  /** Name of the project directory and npm package */
  name: string;

  /**
   * Output path for the generated game project
   * (default: the current working directory)
   */
  path: string;
};

/**
 * Creates a new game project from a
 * [predefined template](https://github.com/rdarida/template-game)
 * in the current working directory.
 *
 * @param options Configuration options for the game project.
 */
export async function game(gameOptions: GameOptions): Promise<void> {
  await cloneGameTemplate(gameOptions);
  deleteFiles(gameOptions);
  updatePackageJson(gameOptions);
}

async function cloneGameTemplate({ name, path }: GameOptions): Promise<void> {
  const emitter = degit('rdarida/template-game#main');
  return await emitter.clone(join(path, name));
}

function deleteFiles({ name, path }: GameOptions): void {
  ['package-lock.json'].forEach(file => {
    const filePath = join(path, name, file);
    rimrafSync(filePath);
  });
}

function updatePackageJson({ name, path }: GameOptions): void {
  const packageJsonPath = join(path, name, 'package.json');
  const content = readFileSync(packageJsonPath, { encoding: 'utf-8' });

  const object = {
    ...JSON.parse(content),
    name,
    version: '0.0.0'
  };

  writeFileSync(packageJsonPath, JSON.stringify(object, null, 2));
}
