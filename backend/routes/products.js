const mongoose = require("mongoose");
const express = require("express");
const Product = require("../models/Product");
const asyncMiddleware = require("../middleware/asyncMiddleware");
const validObjectId = require("../middleware/validObjectId");
const auth = require("../middleware/authMiddleware");
const { validateRateBody } = require("../validation/products");
const Router = express.Router();

Router.get(
  "/",
  asyncMiddleware(async (req, res) => {
    const query = req.query;
    const pageSize = Number(query.pageSize) || 10;
    const page = Number(query.page) || 1;
    const regExQuery = query.q
      ? {
          name: {
            $regex: query.q,
            $options: "i",
          },
        }
      : {};
    const products = await Product.find(regExQuery)
      .limit(pageSize)
      .skip(pageSize * (Number(page) - 1));
    const totalProducts = await Product.find(regExQuery).countDocuments();

    res.send({
      products,
      page,
      totalPages: Math.ceil(totalProducts / pageSize),
    });
  })
);

Router.get(
  "/:id",
  validObjectId,
  asyncMiddleware(async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      res.status(404);
      throw new Error(`Product with ${id} not found`);
    }
    res.status(200).send(product);
  })
);
Router.get(
  "/:id/reviews",
  validObjectId,
  asyncMiddleware(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id)
      .select("reviews")
      .populate("reviews.user", "_id name");
    if (!product) {
      res.status(404);
      throw new Error(`Product with ${id} not Found`);
    }
    const { reviews } = product;
    res.status(200).send({ reviews });
  })
);
Router.post(
  "/:id/rate",
  [validObjectId, auth],
  asyncMiddleware(async (req, res) => {
    const id = req.params.id;
    const { error } = validateRateBody(req.body);
    if (error) {
      res.status(400);
      throw new Error(error.details[0].message);
    }
    const product = await Product.findByIdAndUpdate(id);
    if (!product) {
      res.status(404);
      throw new Error(`Oops Product with id ${id} not Found`);
    }
    const isReviewed = product.reviews.find((item) => {
      return item.user.toString() === req.user;
    });
    if (isReviewed) {
      res.status(400);
      throw new Error("Sorry You already rated this product");
    }
    const { rating, comment } = req.body;
    const review = {
      _id: mongoose.Types.ObjectId(),
      user: req.user,
      rating: Number(rating),
      comment,
    };
    product.reviews.push(review);
    const total = product.reviews.reduce((prev, item) => prev + item.rating, 0);
    product.numReviews += 1;

    product.rating = total / product.reviews.length;
    await product.save();
    res.status(200).send(review);
  })
);
module.exports = Router;
