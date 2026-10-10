/**
 * Options for generating an icon set.
 */
export type IconOptions = {
  /**
   * Path to the source image file used to generate the icon set.
   * The source image should be a 1024x1024 PNG file.
   */
  file: string;

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
export function icon(options: IconOptions): void {
  console.log('icon:', options);
}
