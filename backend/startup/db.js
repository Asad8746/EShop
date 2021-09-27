const mongoose = require("mongoose");
const config = require("config");

const connectDb = () => {
  mongoose
    .connect(config.get("mongoUri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => {
      console.log(`Connected to ${config.get("mongoUri")}`);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = connectDb;
