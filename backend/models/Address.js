const mongoose = require("mongoose");

const address_schema = new mongoose.Schema({
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
  Country: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255,
  },
});

module.exports = mongoose.model("Address", address_schema);
