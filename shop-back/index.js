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

var corsOptions = {
    origin: 'http://localhost:8080'
}

mongoose.connect(
    `mongodb://127.0.0.1:${dbo.port}/${dbo.collectionName}`,
    { useNewUrlParser: true, useUnifiedTopology: true }
);
app.listen(conf.port, () => {
    console.log(`Server running on http://localhost:${conf.port} 🏃‍♂️`)
});

// Endpoints

app.get('/goods', cors(corsOptions), async (request, response) => {

    console.log("Showing all goods...")

    response.status(200).send(
        await Good.find()
    );
});

app.get('/goods/:goodId', cors(corsOptions), async (request, response) => {
    const goodId = request.params.goodId;

    console.log(`Looking for a good of id: ${goodId}...`)

    response.status(200).send(
        await Good.find({_id: ObjectId(goodId)})
    );
});

app.post('/goods/buy', cors(corsOptions), (request, response) => {
    const details = request.body;
    console.log(details)
    details.forEach( (detail) => {
        const goodId = detail._id;
        // Check if you can even buy that many
        Good.findOne({_id: ObjectId(goodId)}, (err, result) => {
                if (result) {
                    let stock = result.stock;
                    console.log(stock, detail.quantity)

                    if (stock < detail.quantity || stock <= 0) {
                        return response.status(400).send(`Insufficient stock (${stock}) of the requested 'good' with id: ${goodId} in storage. Requested: ${detail.quantity}`);
                    } else {

                        // Update the stock upon a successful purchase
                        Good.findByIdAndUpdate(
                            goodId,
                            {
                                "stock": result.stock - detail.quantity
                            },
                            (err, result) => {
                                if (err) {
                                    return response.status(400).send(`No db entry in 'goods' for id: ${goodId}. Error: ${err}`);
                                }
                            }
                        );
                    }

                } else {
                    return response.status(400).send(`No db entry in 'goods' for id: ${goodId}. Error: ${err} lol`);
                }
            });
        });
    return response.status(200).send(`Successfully purchased goods: ${details}`);
});

app.post('/goods/add', cors(corsOptions), async (request, response) => {

    console.log(`Looking for a good of id: ${goodId}...`)

    response.status(200).send(
        await Good.find({_id: ObjectId(goodId)})
    );
});
