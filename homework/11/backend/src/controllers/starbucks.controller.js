import { Starbucks } from '../models/starbucks.js'

export class StarbucksController {
    async showStarbucks (req, res) {
        const data = await Starbucks.find()
        res.send(data)
    }
}