module.exports = {
  preset: "jest-puppeteer",
  testRegex: "./*.test.js",
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
