import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { Token } from './src/models/token.js'
import { User } from './src/models/user.js'
import { Starbucks } from './src/models/starbucks.js'
import { securePersonal } from './src/utils.js'
import { checkValidationPhone, getToken, sendTokenToSMS } from './src/phone.js'
import { checkValidationEmail, getWelcomeTemplate, sendTemplateToEmail } from './src/email.js'
import { fetchOG } from './src/crawler.js'

const app = express()
const port = 8080

app.use(express.json())
app.use(cors())

app.post('/user', async (req, res) => {
    const tokenTarget = await Token.findOne({ phone: req.body.phone }).exec()
    if (tokenTarget===null || !tokenTarget.isAuth) {
        res.status(422).send("Error 422: 핸드폰 인증을 다시 시도해주세요")}
    
    else if (tokenTarget.isAuth) {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            personal: req.body.personal,
            prefer: req.body.prefer,
            pwd: req.body.pwd,
            phone: req.body.phone,
            og: await fetchOG(req.body.prefer)
        })
        await user.save()
        //탬플릿 및 이메일 내용 수정
        const isValidEmail = checkValidationEmail(user.email)
        if (isValidEmail) {
            const template = getWelcomeTemplate(user)
            sendTemplateToEmail(user.email, template)
            console.log('sent email!')
        }
        res.send(user._id)
    }
})

app.get('/users', async (req, res) => {
    const users = await User.find()
    res.send(users)
})

//핸드폰 번호 맞는 형태인지 확인, req.body.phone 변수 저장, 깔끔하게 정리
app.post('/tokens/phone', async (req, res) => {
    const tokenNum = getToken()
    sendTokenToSMS(req.body.phone, tokenNum)

    const tokenFound = await Token.findOne({ phone: req.body.phone }).exec()
    if (tokenFound !== null) {
        console.log("인증번호가 업데이트되었습니다")
        await Token.updateOne({ phone: req.body.phone }, { token: tokenNum })
    }
    else {
        const token = new Token({
            phone: req.body.phone,
            token: tokenNum,
            isAuth: false
        })
        await token.save()
        console.log("인증번호가 저장되었습니다")
    }
    res.send(`${req.body.phone}으로 인증 문자가 전송되었습니다.`)
})

app.patch('/tokens/phone', async (req, res) => {
    const dataTarget = await Token.findOne({ phone: req.body.phone }).exec()
    if (dataTarget===null || dataTarget.token != req.body.token) res.send(false)
    else if (dataTarget.token === req.body.token) {
        await Token.updateOne({ phone: req.body.phone }, { isAuth: true })
        res.send(true)
    }
})

app.get('/starbucks', async (req, res) => {
    const data = Starbucks.find()
    res.send(data)
})

await mongoose.connect('mongodb://database:27017/miniproject')

app.listen(port, () => {
    console.log(`Listening to port ${port}...`)
})