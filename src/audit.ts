import { existsSync, readFileSync } from 'node:fs';
import { EOL } from 'node:os';

import { blue, green, red, yellow } from 'picocolors';
import type { Formatter } from 'picocolors/types';

/**
 * The audit configuration.
 */
export type AuditOptions = {
  /**
   * The path to the package.json file to audit.
   */
  path: string;
};

const VERSION_REGEX = /\d+\.\d+\.\d+/;
// const CHARS = '┌─┬┐│├┼┤└┴┘•';

/**
 * Checks dependency versions against the latest npm registry releases.
 *
 * @param options The audit configuration.
 */
export async function audit({ path }: AuditOptions): Promise<void> {
  if (!existsSync(path)) {
    return;
  }

  const { dependencies = {}, devDependencies = {} } = JSON.parse(
    readFileSync(path, 'utf-8')
  ) as Record<string, Record<string, string>>;

  const queue: Record<string, Record<string, string>> = {
    dependencies,
    devDependencies
  };

  const queueKeys = Object.keys(queue);

  const lines: string[][] = [['PACKAGE', 'CURRENT', 'LATEST']];

  while (queueKeys.length > 0) {
    const name = queueKeys.shift()!;
    const item = queue[name];
    const keys = Object.keys(item);

    for (const key of keys) {
      const current = clean(item[key]);
      const response = await fetch(`https://registry.npmjs.org/${key}`);

      if (response.status !== 200) {
        lines.push([key, current, '?.?.?']);
        continue;
      }

      const json: any = await response.json();
      const latest: string = json['dist-tags'].latest;

      lines.push([key, current, latest]);
    }
  }

  console.log(format(lines));
}

function clean(version: string): string {
  const match = VERSION_REGEX.exec(version);
  return match ? match[0] : '?.?.?';
}

function format(lines: string[][]): string {
  const maxs = lines.reduce(
    (p, c) => p.map((v, i) => Math.max(v, c[i].length)),
    Array.from({ length: lines[0].length }, () => 0)
  );

  const table: string[] = [];
  let str = '';

  for (let i = 0; i < lines.length; ++i) {
    let [key, current, latest] = lines[i];
    const color = compare(current, latest);

    key = key.padEnd(maxs[0]);
    current = current.padEnd(maxs[1]);
    latest = latest.padEnd(maxs[2]);

    if (i) {
      current = color(current);
      latest = color(latest);
    }

    str = [key, current, latest].map(v => ` ${v} `).join('│');

    table.push(`│${str}│`);

    str = ['', '', '']
      .map((v, j) => v.padEnd(maxs[j], '─'))
      .map(v => `─${v}─`)
      .join('┼');

    str = `├${str}┤`;

    if (i === lines.length - 1) {
      str = str.replace('├', '└').replace('┤', '┘').replaceAll('┼', '┴');
    }

    table.push(str);
  }

  table.unshift(str.replace('└', '┌').replace('┘', '┐').replaceAll('┴', '┬'));

  return table.join(EOL);
}

function compare(current: string, latest: string): Formatter {
  if (current === latest) {
    return green;
  }

  const [a, b, c] = current.split('.').map(v => Number.parseInt(v));
  const [x, y, z] = latest.split('.').map(v => Number.parseInt(v));

  if (a < x) return red;
  else if (b < y) return yellow;
  else if (c < z) return blue;

  return red;
}
