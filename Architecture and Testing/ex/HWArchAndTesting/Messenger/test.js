const { chromium } = require("playwright-chromium");
const { expect, assert } = require("chai");

let browser, page;

function json(data) {
    return {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
}


describe("test", function () {
    this.timeout(6000)
    before
        (async () => browser = await chromium.launch(
            //    { headless: false, slowMo: 500 }
        ));
    after(async () => await browser.close());
    beforeEach(async () => page = await browser.newPage());
    afterEach(async () => await page.close());

    it("static content", async () => {
        await page.goto("http://127.0.0.1:5500/Architecture%20and%20Testing/ex/01.Messenger/index.html");

        let content = await page.content()
        assert.equal(true, content.includes("Name:"));
        assert.equal(true, content.includes("Message:"));

    })

    it("show content", async () => {
        await page.goto("http://127.0.0.1:5500/Architecture%20and%20Testing/ex/01.Messenger/index.html");

        await page.click("text=Refresh");
        let arrVal = await page.$eval("#messages", el => el.value);
        console.log(arrVal);
        assert.equal(`Spami: Hello, are you there?\nGarry: Yep, whats up :?\nSpami: How are you? Long time no see? :)\nGeorge: Hello, guys! :))\nSpami: Hello, George nice to see you! :)))`, arrVal);
    })
    //await page.goto("http://127.0.0.1:5500/Architecture%20and%20Testing/ex/01.Messenger/index.html");



    it('send ', async () => {
        const linkPost = "http://localhost:3030/jsonstore/messenger";
      
        const mock = {
            author: 'B',
            content: 'hi from B'
        };
        await page.route(linkPost, route => route.fulfill(json(mock)));
        await page.goto("http://127.0.0.1:5500/Architecture%20and%20Testing/ex/01.Messenger/index.html");
        await page.waitForSelector('#controls');
        await page.fill('#author', mock.author);
        await page.fill('#content', mock.content);

        //waitForRequest('http://example.com/resource');
        let [request] = await Promise.all([
            page.waitForRequest(linkPost),
            page.click('text=Send')
        ]);
        
        const postData = JSON.parse(request.postData());
        assert.equal(mock.content, postData.content);
        assert.equal(mock.author, postData.author);
    });
});


