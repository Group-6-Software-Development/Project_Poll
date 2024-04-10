module.exports = {
    moduleNameMapper: {
      "\\.(css|less|scss|sss|styl)$": "<rootDir>/node_modules/jest-css-modules",
    },
  };
  module.exports = {
    collectCoverageFrom: [
      "**/*.{js,jsx}",
      "!**/node_modules/**",
      "!**/jest.config.js",
    ],
  };