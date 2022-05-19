import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const TokenSchema = new Schema ({
    phone: String,
    token: String,
    isAuth: Boolean
})

export const Token = mongoose.model("Token", TokenSchema)