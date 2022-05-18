import { checkValidationPhone, getToken, sendTokenToSMS } from './phone.js';
import { checkValidationEmail, getWelcomeTemplate, sendTemplateToEmail } from './email.js'
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import cors from'cors';
import { options } from './swagger/config.options.js'

const app = express();
app.use(express.json());
app.use(cors({
  origin: "127.0.0.1:5500"
}));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));
app.get('/boards', (req, res) => {
  //1. reading data (accessing database)
  const result = [
    { number: 1, writer: "Bob", title: "post one", contents: "content one" },
    { number: 2, writer: "Sally", title: "post two", contents: "content two" },
    { number: 3, writer: "Tom", title: "post three", contents: "content three" }
  ]
  //2. sending data as response
  res.send(result);
})

app.post('/boards', (req, res) => {
  console.log(req.body);
  //1. access database and add relevant data

  //2. sending response (success message, etc.)
  res.send("successfully created post!");
})

//need to import, change scope
app.post('/tokens/phone', (req, res) => {
  const isValid = checkValidationPhone(req.body.phone);
  if(isValid) {
      const mytoken = getToken();
      sendTokenToSMS(req.body.phone, mytoken);
      res.send(`successfully sent ${mytoken}`);
  }
})

//메일침프, 노드메일러, NHNCloud, etc...
app.post('/users', (req, res) => {
  const user = req.body.user;
  const isValid = checkValidationEmail(user.email);
  if (isValid) {
    const template = getWelcomeTemplate(user);
    sendTemplateToEmail(user.email, template);
    res.send("가입완료!")
  }
})

app.listen(8080, () => {
  console.log(`Example app listening on port 8080`)
})