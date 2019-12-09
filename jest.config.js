module.exports = {
  preset: "jest-puppeteer",
  setupFilesAfterEnv: ["./setup.js"],
  testEnvironment: "./custom-environment.js",
  globalSetup: "./global-setup.js",
  globalTeardown: "./global-teardown.js"
};
