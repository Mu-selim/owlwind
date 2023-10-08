export default {
  testMatch: ['**/*.test.js'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'json', 'node'],
  testPathIgnorePatterns: [
    '/node_modules/', // Ignore the node_modules directory
    '/dist/', // Ignore your built distribution directory if you have one
  ],
};
