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
        id: {
          type: mongoose.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        name: {
          type: String,
          required: true,
        },
        qty: {
          type: Number,
          required: true,
          default: 1,
        },
        image: {
          type: String,
          required: true,
        },
        stockCount: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    shippingAddress: {
      type: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
      },
      required: true,
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
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", order_schema);
