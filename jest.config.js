module.exports = {
  rootDir: './__tests__',
  testSequencer: './config/sequencer.js',
  // setupFilesAfterEnv: ['./config/setup.js'],
  /* testRegex: './*\\.test\\.js$', */
  testRegex: './01_database.test.js$',
  testTimeout: 1800000,
};
