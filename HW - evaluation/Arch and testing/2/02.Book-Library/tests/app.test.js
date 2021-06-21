const { chromium } = require('playwright-chromium');
const { expect } = require('chai');
let browser, page;

describe('book-library tests', async function () {
    this.timeout(60000);
    before(async () => browser = await chromium.launch({headless:false, sloMo:900}));
    after(async () => await browser.close());
    beforeEach(async () => page = await browser.newPage());
    afterEach(async () => await page.close());

        it('should load books', async function () {
            await page.goto('http://localhost:63342/02.Book-Library/index.html');
            await page.click('#loadBooks');
            await page.waitForSelector('td');

            await page.screenshot({path: `loadedBooks.png`});
        });
    }
)