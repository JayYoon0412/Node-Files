import puppeteer from 'puppeteer'

async function startCrawling() {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    await page.setViewport({ width: 1280, height: 720 })
    await page.goto('https://finance.naver.com/item/sise.naver?code=005930')
    await page.waitForTimeout(1000)
    const frame = await page.frames().find((ele) => ele.url().includes("/item/sise_day.naver?code=005930"))
    
    for (let i=3; i<8; i++) {
        const date = await frame.$eval(`body > table.type2 > tbody > tr:nth-child(${i}) > td:nth-child(1) > span`,
        (ele) => ele.textContent)
        const price = await frame.$eval(`body > table.type2 > tbody > tr:nth-child(${i}) > td:nth-child(2) > span`,
        (ele) => ele.textContent)
        console.log(date, price)
    }
    
    await browser.close()
}
startCrawling()




