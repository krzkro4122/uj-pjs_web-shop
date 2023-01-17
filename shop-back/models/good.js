import mongoose from "mongoose";

const { Schema, model } = mongoose;
const goodSchema = new Schema({
    name: {
            type: String,
            unique: true,
            dropDups: true
    },
    price: Number,
    group: String,
    stock: Number,
    thumbnail: String,
    quantity: Number,
});
const Good = model("Good", goodSchema);

export default Good;