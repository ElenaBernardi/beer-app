import bodyParser from "koa-bodyparser";
import cors from "koa2-cors";
import logger from "koa-logger";
import Koa from "koa";
import beersRoutes from "./web/routes/BeersRoutes";
import mongoose from "mongoose";
import {rejects} from "assert";

const app = new Koa();

const PORT = process.env.PORT || 3000;

app.use(bodyParser());
app.use(
    cors({
        origin: "*"
    })
);
app.use(logger());

// ROUTES
app.use(beersRoutes.routes());
// DB
const db = require('./config/MongoConfig');
mongoose.connect(db.url).then(() => {
    console.log('CONNECTED');
}, rejects => {
    console.log('ERROR CONNECTED MONGO', rejects);
} ); //Mongoose connection created

const server = app
    .listen(PORT, async () => {
        console.log(`Server listening on port: ${PORT}`);
    })
    .on("error", err => {
        console.error(err);
    });

export default server;
