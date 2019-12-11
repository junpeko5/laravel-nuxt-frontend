import "regenerator-runtime";

const timeout = 5000;

describe("E2Eテスト", () => {
  let page;
  const sel = id => `[data-test="${id}"]`;

  beforeAll(async () => {
    page = await global.__BROWSER__.newPage();
    await page.goto("http://localhost:3000/login", {
      waitUntil: ["load", "networkidle2"]
    });
  }, timeout);

  afterAll(async done => {
    done();
  });

  it(
    "投稿処理の確認",
    async () => {
      await page.waitForSelector(sel("emailInput"), { visible: true });
      await page.waitForSelector(sel("passwordInput"), { visible: true });
      await page.type(sel("emailInput"), "junpeko@example.com");
      await page.type(sel("passwordInput"), "secret");
      await Promise.all([
        page.waitForNavigation(),
        page.click(sel("loginButton"))
      ]);

      // await page.waitForSelector("h2", { visible: true });
      // await expect(page).toMatchElement("h2", {
      //   text: "トピック投稿"
      // });
      // await page.type(sel("titleInput"), "テストタイトル");
      // await page.type(sel("bodyInput"), "テスト投稿");
      // await page.click(sel("createButton"));
      // await page.waitForSelector(sel("topicTitle"));
      // await page.evaluate(() => sel("topicTitle").textContent);
      // await page.waitFor(2000);
      // await page.waitForSelector(sel("topicTitle"));
      // await page.click(sel("logoutLink"));
      // await page.waitForSelector(sel("naviLogin"));
      // await expect(page).toMatch("ログイン");
    },
    timeout
  );
});
