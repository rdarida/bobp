/** @jest-config-loader ts-node */
import { defaults, defineConfig } from 'jest-config';

export default defineConfig({
  globalSetup: './tests/globalSetup.ts',
  globalTeardown: './tests/globalTeardown.ts',
  collectCoverage: false, // npm test -- --collectCoverage
  collectCoverageFrom: ['./src/**/*.{ts,tsx}', '!./src/**/*.d.ts'],
  coveragePathIgnorePatterns: [
    ...defaults.coveragePathIgnorePatterns,
    './dist/',
    '/src/cli.ts',
    './tests/'
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  }
});
