const express = require("express");
const connectDb = require("./startup/db");
const routes = require("./startup/routes");
const App = express();

const PORT = process.env.PORT || 5000;
App.listen(PORT, () => {
  console.log(`Connected on Port ${PORT} `);
});

connectDb();
routes(App);
