import degit from 'degit';

export type PrettierOptions = {
  /**
   * Output path for the generated Prettier configuration files
   * (default: the current working directory)
   */
  path: string;
};

/**
 * Copies Prettier configuration files into the current working directory.
 */
export async function prettier({ path }: PrettierOptions): Promise<void> {
  const emitter = degit(
    'https://gist.github.com/rdarida/d087f8bbf55735a85a36967c20409678'
  );
  return emitter.clone(path);
}
