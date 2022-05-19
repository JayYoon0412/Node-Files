import express from 'express'
import cors from 'cors'
import { checkValidationPhone, getToken, sendTokenToSMS } from './src/phone.js'
import { Token } from './src/models/token.js'
import mongoose from 'mongoose'

const app = express()
const port = 8080

app.use(express.json())
app.use(cors())

app.post('/tokens/phone',  async(req, res) => {
    const tokenNum = getToken()
    sendTokenToSMS(req.body.phone, tokenNum)

    const TokenQ = await Token.findOne({phone: req.body.phone}).exec()
    if ( TokenQ !== null) {
    console.log("updated!")
    await Token.updateOne({phone: req.body.phone}, {token: tokenNum})
    }
    else {
        const token = new Token({
            phone: req.body.phone,
            token: tokenNum,
            isAuth: false
        })
        await token.save()
        console.log("saved")
    }
    res.send(`${req.body.phone}으로 인증 문자가 전송되었습니다.`)
})

app.patch('/tokens/phone', async(req, res)=> {
    const dataTarget = await Token.findOne({phone: req.body.phone}).exec()
    if (dataTarget===null) res.send(false)
    else if (dataTarget.token !== req.body.token) res.send(false)
    else if (dataTarget.token === req.body.token) {
        await Token.updateOne({phone: req.body.phone}, {isAuth: true})
        res.send(true)
    }
})

await mongoose.connect('mongodb://database:27017/mydocker')

app.listen(8080, () => {
    console.log(`Listening to port ${port}...`)
})