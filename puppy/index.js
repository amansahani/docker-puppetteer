import puppeteer from "puppeteer";

(async () => {
  // Launch a headless browser
  const browser = await puppeteer.launch({
    headless: "new",
    executablePath: "/usr/bin/google-chrome",
    args: [
      //  / "--no-http2",
      "--no-sandbox",
      // "--enable-gpu",
      "--disable-setuid-sandbox",
    ],
  });

  // Open a new page
  const page = await browser.newPage();

  page.setUserAgent(
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
  );
  page.setViewport({ width: 1920, height: 1080 });
  // Navigate to the Myntra page
  await page.goto("https://www.myntra.com/shirt");

  // Extract href attributes from elements with class "product-base a"
  const hrefs = await page.$$eval(".product-base a", (links) =>
    links.map((link) => link.getAttribute("href"))
  );

  // Log the extracted hrefs
  console.log(hrefs);

  // Close the browser
  await browser.close();
})();
