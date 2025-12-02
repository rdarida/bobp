module.exports = {
  git: {
    tagName: 'v${version}',
    commitMessage: 'chore: release v${version}',
    requireCleanWorkingDir: true
  },
  npm: {
    publish: false
  },
  plugins: {
    '@release-it/conventional-changelog': {
      preset: 'conventionalcommits',
      infile: 'CHANGELOG.md'
    }
  }
};
