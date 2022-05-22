import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import { options } from './swagger/config.options.js'
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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)))

app.post('/user', async (req, res) => {
    const tokenTarget = await Token.findOne({ phone: req.body.phone }).exec()
    if (tokenTarget===null || !tokenTarget.isAuth) {
        res.status(422).send("Error 422: 핸드폰 인증을 다시 시도해주세요")}
    
    else if (tokenTarget.isAuth) {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            personal: await securePersonal(req.body.personal),
            prefer: req.body.prefer,
            pwd: req.body.pwd,
            phone: req.body.phone,
            og: await fetchOG(req.body.prefer)
        })
        await user.save()
       
        const isValidEmail = checkValidationEmail(user.email)
        if (isValidEmail) {
            const template = getWelcomeTemplate(user)
            sendTemplateToEmail(user.email, template)
        }
        res.send(user._id)
    }
})

app.get('/users', async (req, res) => {
    const users = await User.find()
    res.send(users)
})

app.post('/tokens/phone', async (req, res) => {
    const phoneNum = req.body.phone
    const tokenNum = getToken()
    const isValidPhone = checkValidationPhone(phoneNum)
    if (isValidPhone) {
        sendTokenToSMS(phoneNum, tokenNum)
        const tokenFound = await Token.findOne({ phone: phoneNum }).exec()
        if (tokenFound !== null) {
            console.log("인증번호가 업데이트되었습니다")
            await Token.updateOne({ phone: phoneNum }, { token: tokenNum })
        }
        else {
            const token = new Token({
                phone: phoneNum,
                token: tokenNum,
                isAuth: false
            })
            await token.save()
            console.log("인증번호가 저장되었습니다")
        }
        res.send(`${phoneNum}으로 인증 문자가 전송되었습니다.`)
    }
    else {
        res.status(422).send("Error 422: 옳바른 휴대폰 번호가 아닙니다.")
    }
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
    const data = await Starbucks.find()
    res.send(data)
})

await mongoose.connect('mongodb://database:27017/miniproject')

app.listen(port, () => {
    console.log(`Listening to port ${port}...`)
})