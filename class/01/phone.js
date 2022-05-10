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
    // console.log(result)
}

export function sendTokenToSMS(fff, ggg){
    console.log(ggg + " sent to " + fff)
}