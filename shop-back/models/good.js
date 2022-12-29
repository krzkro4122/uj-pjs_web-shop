import mongoose from "mongoose";

const { Schema, model } = mongoose;
const goodSchema = new Schema({
    name: {
            type: String,
            unique: true,
            dropDups: true
    },
    cost: Number,
    group: String,
    quantity: Number,
    thumbnail: String
});
const Good = model("Good", goodSchema);

export default Good;