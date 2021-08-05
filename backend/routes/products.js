const mongoose = require("mongoose");
const express = require("express");
const Product = require("../models/Product");
const asyncMiddleware = require("../middleware/asyncMiddleware");
const Router = express.Router();

Router.get(
  "/",
  asyncMiddleware(async (req, res) => {
    const products = await Product.find();
    res.send(products);
  })
);

Router.get(
  "/:id",
  asyncMiddleware(async (req, res) => {
    const id = req.params.id;
    if (mongoose.isValidObjectId(id)) {
      const product = await Product.findById(id);
      if (product) {
        res.send(product);
      } else {
        res.status(404);
        throw new Error(`Product with ${id} not found`);
      }
    } else {
      res.status(400);
      throw new Error("Invalid id");
    }
  })
);

module.exports = Router;
