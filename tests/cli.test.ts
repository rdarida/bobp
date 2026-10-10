import {
  beforeEach,
  afterEach,
  describe,
  expect,
  it,
  vi,
  type Mock
} from 'vitest';

describe('Test cli', () => {
  let originalArgv: string[];
  let auditMock: Mock;
  let coverMock: Mock;
  let licenseMock: Mock;
  let electronMock: Mock;
  let nextMock: Mock;
  let prettierMock: Mock;

  beforeEach(() => {
    vi.resetModules();

    originalArgv = process.argv;
    vi.clearAllMocks();

    auditMock = vi.fn();
    coverMock = vi.fn();
    licenseMock = vi.fn();
    electronMock = vi.fn();
    nextMock = vi.fn();
    prettierMock = vi.fn();

    vi.doMock('../src', () => ({
      audit: auditMock,
      cover: coverMock,
      license: licenseMock,
      electron: electronMock,
      next: nextMock,
      prettier: prettierMock
    }));
  });

  it('should execute audit command with all the command line options', async () => {
    process.argv = ['node', 'bobp', 'audit', '--path', 'package.json'];

    await import('../src/cli.js');

    expect(auditMock).toHaveBeenCalledTimes(1);

    expect(auditMock).toHaveBeenCalledWith({
      $0: 'bobp',
      _: ['audit'],
      path: 'package.json'
    });
  });

  it('should execute cover command with all the command line options', async () => {
    process.argv = [
      'node',
      'bobp',
      'cover',
      'title',
      'description',
      '--path',
      'output'
    ];

    await import('../src/cli.js');

    expect(coverMock).toHaveBeenCalledTimes(1);

    expect(coverMock).toHaveBeenCalledWith({
      $0: 'bobp',
      _: ['cover'],
      title: 'title',
      description: 'description',
      path: 'output'
    });
  });

  it('should execute license command with all the command line options', async () => {
    process.argv = [
      'node',
      'bobp',
      'license',
      'John Doe',
      '2026',
      'mit',
      '--path',
      'output'
    ];

    await import('../src/cli.js');

    expect(licenseMock).toHaveBeenCalledTimes(1);

    expect(licenseMock).toHaveBeenCalledWith({
      $0: 'bobp',
      _: ['license'],
      author: 'John Doe',
      year: '2026',
      type: 'mit',
      path: 'output'
    });
  });

  it('should execute electron command with all the command line options', async () => {
    process.argv = [
      'node',
      'bobp',
      'electron',
      'ElectronApp',
      'electron-app',
      '--path',
      'output'
    ];

    await import('../src/cli.js');

    expect(electronMock).toHaveBeenCalledTimes(1);

    expect(electronMock).toHaveBeenCalledWith({
      productName: 'ElectronApp',
      name: 'electron-app',
      path: 'output'
    });
  });

  it('should execute next command with all the command line options', async () => {
    process.argv = ['node', 'bobp', 'next', 'next-app', '--path', 'output'];

    await import('../src/cli.js');

    expect(nextMock).toHaveBeenCalledTimes(1);

    expect(nextMock).toHaveBeenCalledWith({
      $0: 'bobp',
      _: ['next'],
      name: 'next-app',
      path: 'output'
    });
  });

  it('should execute prettier command with all the command line options', async () => {
    process.argv = ['node', 'bobp', 'prettier', '--path', 'output'];

    await import('../src/cli.js');

    expect(prettierMock).toHaveBeenCalledTimes(1);

    expect(prettierMock).toHaveBeenCalledWith({
      $0: 'bobp',
      _: ['prettier'],
      path: 'output'
    });
  });

  afterEach(() => {
    process.argv = originalArgv;
    vi.restoreAllMocks();
    vi.doUnmock('../src');
  });
});
