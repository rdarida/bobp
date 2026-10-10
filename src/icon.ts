import { dirname } from 'node:path';

export enum IconFormat {
  APP = 'app',
  WEB = 'web',
  ALL = 'all'
}

/**
 * Options for generating an icon set.
 */
export type IconOptions = {
  /**
   * Path to the source image file used to generate the icon set.
   * The source image should be a 1024x1024 PNG file.
   */
  source: string;

  /**
   * Format of the generated icon set.
   * Can be 'app', 'web', or 'all'.
   */
  format: IconFormat;

  /**
   * Output path for the generated icon set
   * (default: the current working directory)
   */
  path: string;
};

/**
 * Generates an icon set based on the provided options.
 * @param options Configuration options for generating the icon set.
 */
export function icon({
  source,
  format,
  path = dirname(source)
}: IconOptions): void {
  console.log('icon:', source, format, path);
}
