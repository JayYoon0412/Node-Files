export function checkRegNumFormatError(index) {
    if (index===-1) {
        console.log("Error: invalid registration number format");
        return true;
    }
    return false;
}

export function checkRegNumLengthError(str, index) {
    if (str.substring(0, index).length !== 6 || str.substring(index+1).length !== 7) {
        console.log("Error: invalid registration number length")
        return true;
    }
    return false;
}