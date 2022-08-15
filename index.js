const express = require("express");
const path = require("path");
const app = express();
require("./backend/services/cache");
require("./backend/startup/db")();
require("./backend/startup/routes")(app);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Connected on Port ${PORT} `);
});
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.use("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}
module.exports = server;
