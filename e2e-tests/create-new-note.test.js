const { reject } = require("lodash");
const puppeteer = require("puppeteer");

describe("idg2761 fullstack project", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 40,
    });
    page = await browser.newPage();
    await page.goto("http://localhost:3000");
  });

  afterAll(async () => {
    await browser.close();
  });

  it("should load the homepage", async () => {
    await expect(page.title()).resolves.toMatch("Sustainability Diary");
  });

  it("should navigate to login page and fill out the form", async () => {
    const pr1 = page.click(".test-login");
    const pr2 = page.waitForNavigation({ timeout: 3000, waitUntil: "load" });
    const prAll = Promise.all([pr1, pr2]);
    await prAll;

    await page.type("#email", "simen@example.com");
    await page.type("#password", "simen123");
    await Promise.all([
      page.click("#login-button"),
      page.waitForNavigation({ timeout: 5000, waitUntil: "load" }),
    ]);
  });

  it("should create a new note", async () => {
    await page.type("#title", "Test note title");
    await page.type("#content", "Test note content");
    await page.type("#tags", "test");
    await page.click("#submit-note");
  });
});
