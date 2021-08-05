const mongoose = require("mongoose");
const config = require("config");

const connectDb = async () => {
  mongoose
    .connect(config.get("mongoUri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => {
      console.log(`Connected to Db`);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = connectDb;
