#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { CoverOptions, LicenseOptions, cover, license, prettier } from '.';

yargs(hideBin(process.argv))
  .scriptName('bobp')
  .usage('$0 <cmd> [args]', 'Usage')
  .demandCommand(1, 'Need 1')
  .command<LicenseOptions>(
    'license <author> [year] [type]',
    'license description',
    yargs => {
      return yargs
        .positional('author', {
          demandOption: true,
          describe: '',
          type: 'string'
        })
        .positional('year', {
          default: new Date().getFullYear().toString(),
          describe: '',
          type: 'string'
        })
        .positional('type', {
          default: 'mit',
          describe: '',
          type: 'string'
        });
    },
    options => license(options)
  )
  .command(
    'prettier',
    'prettier description',
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
  .parseSync();
