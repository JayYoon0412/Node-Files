import { checkRegNumFormatError, checkRegNumLengthError } from './resident-registration-files.js'

function customRegistrationNumber(str) {
    let index = str.indexOf("-");
    if(checkRegNumFormatError(index)) return;
    if (checkRegNumLengthError(str, index)) return;
    return str.substring(0, index+2)+"******";
}

console.log(customRegistrationNumber("210510-1010101"));
console.log(customRegistrationNumber("210510-1010101010101"));
console.log(customRegistrationNumber("2105101010101"));

