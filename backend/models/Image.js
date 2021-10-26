const mongoose = require("mongoose");

const image_schema = new mongoose.Schema(
  {
    belongsTo: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    data: {
      type: Buffer,
      required: true,
    },
    contentType: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Image", image_schema);
