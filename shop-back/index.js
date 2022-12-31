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

app.get('/goods', async (req, res) => {

    console.log("Showing all goods...")

    res.status(200).send(
        await Good.find()
    );
});

app.get('/goods/:goodId', async (req, res) => {
    const goodId = req.params.goodId;

    console.log(`Looking for a good of id: ${goodId}...`)

    res.status(200).send(
        await Good.find({_id: ObjectId(goodId)})
    );
});