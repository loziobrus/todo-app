/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+.tsx?$": [
      "ts-jest",
      {
        isolatedModules: true,
      },
    ],
  },
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/src/tests/jest/styleMock.js",
  },
  bail: true,
};
