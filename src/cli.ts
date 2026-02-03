#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import {
  CoverOptions,
  LicenseOptions,
  NextOptions,
  cover,
  license,
  next,
  prettier
} from '.';

yargs(hideBin(process.argv))
  .scriptName('bobp')
  .usage('$0 <cmd> [args]', 'Usage')
  .demandCommand(1, 'Need 1')
  .command<LicenseOptions>(
    'license <author> [year] [type]',
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
        });
    },
    options => license(options)
  )
  .command<NextOptions>(
    'next <name>',
    'next description',
    yargs => {
      return yargs.positional('name', {
        demandOption: true,
        describe: '',
        type: 'string'
      });
    },
    async options => await next(options)
  )
  .command(
    'prettier',
    'Copies Prettier configuration files into the current working directory',
    yargs => yargs,
    () => prettier()
  )
  .command<CoverOptions>(
    'cover <title> <description>',
    'cover description',
    yargs => {
      return yargs
        .positional('title', {
          demandOption: true,
          describe: '',
          type: 'string'
        })
        .positional('description', {
          demandOption: true,
          describe: '',
          type: 'string'
        });
    },
    options => cover(options)
  )
  .help()
  .strict()
  .parse();
