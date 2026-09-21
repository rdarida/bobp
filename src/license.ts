import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Options used to generate a LICENSE file.
 */
export type LicenseOptions = {
  /** License type (e.g. `MIT`) */
  type: string;

  /** Year to be inserted into the license text */
  year: string;

  /** Author or copyright holder name */
  author: string;

  /**
   * Output path for the generated LICENSE file
   * (default: the current working directory)
   */
  path: string;
};

/**
 * Generates a LICENSE file in the current working directory.
 *
 * @param options Configuration options for the license generation.
 */
export async function license({
  type,
  year,
  author,
  path
}: LicenseOptions): Promise<void> {
  const url = `https://api.github.com/licenses/${type.toLowerCase()}`;

  return await fetch(url)
    .then(res => res.json())
    .then((json: any) => {
      const content = (json.body as string)
        .replace('[year]', year)
        .replace('[fullname]', author)
        .replace('[author]', author);

      writeFileSync(join(path, 'LICENSE'), content);
    })
    .catch();
}
