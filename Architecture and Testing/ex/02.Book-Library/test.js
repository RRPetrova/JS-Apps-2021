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
    this.timeout(10000)
    before
        (async () => browser = await chromium.launch(
           { headless: false, slowMo: 500 }
        ));
    after(async () => await browser.close());
    beforeEach(async () => page = await browser.newPage());
    afterEach(async () => await page.close());

    it("static content", async () => {
        await page.goto("http://127.0.0.1:5500/Architecture%20and%20Testing/ex/02.Book-Library/index.html");

        let content = await page.content()
        assert.equal(true, content.includes("Title"));
        assert.equal(true, content.includes("Author"));
        assert.equal(true, content.includes("Action"));


    })

    it("show content", async () => {
        await page.goto("http://127.0.0.1:5500/Architecture%20and%20Testing/ex/02.Book-Library/index.html");

        await page.click("text=Load all books");
        await page.waitForSelector('table');
        let content = await page.content();
        assert.equal(true, content.includes("Harry Potter and the Philosopher's Stone"));
        assert.equal(true, content.includes("C# Fundamentals"));
    })

    it('submit ', async () => {
        const linkPost = "http://localhost:3030/jsonstore/collections/books";

        const mock = {
            title: 'Tipping the velvet',
            author: 'Sarah Waters',
        };

        await page.route(linkPost, route => route.fulfill(json(mock)));
        await page.goto("http://127.0.0.1:5500/Architecture%20and%20Testing/ex/02.Book-Library/index.html");
        await page.waitForSelector('#createForm');
        await page.fill('[name=title]', mock.title);
        await page.fill('[name=author]', mock.author);

        //waitForRequest('http://example.com/resource');
        let [request] = await Promise.all([
            page.waitForRequest(linkPost),
            page.click('form button'),
        ]);

        const postData = JSON.parse(request.postData());
        assert.equal(mock.title, postData.title);
        assert.equal(mock.author, postData.author);
    });

    it.only('del ', async () => {
        await page.goto("http://127.0.0.1:5500/Architecture%20and%20Testing/ex/02.Book-Library/index.html");
        await page.click("text=Load all books");

        const linkPost = "http://localhost:3030/jsonstore/collections/books";
        const mock = {
            title: "Harry Potter and the Philosopher's Stone",
            author: "J.K.Rowling",
        };
        page.route(linkPost, route => route.fulfill(json([mock])));
       
        page.route(linkPost +'/d953e5fb-a585-4d6b-92d3-ee90697398a0',
            route => route.fulfill(json(mock)));

      
      // await page.waitForSelector('table');

        page.on('dialog', dialog => dialog.accept());

        const [request] = await Promise.all([
            page.waitForRequest(linkPost +'/d953e5fb-a585-4d6b-92d3-ee90697398a0'),
            page.click('.deleteBtn')
        ]);

        expect(request.method()).to.equal('DELETE');
    });


    it('edit ', async () => {
        await page.goto("http://127.0.0.1:5500/Architecture%20and%20Testing/ex/02.Book-Library/index.html");
        await page.click("text=Load all books");

        await page.waitForSelector('table');
        await page.click(".editBtn");

        await page.fill('#editForm [name=title]', 'edited Title HP');
        await page.fill('#editForm [name=author]', "edit author JK");

        await page.click("#editForm button");

        await page.click("text=Load all books");
        await page.waitForSelector('table');
        let content = await page.content();
        assert.equal(true, content.includes("edited Title HP"));
        assert.equal(true, content.includes("C# Fundamentals"));

    });
});


