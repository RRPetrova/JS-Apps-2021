const { chromium } = require("playwright-chromium");
const { expect, assert } = require("chai");

let browser, page;
describe("test", function () {
    this.timeout(6000)
    before
        (async () => browser = await chromium.launch(
            { headless: false, slowMo: 500 }
        ));
    after(async () => await browser.close());
    beforeEach(async () => page = await browser.newPage());
    afterEach(async () => await page.close());

    it("static content", async () => {
        await page.goto("http://127.0.0.1:5500/Architecture%20and%20Testing/lab/01_Accordion/index.html");

        let content = await page.content()
        assert.equal(true, content.includes("Unix"));
        assert.equal(true, content.includes("Scalable Vector Graphics"));
        assert.equal(true, content.includes("<span>Open standard"));
        assert.equal(true, content.includes("ALGOL"));
    })

    it("staticContent firstArt", async () => {
        await page.goto("http://127.0.0.1:5500/Architecture%20and%20Testing/lab/01_Accordion/index.html");
        let content = await page.textContent(".accordion .head span")
        assert.equal(true, content.includes("Scalable Vector Graphics"));
    })

    
    it("show content", async () => {
        await page.goto("http://127.0.0.1:5500/Architecture%20and%20Testing/lab/01_Accordion/index.html");
       
        await page.click("text=More");
       // console.log(await page.isVisible(".extra p"));
        assert.equal(true, await page.isVisible(".extra p"));
    })
})
