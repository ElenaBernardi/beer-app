const MONGO_HOST = process.env.MONGO_HOST || "localhost";
const mongoUrl = "mongodb://" + MONGO_HOST + ":27017/beers-db";
module.exports = {
    url: mongoUrl
}
