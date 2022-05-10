//param: phone number: check 10-11 digits, create token, send token
function createPhoneToken(str) {
    const n = 6;
    if(str.length!==10 && str.length!==11) {
        console.log("Error: invalid phone number")
    }
    const result = getToken(6);
    console.log("6-digit code was sent to your device. Please enter below.")
    return result;
}

function getToken(n) {
    if (n === undefined || n<0 || n>10) {
        console.log("Error: invalid token length");
        return;
    }
    const result = String(Math.floor(Math.random()*Math.pow(10, n))).padStart(n,"0");
    return result;
}

createPhoneToken("01012345678");