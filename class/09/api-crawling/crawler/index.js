import puppeteer from 'puppeteer'
import mongoose from 'mongoose'
import { Stock } from './models/stock.js'

mongoose.connect('mongodb://localhost:27017/dockerfinance')

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
        const stock = new Stock ({
            name: "samsung electronics",
            date: date,
            price: Number(price.replace(",", ""))
        })
        await stock.save()
    }
    
    await browser.close()
}
startCrawling()




