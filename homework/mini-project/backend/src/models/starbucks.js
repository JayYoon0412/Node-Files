import mongoose from 'mongoose'
const Schema = mongoose.Schema

const StarbucksSchema = new Schema({
    name: String,
    img: String
})

export const Starbucks = mongoose.model("Starbucks", StarbucksSchema)