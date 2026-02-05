#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import {
  CoverOptions,
  ElectronOptions,
  LicenseOptions,
  NextOptions,
  PrettierOptions,
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
    'cover <title> <description>',
    'Generates a PNG cover image (cover.png) in the current working directory',
    yargs => {
      return yargs
        .positional('title', {
          type: 'string',
          describe: 'Main title text displayed on the cover',
          demandOption: true
        })
        .positional('description', {
          type: 'string',
          describe: 'Description text displayed below the title',
          demandOption: true
        })
        .option('path', {
          type: 'string',
          describe: 'Output path for the generated cover image',
          default: process.cwd()
        });
    },
    options => cover(options)
  )
  .command<LicenseOptions>(
    'license <author> [year] [type]',
    'Generates a LICENSE file in the current working directory',
    yargs => {
      return yargs
        .positional('author', {
          type: 'string',
          describe: 'Author or copyright holder name',
          demandOption: true
        })
        .positional('year', {
          type: 'string',
          describe: 'Year to be inserted into the license text',
          default: new Date().getFullYear().toString()
        })
        .positional('type', {
          type: 'string',
          describe: 'License type (e.g. "mit")',
          default: 'mit'
        })
        .option('path', {
          type: 'string',
          describe: 'Output path for the generated LICENSE file',
          default: process.cwd()
        });
    },
    options => license(options)
  )
  .command<ElectronOptions>(
    'electron <productName> [name]',
    'Creates a new Electron project in the current working directory',
    yargs => {
      return yargs
        .positional('productName', {
          type: 'string',
          describe: 'Name of the application',
          demandOption: true
        })
        .positional('name', {
          type: 'string',
          describe: 'Name of the project directory and npm package'
        })
        .option('path', {
          type: 'string',
          describe: 'Output path for the generated Electron project',
          default: process.cwd()
        });
    },
    async ({ productName, name, path }) => {
      name = name || normalize(productName);
      await electron({ name, productName, path });
    }
  )
  .command<NextOptions>(
    'next <name>',
    'Creates a new Next.js project in the current working directory',
    yargs => {
      return yargs
        .positional('name', {
          type: 'string',
          describe: 'Name of the project directory and npm package',
          demandOption: true
        })
        .option('path', {
          type: 'string',
          describe: 'Output path for the generated Next.js project',
          default: process.cwd()
        });
    },
    async options => await next(options)
  )
  .command<PrettierOptions>(
    'prettier',
    'Copies Prettier configuration files into the current working directory',
    yargs => {
      return yargs.option('path', {
        type: 'string',
        describe: 'Output path for the generated Prettier configuration files',
        default: process.cwd()
      });
    },
    options => prettier(options)
  )
  .help()
  .strict()
  .parse();
