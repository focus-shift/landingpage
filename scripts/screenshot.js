const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    defaultViewport: {
      width: 1720,
      height: 1360,
      isMobile: false,
    },
  });

  const page = await browser.newPage();

  await page.setExtraHTTPHeaders({
    "Accept-Language": "de",
  });

  await page.goto("https://demo.urlaubsverwaltung.cloud");

  await page.waitForSelector("input[name=username]");
  await page.type("input[name=username]", "office");

  await page.waitForSelector("input[name=password]");
  await page.type("input[name=password]", "secret");

  await page.waitForSelector("button[type=submit]");
  page.click("button[type=submit]");

  // wait for rendered calendar
  await page.waitForSelector(".calendar-container");

  await page.screenshot({ path: "src/assets/uv-startseite.png" });

  // =============================================================================
  // mobile screenshot
  //
  await page.setViewport({
    width: 375,
    height: 667,
    deviceScaleFactor: 1,
  });

  // scroll to calendar
  // tap: scroll into the center of the view
  await page.tap("#calendar");
  // and scroll some pixels to the top
  await page.$eval('#calendar', () => window.scrollBy(0, 25));

  // minimizing the viewport shows the menu overlay shortly.
  await wait(500);

  await page.screenshot({ path: "src/assets/uv-startseite-mobile.png" });

  await browser.close();
})();

function wait(delay = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}
