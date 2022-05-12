function getWelcomeTemplate({id, age, school, createdAt}) {
    const result = `
        <html>
            <body>
                <h1>${id}님 가입을 축하합니다!</h1>
                <hr/>
                <div>이름: ${id}</div>
                <div>나이: ${age}세</div>
                <div>학교: ${school}</div>
                <div>가입일: ${createdAt}</div>
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