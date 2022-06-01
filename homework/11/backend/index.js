import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import { options } from './swagger/config.options.js'

import { UserController } from './src/controllers/user.controller.js'
import { TokenController } from './src/controllers/token.controller.js'
import { StarbucksController } from './src/controllers/starbucks.controller.js'

const app = express()
const port = 8080

app.use(express.json())
app.use(cors())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)))

const userController = new UserController()
app.post('/user', userController.createUserData)
app.get('/users', userController.showUsers)

const tokenController = new TokenController()
app.post('/tokens/phone', tokenController.createTokenData)
app.patch('/tokens/phone', tokenController.updateTokenData)

const starbucksController = new StarbucksController()
app.get('/starbucks', starbucksController.showStarbucks)

await mongoose.connect('mongodb://database:27017/miniproject')

app.listen(port, () => {console.log(`Listening to port ${port}...`)})