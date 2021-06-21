const { chromium } = require('playwright-chromium');
const { expect } = require('chai');
let browser, page;

describe('Messenger tests', async function() {
    this.timeout(60000);
    before(async () => browser = await chromium.launch({headless:false, sloMo:900}));
    after(async () => await browser.close());
    beforeEach(async () => page = await browser.newPage());
    afterEach(async () => await page.close());


    it('tests load messages', async function() {
        await page.goto('http://localhost:3030/01.Messenger/index.html');
        await page.waitForSelector('#messages');
        await page.click('#refresh');
        let input = await page.$eval('#messages', el => el.value);
        console.log(input);
        let messages = input.split('\n');
        expect(messages[0]).to.equals('Spami: Hello, are you there?');
        expect(messages[4]).to.equals('Spami: Hello, George nice to see you! :)))');
    });

    it('tests send messages', async function() {
        await page.goto('http://localhost:3030/01.Messenger/index.html');
        await page.fill('#author', 'Jane');
        await page.fill('#content', 'Hi! I am Jane :)');
        await page.click('#submit');
        await page.click('#refresh');

        const messages = await page.$eval('#messages', elements => elements.value.split('\n'));
        expect(messages[0]).to.equals('Spami: Hello, are you there?');
        expect(messages[5]).to.equals('Jane: Hi! I am Jane :)');
    });


});
