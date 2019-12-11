import { toMatchImageSnapshot } from "jest-image-snapshot";
import "regenerator-runtime";

expect.extend({ toMatchImageSnapshot });

describe("ビジュアルテスト", () => {
  let page;
  const sel = id => `[data-test="${id}"]`;
  const timeout = 5000;

  beforeEach(async () => {
    page = await global.__BROWSER__.newPage();

    page.setViewport({ width: 1200, height: 800 });
    const url = "http://localhost:3000/";
    await page.goto(url, {
      waitUntil: ["load", "networkidle2"],
      timeout: 60000
    });
  }, timeout);

  it("HTML/CSSを含めた見た目が正しい", async () => {
    expect(await page.screenshot({ fullPage: true })).toMatchImageSnapshot();
  });
});
