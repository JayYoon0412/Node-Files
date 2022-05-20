import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const BoardSchema = new Schema({
    writer: String,
    title: String,
    contents: String
})

//Board collection의 구조가 Board Schema
export const Board = mongoose.model("Board", BoardSchema);
