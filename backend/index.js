const express = require("express");
const App = express();
require("./services/cache");
require("./startup/db")();
require("./startup/routes")(App);

const PORT = process.env.PORT || 5000;
const server = App.listen(PORT, () => {
  console.log(`Connected on Port ${PORT} `);
});

module.exports = server;
