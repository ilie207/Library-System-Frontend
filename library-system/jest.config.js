const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  coverageProvider: "v8",
  testMatch: ["**/*.test.js"],
  moduleNameMapper: {
    "^lib/(.*)$": "<rootDir>/lib/$1",
    "^app/(.*)$": "<rootDir>/app/$1",
  },
};

module.exports = createJestConfig(customJestConfig);
