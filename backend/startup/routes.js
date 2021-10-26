const express = require("express");
const cors = require("cors");
const productsRouter = require("../routes/products");
const userRouter = require("../routes/user");
const orderRouter = require("../routes/orders");
const configRouter = require("../routes/config");
const adminRouter = require("../routes/admin");
const imageRouter = require("../routes/image");
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
  app.use("/orders", orderRouter);
  app.use("/config", configRouter);
  app.use("/admin", adminRouter);
  app.use("/image", imageRouter);
  app.use(notFoundMiddleware);
  app.use(errorMiddleware);
};
