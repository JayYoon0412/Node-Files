function getWelcomeTemplate(user) {
    const result = `
        <html>
            <body>
                <h1>${user.id}님 가입을 축하합니다!</h1>
                <hr/>
                <div>이름: ${user.id}</div>
                <div>나이: ${user.age}세</div>
                <div>학교: ${user.school}</div>
                <div>가입일: ${user.createdAt}</div>
            </body>
        </html>
    `;
    console.log(result);
}

const user = {
    id: "홍길동",
    age: 12,
    school: "다람쥐초등학교",
    createdAt: "2022-05-10"
};

getWelcomeTemplate(user);