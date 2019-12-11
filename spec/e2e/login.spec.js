import "regenerator-runtime";

const timeout = 500;

describe("E2Eテスト", () => {
  let page;
  const sel = id => `[data-test="${id}"]`;

  beforeAll(async () => {
    page = await browser.newPage();
    await page.goto("http://localhost:3000/login", {
      waitUntil: ["load", "networkidle2"]
    });
  });

  afterAll(async done => {
    done();
  });

  it(
    "ログイン処理の確認",
    async () => {
      await page.waitFor(3000);
      await page.waitForSelector(sel("emailInput"), { visible: true });
      await page.waitForSelector(sel("passwordInput"), { visible: true });
      await page.type(sel("emailInput"), "junpeko@example.com");
      await page.type(sel("passwordInput"), "secret");
      await Promise.all([
        page.waitForNavigation({ waitUntil: ["load", "networkidle2"] }),
        page.click(sel("loginButton"))
      ]);

      // await page.waitForSelector("h2", { visible: true });
      // await expect(page).toMatchElement("h2", {
      //   text: "トピック投稿"
      // });
      // await page.waitFor(3000);
      // await page.waitFor(3000);
      // await page.waitForSelector("h2", { visible: true });
      // await expect(page).toMatchElement("h2", {
      //   text: "トピック投稿"
      // });
    },
    timeout
  );

  // it(
  //   "ログアウト処理の確認",
  //   async () => {
  //     await Promise.all([
  //       page.waitForNavigation({ waitUntil: ["load", "networkidle2"] }),
  //       page.click(sel("logoutLink"))
  //     ]);
  //     await page.waitForSelector(sel("naviLogin"));
  //     await expect(page).toMatchElement(sel("naviLogin"), {
  //       text: "ログイン"
  //     });
  //   },
  //   timeout
  // );
});
