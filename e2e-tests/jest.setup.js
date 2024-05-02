const puppeteer = require("puppeteer");

beforeAll(async () => {
  global.browser = await puppeteer.launch();
});

afterAll(async () => {
  await global.browser.close();
});
