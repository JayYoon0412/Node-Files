import { getCreatedAt } from "./utils.js"
import nodemailer from 'nodemailer'

export function checkValidationEmail(email){
    if(email === undefined || !email.includes("@")){
        console.log("Wrong email format. Please try again.")
        return false
    } else {
        return true
    }
}

export function getWelcomeTemplate({name, age, school}){
    return `
        <html>
            <body>
                <h1>${name}님 가입을 환영합니다</h1>
                <hr />
                <div>이름: ${name}</div>
                <div>나이: ${age}살</div>
                <div>학교: ${school}</div>
                <div>가입일: ${getCreatedAt()}</div>
            </body>
        </html>
    `
}

export async function sendTemplateToEmail(email, mytemplate){
    const TRANSPORTER_USER_EMAIL = process.env.TRANSPORTER_USER_EMAIL;
    const TRANSPORTER_USER_PASS = process.env.TRANSPORTER_USER_PASS;
    const SENDER_EMAIL = process.env.SENDER_EMAIL;
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: TRANSPORTER_USER_EMAIL,
            pass: TRANSPORTER_USER_PASS
        }
    });
    let info = await transporter.sendMail({
        from: SENDER_EMAIL,
        to: email,
        subject: "[CodeAcademia] Thank you for Joining CodeAcademia!",
        html: mytemplate
    });
}