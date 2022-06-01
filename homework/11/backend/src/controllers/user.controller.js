import { User } from '../models/user.js'
import { Token } from '../models/token.js'
import { UtilService } from './services/utils.js'
import { EmailService } from './services/email.js'
import { CrawlerService } from './services/crawler.js'

export class UserController {

    async createUserData (req, res) {
        const utilService = new UtilService()
        const crawlerService = new CrawlerService()
        const emailService = new EmailService()
        const tokenTarget = await Token.findOne({ phone: req.body.phone }).exec()
        if (tokenTarget===null || !tokenTarget.isAuth) {
            res.status(422).send("Error 422: 핸드폰 인증을 다시 시도해주세요")}
        
        else if (tokenTarget.isAuth) {
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                personal: await utilService.securePersonal(req.body.personal),
                prefer: req.body.prefer,
                pwd: req.body.pwd,
                phone: req.body.phone,
                og: await crawlerService.fetchOG(req.body.prefer)
            })
            await user.save()
           
            const isValidEmail = emailService.checkValidationEmail(user.email)
            if (isValidEmail) {
                const template = emailService.getWelcomeTemplate(user)
                emailService.sendTemplateToEmail(user.email, template)
            }
            res.send(user._id)
        }
    }

    async showUsers (req, res) {
        const users = await User.find()
        res.send(users)
    }
}