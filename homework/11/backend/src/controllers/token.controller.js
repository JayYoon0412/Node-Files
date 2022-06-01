import { Token } from '../models/token.js'
import { PhoneService } from './services/phone.js'

export class TokenController {
    async createTokenData (req, res) {
        const phoneService = new PhoneService()
        const phoneNum = req.body.phone
        const tokenNum = phoneService.getToken()
        const isValidPhone = phoneService.checkValidationPhone(phoneNum)
        if (isValidPhone) {
            phoneService.sendTokenToSMS(phoneNum, tokenNum)
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
    }

    async updateTokenData (req, res) {
        const dataTarget = await Token.findOne({ phone: req.body.phone }).exec()
        if (dataTarget===null || dataTarget.token != req.body.token) res.send(false)
        else if (dataTarget.token === req.body.token) {
            await Token.updateOne({ phone: req.body.phone }, { isAuth: true })
            res.send(true)
        }
    }
}