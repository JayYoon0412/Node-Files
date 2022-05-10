import {checkValidationPhone, getToken, sendTokenToSMS} from './phone.js'

function createTokenOfPhone(myphone){
// 1. check if phone number valid
    const isValid = checkValidationPhone(myphone)

    if(isValid) {
// 2. generate six-digit token
        const mytoken = getToken()

// 3. send generated token to phone
        sendTokenToSMS(myphone, mytoken)
    }
}

createTokenOfPhone("01012345678")