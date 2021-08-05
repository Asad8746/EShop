const mongoose = require("mongoose");
const review_schema = require("./review");

const product_schema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  description: {
    type: String,
    minlength: 1,
    maxlength: 255,
    required: true,
  },
  brand: {
    type: String,
    minlength: 1,
    maxlength: 255,
    required: true,
  },
  category: {
    type: String,
    minlength: 1,
    maxlength: 255,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    default: 1,
  },
  // image: {
  //   data: {
  //     type: Buffer,
  //     required: true,
  //   },
  //   contentType: {
  //     type: String,
  //     required: true,
  //   },
  // },
  image: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  reviews: [review_schema],
  stockCount: {
    type: Number,
    required: 0,
    default: 0,
  },
  numReviews: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model("Product", product_schema);
