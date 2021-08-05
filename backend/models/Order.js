const mongoose = require("mongoose");

const order_schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderItems: [
      {
        name: {
          type: String,
          required: true,
        },
        qty: {
          type: Number,
          required: true,
          default: 1,
        },
        product: {
          type: mongoose.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    shippingAddress: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Address",
    },
    paymentMethod: {
      type: String,
      enum: ["paypal", "cod"],
      required: true,
      default: "paypal",
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email: { type: String },
    },
    tax_price: {
      type: Number,
      required: true,
      default: 0,
    },
    delivery_price: {
      type: Number,
      required: true,
      default: 0,
    },
    total_price: {
      type: Number,
      required: true,
      default: 0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model("Order", order_schema);
