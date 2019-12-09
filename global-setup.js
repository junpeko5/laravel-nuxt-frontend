import "regenerator-runtime";
// eslint-disable-next-line import/no-extraneous-dependencies
import chalk from "chalk";

const { setup: setupPuppeteer } = require("jest-environment-puppeteer");

module.exports = async function globalSetup(globalConfig) {
  await setupPuppeteer(globalConfig);
  // Your global setup
  // eslint-disable-next-line no-console
  console.log(chalk.green("Setup Puppeteer"));
};
