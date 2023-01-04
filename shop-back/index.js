import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import { ObjectId } from "mongodb";

import dbo from "./db_conf.json" assert { type: "json" };
import conf from "./conf.json" assert { type: "json" };
import Good from "./models/good.js";

// Config
const app = express();
app.use(express.static('dist'));
app.use(express.json());
app.use(cors());

mongoose.connect(
    `mongodb://127.0.0.1:${dbo.port}/${dbo.collectionName}`,
    { useNewUrlParser: true, useUnifiedTopology: true }
);
app.listen(conf.port, () => {
    console.log(`Server running on http://localhost:${conf.port} 🏃‍♂️`)
});

// Endpoints

app.get('/goods', async (request, response) => {

    console.log("Showing all goods...")

    response.status(200).send(
        await Good.find()
    );
});

app.get('/goods/:goodId', async (request, response) => {
    const goodId = request.params.goodId;

    console.log(`Looking for a good of id: ${goodId}...`)

    response.status(200).send(
        await Good.find({_id: ObjectId(goodId)})
    );
});

app.post('/goods/buy', (request, response) => {
    const details = request.body;
    const goodId = details._id;

    // Check if you can even buy that many
    let quantity = 0;
    Good.findOne({_id: ObjectId(goodId)}, (err, result) => {
        if (result) {

            if (result.quantity < details.quantity && quantity <= 0) {
                return response.status(400).send(`Insufficient quantity (${quantity}) of the requested 'good' with id: ${goodId} in storage. Requested: ${details.quantity}`);
            }

            // Update the quantity upon a successful purchase
            Good.findByIdAndUpdate(
                goodId,
                {
                    $inc: {"quantity": - details.quantity}
                },
                (err, result) => {
                    if (err) {
                        return response.status(400).send(`No db entry in 'goods' for id: ${goodId}`);
                    }
                    return response.status(200).send(`Successfully purchased a total of: ${details.quantity} goods of ID: ${goodId}.`);
                }
            );

        } else {
            return response.status(400).send(`No db entry in 'goods' for id: ${goodId}`);
        }
    });
});

app.post('/goods/add', async (request, response) => {

    console.log(`Looking for a good of id: ${goodId}...`)

    response.status(200).send(
        await Good.find({_id: ObjectId(goodId)})
    );
});