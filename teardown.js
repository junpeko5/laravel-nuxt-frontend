import os from "os";
// eslint-disable-next-line import/no-extraneous-dependencies
import rimraf from "rimraf";
import path from "path";

const DIR = path.join(os.tmpdir(), "jest_puppeteer_global_setup");
export default async function() {
  // close the browser instance
  await global.__BROWSER_GLOBAL__.close();

  // clean-up the wsEndpoint file
  rimraf.sync(DIR);
}
