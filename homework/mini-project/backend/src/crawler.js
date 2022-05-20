import axios from 'axios'
import cheerio from 'cheerio'

//CAUTION: this function takes time. call await keyword to create Metaobj
export async function fetchOG(myurl) {
    const result = await axios.get(myurl)
    const $ = cheerio.load(result.data)
    const map = new Map()
    $('meta').each((_, ele) => {
        if ($(ele).attr('property')) {
            const key = $(ele).attr('property').split(':')[1]
            const value = $(ele).attr('content')
            map.set(key, value)
        }
    })
    const og = {
        title: map.get("title"),
        description: map.get("description"),
        image: map.get("image")
    }
    return og
}