import puppeteer from 'puppeteer'
import { Starbucks } from './models/starbucks.js'
import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/miniproject').then(console.log('connected!'))


async function fetchCoffeeData() {
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    await page.goto('https://www.starbucks.co.kr/menu/drink_list.do')
    await page.waitForTimeout(1000)
    const names = await page.$$eval('.menuDataSet dd', names => names.map(name => name.textContent))
    const imgs = await page.$$eval('.goDrinkView img[src]', imgs => imgs.map(img => img.getAttribute('src')))

    for (let i=0; i<40; i++) {
        const coffee = await new Starbucks({
            name: names[i],
            img: imgs[i]
        })
        await coffee.save()
        console.log(coffee)
    }

    browser.close()
}

fetchCoffeeData()
