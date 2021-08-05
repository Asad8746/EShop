const mongoose = require("mongoose");

const address_schema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
  address: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255,
  },
  city: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255,
  },
  postalCode: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 15,
  },
});

module.exports = mongoose.model("Address", address_schema);
