#!/usr/bin/env node
import yargs from 'yargs';

import { LicenseOptions, license } from '.';

yargs
  .scriptName('bobp')
  .usage('$0 <cmd> [args]', 'Usage')
  .demandCommand(1, 'Need 1')
  .command<LicenseOptions>(
    'license <author> [year] [type]',
    'Someting',
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
  .help()
  .strict()
  .parseSync();
