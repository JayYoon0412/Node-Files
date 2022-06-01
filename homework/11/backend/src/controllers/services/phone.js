import coolsms from 'coolsms-node-sdk';
import 'dotenv/config';

export class PhoneService {
    checkValidationPhone(myphone){
        if(myphone.length !== 10 && myphone.length !== 11){
            console.log("Error: invalid phone number")
            return false
        } else {
            return true
        }
    }
    
    getToken() {
        const mycount = 6
        if(mycount === undefined){
            console.log("Error: invalid token length")
            return
        } else if(mycount <= 0){
            console.log("Error: token length should be greater than zero")
            return
        } else if(mycount > 10) {
            console.log("Error: token length is too long")
            return
        }
        const result = String(Math.floor(Math.random() * 10**mycount)).padStart(mycount, "0")
        return result
    }
    

    async sendTokenToSMS(phoneNo, token){
        const mysms = coolsms.default
        const SMS_KEY = process.env.SMS_KEY
        const SMS_SECRET = process.env.SMS_SECRET
        const SMS_SENDER = process.env.SMS_SENDER
        const messageService = new mysms(SMS_KEY, SMS_SECRET)
        const result = await messageService.sendOne({
            to: phoneNo,
            from: SMS_SENDER,
            text: `[코드캠프] 인증번호 ${token}를 입력해주세요`
        });
        console.log(result)
    }
}

