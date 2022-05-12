function createTemplate({ id, email, regNum, phone, site }) {
    return `
    <html>
        <body>
            <h1>${id}님 가입을 축하합니다!</h1>
            <hr/>
            <div>이메일: ${email}</div>
            <div>주민번호: ${regNum}세</div>
            <div>휴대폰 번호: ${phone}</div>
            <div>내가 좋아하는 사이트: ${site}</div>
        </body>
    </html>
`;
}

const id = "코드캠프";
const email = "support@codebootcamp.co.kr";
const regNum = "210510-1******";
const phone = "000-0000-0000";
const site = "codebootcamp.co.kr";

console.log(createTemplate({ id, email, regNum, phone, site }));