import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import cors from 'cors';
import { userList } from './users.list.js';
import { coffeeList } from './coffee.list.js';
import { options } from './swagger/config.options.js';
import { checkValidationPhone, getToken, sendTokenToSMS } from './phone.js';
import { checkValidationEmail, getWelcomeTemplate, sendTemplateToEmail } from './email.js'

const app = express();
app.use(express.json());
const port = 3000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));
app.use(cors());

app.get('/users', (req, res) => {
    const result = userList;
    res.send(result);
})

app.get('/starbucks', (req, res) => {
    const result = coffeeList;
    res.send(result);
})

app.post('/tokens/phone', (req, res) => {
    const isValid = checkValidationPhone(req.body.phone);
    console.log(req.body.phone)
    if(isValid) {
        const mytoken = getToken();
        sendTokenToSMS(req.body.phone, mytoken);
        res.send(`successfully sent ${mytoken}`);
    }
})

app.post('/users', (req, res) => {
    const user = req.body.user;
    const isValid = checkValidationEmail(user.email);
    if (isValid) {
      const template = getWelcomeTemplate(user);
      sendTemplateToEmail(user.email, template);
      res.send("가입완료!")
    }
})
  

  
app.listen(port, () => {
    console.log(`Listening to port ${port}...`);
})