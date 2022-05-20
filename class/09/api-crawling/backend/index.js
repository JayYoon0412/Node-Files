import { checkValidationPhone, getToken, sendTokenToSMS } from './phone.js';
import { checkValidationEmail, getWelcomeTemplate, sendTemplateToEmail } from './email.js';
import { options } from './swagger/config.options.js';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import cors from 'cors';
import mongoose from 'mongoose';
import { Board } from './models/board.js';
import { Stock } from './models/stock.js';


const app = express();
app.use(express.json());
app.use(cors({
  origin: "127.0.0.1:5500"
}));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));

app.get('/boards', async (req, res) => {
  //1. reading data (accessing database)
  const result = await Board.find();
  //2. sending data as response
  res.send(result);
})

app.post('/boards', async (req, res) => {
  console.log(req.body);
  //1. create new board based on req body and save in collection
  const board = new Board({
    writer: req.body.writer,
    title: req.body.title,
    contents: req.body.contents
  })
  await board.save(); //simple syntax due to mongooose ODM (eventually converted)
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

app.get('/stocks', async (req, res) => {
  const stocks = await Stock.find()
  res.send(stocks)

})

//Connecting MongoDB to Server
await mongoose.connect('mongodb://database:27017/dockerfinance');

//Opening Backend API Server
app.listen(8080, () => {
  console.log(`Example app listening on port 8080`)
})