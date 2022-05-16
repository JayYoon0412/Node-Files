import coolsms from 'coolsms-node-sdk';
import 'dotenv/config';

export function checkValidationPhone(myphone){
    if(myphone.length !== 10 && myphone.length !== 11){
        console.log("Error: invalid phone number")
        return false
    } else {
        return true
    }
}

export function getToken(){
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

//nhn cloud, aws, coolsms
//API Key (coolsms): NCSKHDKBXQWOQFIP, API Secret Key: QPNOZFGVDVSE25IS3JTZR9RMAERZ6NIP
//중요한 키 값은 따로 env file로 저장: 모든 파일의 contents 는 String (saved as object, key and value)
export async function sendTokenToSMS(phoneNo, token){
    const mysms = coolsms.default;
    const api_key = process.env.SMS_API_KEY;
    const api_secretKey = process.env.SMS_API_X_KEY;
    const senderPhoneNo = process.env.SENDER_NUMBER;
    const messageService = new mysms(api_key, api_secretKey);
    const result = await messageService.sendOne({
        to: phoneNo,
        from: senderPhoneNo,
        text: `[코드캠프] 인증번호 ${token}를 입력해주세요`
    });
    console.log(result);
}