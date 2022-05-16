import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import cors from 'cors';
import { userList } from './users.list.js';
import { coffeeList } from './coffee.list.js';
import { options } from './swagger/config.options.js';

const app = express();
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

app.listen(port, () => {
    console.log(`Listening to port ${port}...`);
})