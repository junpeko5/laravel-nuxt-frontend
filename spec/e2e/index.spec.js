import "regenerator-runtime";

describe("E2Eテスト", () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3000')
  });

  afterAll(async done => {
    done();
  })

  it("ページのタイトルが表示されること", async () => {
    await page.waitForSelector('h1', { visible: true })
    await expect(page).toMatchElement(
      "h1", { text: "Laravel API Development" }
    );
  });
});
