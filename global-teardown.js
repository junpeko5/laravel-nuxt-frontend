// eslint-disable-next-line import/no-extraneous-dependencies
import chalk from "chalk";

const { teardown: teardownPuppeteer } = require("jest-environment-puppeteer");

module.exports = async function globalTeardown(globalConfig) {
  // Your global teardown
  await teardownPuppeteer(globalConfig)

  // eslint-disable-next-line no-console
  console.log(chalk.green("Teardown Puppeteer"));
}
