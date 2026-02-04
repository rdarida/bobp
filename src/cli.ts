#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import {
  CoverOptions,
  ElectronOptions,
  LicenseOptions,
  NextOptions,
  cover,
  electron,
  license,
  next,
  normalize,
  prettier
} from '.';

yargs(hideBin(process.argv))
  .scriptName('bobp')
  .usage('$0 <cmd> [args]', 'Usage')
  .demandCommand(1, 'Need 1')
  .command<CoverOptions>(
    'cover <title> <description> [path]',
    'Generates a PNG cover image (cover.png) in the current working directory',
    yargs => {
      return yargs
        .positional('title', {
          demandOption: true,
          describe: 'Main title text displayed on the cover',
          type: 'string'
        })
        .positional('description', {
          demandOption: true,
          describe: 'Description text displayed below the title',
          type: 'string'
        })
        .positional('path', {
          default: process.cwd(),
          describe: 'Output path for the generated cover image',
          type: 'string'
        });
    },
    options => cover(options)
  )
  .command<LicenseOptions>(
    'license <author> [year] [type] [path]',
    'Generates a LICENSE file in the current working directory',
    yargs => {
      return yargs
        .positional('author', {
          demandOption: true,
          describe: 'Author or copyright holder name',
          type: 'string'
        })
        .positional('year', {
          default: new Date().getFullYear().toString(),
          describe: 'Year to be inserted into the license text',
          type: 'string'
        })
        .positional('type', {
          default: 'mit',
          describe: 'License type (e.g. "mit")',
          type: 'string'
        })
        .positional('path', {
          default: process.cwd(),
          describe: 'Output path for the generated LICENSE file',
          type: 'string'
        });
    },
    options => license(options)
  )
  .command<ElectronOptions>(
    'electron <productName> [name] [path]',
    'Creates a new Electron project in the current working directory',
    yargs => {
      return yargs
        .positional('productName', {
          demandOption: true,
          describe: 'Name of the application',
          type: 'string'
        })
        .positional('name', {
          describe: 'Name of the project directory and npm package',
          type: 'string'
        })
        .positional('path', {
          default: process.cwd(),
          describe: 'Output path for the generated Electron project',
          type: 'string'
        });
    },
    async ({ productName, name, path }) => {
      name = name || normalize(productName);
      await electron({ name, productName, path });
    }
  )
  .command<NextOptions>(
    'next <name> [path]',
    'Creates a new Next.js project in the current working directory',
    yargs => {
      return yargs
        .positional('name', {
          demandOption: true,
          describe: 'Name of the project directory and npm package',
          type: 'string'
        })
        .positional('path', {
          default: process.cwd(),
          describe: 'Output path for the generated Next.js project',
          type: 'string'
        });
    },
    async options => await next(options)
  )
  .command(
    'prettier [path]',
    'Copies Prettier configuration files into the current working directory',
    yargs => {
      return yargs.positional('path', {
        default: process.cwd(),
        describe: 'Output path for the generated Prettier configuration files',
        type: 'string'
      });
    },
    options => prettier(options)
  )
  .help()
  .strict()
  .parse();
