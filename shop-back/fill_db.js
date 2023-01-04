import mongoose from "mongoose";

import mockData from "./mock_data.json" assert { type: "json" };
import dbo from "./db_conf.json" assert { type: "json" };
import Goods from "./models/good.js";

mongoose.set('strictQuery', true);
await mongoose.connect(
    `mongodb://127.0.0.1:${dbo.port}/${dbo.collectionName}`,
    { useNewUrlParser: true, useUnifiedTopology: true }
);
await Goods.deleteMany({});
await Goods.insertMany(mockData.goods)
    .catch( (err) => {
        console.error(err);
        throw err;
    })
    .then(async () => {
        await mongoose.disconnect();
    });
