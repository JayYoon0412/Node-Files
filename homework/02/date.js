function createString() {
    const date = new Date();
    return `오늘은 ${displayDate(date)} ${displayTime(date)} 입니다.`;
}

function displayDate(date) {
    const year = String(date.getFullYear()).padStart(2, '0');
    const month = String(date.getMonth()+1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${year}년 ${month}월 ${dd}일`;
}

function displayTime(date) {
    const hours = String(date.getHours()).padStart(2, '0');
    const mins = String(date.getMinutes()).padStart(2, '0');
    const sec = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${mins}:${sec}`;
}

console.log(createString());