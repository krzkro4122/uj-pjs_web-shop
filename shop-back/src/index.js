import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import path from "path";

import dbo from "../db_conf.json" assert { type: "json" };
import conf from "../conf.json" assert { type: "json" };
import Good from "../models/good.js";

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(
    `mongodb://127.0.0.1:${dbo.port}/${dbo.collectionName}`,
    { useNewUrlParser: true, useUnifiedTopology: true }
);
app.listen(conf.port, () => {
    console.log(`Server running on http://localhost:${conf.port} 🏃‍♂️`)
});

app.get('/goods', async (req, res) => {
    res.status(200).send(await Good.find({}));
});

app.post('/', (req, res) => {
    
});

app.post('/goods/:goodId', (req, res) => {
    console.log(req.body)
    const id = req.params;
    res.status(201).send(id)
});