import "regenerator-runtime";

const timeout = 5000;

describe("E2Eテスト", () => {
  let page;
  const sel = id => `[data-test="${id}"]`;

  beforeAll(async () => {
    page = await browser.newPage();
    await page.goto("http://localhost:3000", {
      waitUntil: ["load", "networkidle2"]
    });
    console.log("beforeAll at navbarWhenLogout");
  });

  afterAll(async done => {
    console.log("afterAll at navbarWhenLogout");
    done();
  });

  it(
    "ログアウト時ナビゲーションのリンク確認",
    async () => {
      await page.waitForSelector(sel("pageTitle"), { visible: true });
      await expect(page).toMatchElement(sel("pageTitle"), {
        text: "Laravel API Development"
      });

      // ナビゲーションリンク（トピックスを押下）
      await Promise.all([
        page.waitForNavigation({ waitUntil: ["load", "networkidle2"] }),
        page.click(sel("naviTopics"))
      ]);
      await page.waitForSelector(sel("pageTitle"), { visible: true });
      await expect(page).toMatchElement(sel("pageTitle"), {
        text: "Latest Topics"
      });
    },
    timeout
  );
  it(
    "ダッシュボードに遷移時はログイン画面にリダイレクト",
    async () => {
      await Promise.all([
        page.waitForNavigation({ waitUntil: ["load", "networkidle2"] }),
        page.click(sel("naviDashboard"))
      ]);

      await page.waitForSelector("h2", { visible: true });
      await expect(page).toMatchElement("h2", {
        text: "ログイン"
      });
    },
    timeout
  );

  it(
    "会員登録ボタン押下時は、登録画面へ遷移",
    async () => {
      await Promise.all([
        page.waitForNavigation({ waitUntil: ["load", "networkidle2"] }),
        page.click(sel("naviRegister"))
      ]);

      await page.waitForSelector("h2", { visible: true });
      await expect(page).toMatchElement("h2", {
        text: "新規アカウント登録"
      });
    },
    timeout
  );

  it(
    "ログインボタン押下時は、ログイン画面へ遷移",
    async () => {
      await Promise.all([
        page.waitForNavigation({ waitUntil: ["load", "networkidle2"] }),
        page.click(sel("naviLogin"))
      ]);

      await page.waitForSelector("h2", { visible: true });
      await expect(page).toMatchElement("h2", {
        text: "ログイン"
      });
    },
    timeout
  );

  it(
    "ホームボタン押下時は、ホーム画面へ遷移",
    async () => {
      await Promise.all([
        page.waitForNavigation({ waitUntil: ["load", "networkidle2"] }),
        page.click(sel("naviHome"))
      ]);

      await page.waitForSelector("h1", { visible: true });
      await expect(page).toMatchElement("h1", {
        text: "Laravel API Development"
      });
    },
    timeout
  );
});
