import puppeteer from "puppeteer";
import mkdirp from "mkdirp";
import path from "path";
import fs from "fs";
import os from "os"
import "regenerator-runtime";

const DIR = path.join(os.tmpdir(), "jest_puppeteer_global_setup");

export default async function() {
  const browser = await puppeteer.launch();
  // store the browser instance so we can teardown it later
  // this global is only available in the teardown but not in TestEnvironments
  global.__BROWSER_GLOBAL__ = browser;

  // use the file system to expose the wsEndpoint for TestEnvironments
  mkdirp.sync(DIR);
  fs.writeFileSync(path.join(DIR, "wsEndpoint"), browser.wsEndpoint());
}
