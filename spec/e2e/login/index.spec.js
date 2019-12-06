import "regenerator-runtime";

describe("E2Eテスト", () => {
  let page;
  beforeAll(async () => {
    page = await global.__BROWSER__.newPage();
    await page.goto("http://localhost:3000/login");
  });

  afterAll(async done => {
    done();
  });

  it("ページのタイトルが表示されること", async () => {
    await page.waitForSelector("h2", { visible: true });
    await expect(page).toMatchElement("h2", {
      text: "ログイン"
    });
  });
});
