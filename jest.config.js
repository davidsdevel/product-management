const nextJest = require('next/jest')
require('dotenv').config();

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

const customJestConfig = {
  rootDir: '.',
  /*globals: {
    'process.env.DETA_KEY': process.env.DETA_KEY
  },*/
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'node'
};




module.exports = createJestConfig(customJestConfig);