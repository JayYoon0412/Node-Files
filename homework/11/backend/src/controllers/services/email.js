import { UtilService } from "./utils.js"
import nodemailer from 'nodemailer'

export class EmailService {
    
    checkValidationEmail(email){
        if(email === undefined || !email.includes("@")){
            console.log("옳지 못한 이메일 형식입니다. 다시 입력해주세요.")
            return false
        } else {
            return true
        }
    }
    
    getWelcomeTemplate({name}){
        const utilService = new UtilService()
        return `
            <html>
                <body>
                    <h1>${name}님 가입을 환영합니다!</h1>
                    <hr />
                    <div>이름: ${name}</div>
                    <div>가입일: ${utilService.getCreatedAt()}</div>
                </body>
            </html>
        `
    }
    
    async sendTemplateToEmail(email, mytemplate){
        const EMAIL_USER = process.env.EMAIL_USER
        const EMAIL_PASS = process.env.EMAIL_PASS
        const EMAIL_SENDER = process.env.EMAIL_SENDER
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: EMAIL_USER,
                pass: EMAIL_PASS
            }
        });
        let info = await transporter.sendMail({
            from: EMAIL_SENDER,
            to: email,
            subject: "[CodeAcademia] Thank you for Joining CodeAcademia",
            html: mytemplate
        });
    }
}

