import puppeteer from 'puppeteer'

async function startCrawling() {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    await page.setViewport({ width: 1280, height: 720 })
    await page.goto('https://www.goodchoice.kr/product/search/2')
    await page.waitForTimeout(1000)
    const quality = await page.$eval('#poduct_list_area > li:nth-child(2) > a > div > div.name > div > span',
    (ele) => (ele.textContent))
    const location = await page.$eval('#poduct_list_area > li:nth-child(2) > a > div > div.name > p:nth-child(4)',
    (ele) => (ele.textContent.trim()))
    const name = await page.$eval('#poduct_list_area > li:nth-child(2) > a > div > div.name > strong',
    (ele) => (ele.textContent))
    const price = await page.$eval('#poduct_list_area > li:nth-child(2) > a > div > div.price > p > b',
    (ele) => (ele.textContent))
    console.log(`${quality} ${name} ${location} ${price}`)
}
startCrawling()

