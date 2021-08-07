const express = require("express");
const cors = require("cors");
const config = require("config");
const productsRouter = require("../routes/products");
const userRouter = require("../routes/user");
const errorMiddleware = require("../middleware/errorMiddleware");
const notFoundMiddleware = require("../middleware/notFoundMiddleware");

module.exports = function (app) {
  app.use(
    cors({
      // origin: config.get("clientUrl"),
      origin: "*",
      exposedHeaders: ["authorization"],
    })
  );
  app.use(express.json());
  app.use("/products", productsRouter);
  app.use("/user", userRouter);
  app.use(notFoundMiddleware);
  app.use(errorMiddleware);
};
