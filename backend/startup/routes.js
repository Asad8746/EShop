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
  app.use("/api/products", productsRouter);
  app.use("/api/user", userRouter);
  app.use("/api/orders", orderRouter);
  app.use("/api/config", configRouter);
  app.use("/api/admin", adminRouter);
  app.use("/api/image", imageRouter);
  app.use(notFoundMiddleware);
  app.use(errorMiddleware);
};
