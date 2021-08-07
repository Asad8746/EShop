const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");
const user_schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 255,
    },
    email: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 255,
      unique: true,
    },
    password: {
      type: String,
      minlength: 1,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

user_schema.methods.genToken = function () {
  return jwt.sign({ id: this._id }, config.get("secretKey"), {
    expiresIn: "7d",
  });
};

module.exports = mongoose.model("User", user_schema);
