const puppeteer = require("puppeteer");
const fs = require("fs/promises");

const PAGE_URL =
  "https://www.hansimmo.be/appartement-te-koop-in-borgerhout/10161";

const main = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(PAGE_URL);

  const items = await page.evaluate(() => {
    const description = document.querySelector("article#detail-description-container > div#description").innerText;
    const title = document.querySelector("article#detail-description-container > div#detail-title > div.category").innerText;
    const price = document.querySelector("article#detail-description-container > div#detail-title > div.price").innerText;
    const address = document.querySelector("article#detail-description-container > div#detail-title > div.address").innerText;

    return {
      description: description,
      title: title,
      price: price,
      address: address,
    };
  });

  const jitems = JSON.stringify(items, null, 2);
  await fs.writeFile("result.json", jitems);

  await browser.close();

  return items;
};

main().then((data) => console.log(data));
