const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    args: ["--lang=de-DE"],
    defaultViewport: {
      width: 1720,
      height: 1360,
      isMobile: false,
    },
  });
  const page = await browser.newPage();
  await page.goto("https://demo.urlaubsverwaltung.cloud");

  await page.waitForSelector("input[name=username]");
  await page.type("input[name=username]", "office");

  await page.waitForSelector("input[name=password]");
  await page.type("input[name=password]", "secret");

  await page.waitForSelector("button[type=submit]");
  page.click("button[type=submit]");

  // wait for rendered calendar
  await page.waitForSelector(".datepicker-months-container");

  await page.screenshot({ path: "static/uv-startseite.png" });

  // =============================================================================
  // mobile screenshot
  //
  await page.setViewport({
    width: 375,
    height: 667,
    deviceScaleFactor: 1,
  });

  // scroll to calendar
  await page.tap("#calendar");

  await page.screenshot({ path: "static/uv-startseite-mobile.png" });

  await browser.close();
})();
