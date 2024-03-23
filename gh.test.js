let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  });

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('GitHub for teams · Build like the best teams on the planet · GitHub');
  }, 1000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  }, 1000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Get started with Team")
  }, 3000);
});

test("The h1 header content on Enterprise page", async () => {
  await page.goto("https://github.com/enterprise");
  await page.waitForSelector('h1');
  const title = await page.title();
  expect(title).toEqual('The AI Powered Developer Platform. · GitHub');
}, 20000);

test("The h1 header content on Explore page", async () => {
  await page.goto("https://github.com/features");
  await page.waitForSelector('h1');
  const title = await page.title();
  expect(title).toEqual('Features | GitHub · GitHub');
}, 20000);

test("The h1 header content on Explore page", async () => {
  await page.goto("https://github.com/features/copilot");
  await page.waitForSelector('h1');
  const title = await page.title();
  expect(title).toEqual('GitHub Copilot · Your AI pair programmer · GitHub');
}, 20000);
