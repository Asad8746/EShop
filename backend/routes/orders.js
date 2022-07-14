const router = require("express").Router();
const OrderModel = require("../models/Order");
const User = require("../models/User");
const asyncMiddleware = require("../middleware/asyncMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const deleteCache = require("../middleware/deleteCache");
const validateObjectId = require("../middleware/validObjectId");
const { validateOrderBody } = require("../validation/order");
const fixedTo2 = require("../utils/fixedTo2");
const Product = require("../models/Product");

router.get(
  "/",
  authMiddleware,
  asyncMiddleware(async (req, res) => {
    const orders = await OrderModel.find({
      user: req.user,
    })
      .select(
        "_id isDelivered isPaid deliveredAt paidAt total_price createdAt paymentMethod"
      )
      .sort({ createdAt: -1 })
      .cache({ key: req.user });
    res.status(200).send(orders);
  })
);

router.get(
  "/:id",
  [validateObjectId, authMiddleware],
  asyncMiddleware(async (req, res) => {
    const order = await OrderModel.findOne({
      _id: req.params.id,
      user: req.user,
    }).populate("user", "_id name email");

    if (!order) {
      res.status(404);
      throw new Error("Order Not Found");
    }
    res.status(200).send(order);
  })
);
router.post(
  "/",
  [authMiddleware, deleteCache],
  asyncMiddleware(async (req, res) => {
    const { error } = validateOrderBody(req.body);
    if (error) {
      res.status(400);
      throw new Error(error.details[0].message);
    }
    const orderItems = req.body.items;
    const itemsTotal = orderItems.reduce(
      (prevRes, item) => item.qty * item.price + prevRes,
      0
    );
    const tax = fixedTo2(itemsTotal * 0.1);
    const shippingPrice = fixedTo2(itemsTotal >= 200 ? 0 : 100);
    const total = fixedTo2(
      Number(itemsTotal) + Number(tax) + Number(shippingPrice)
    );
    orderItems.forEach(async (product) => {
      const increment = product.qty * -1;
      await Product.findByIdAndUpdate(
        product.id,
        { $inc: { stockCount: increment } },
        { useFindAndModify: false }
      );
    });
    const order = new OrderModel({
      user: req.user,
      orderItems: req.body.items,
      shippingAddress: req.body.address,
      paymentMethod: req.body.paymentMethod,
      tax_price: tax,
      delivery_price: shippingPrice,
      total_price: total,
    });
    await order.save();
    res.status(201).send(order);
  })
);

router.patch(
  "/:id/pay",
  [validateObjectId, authMiddleware],
  asyncMiddleware(async (req, res) => {
    const _id = req.params.id;
    const user = await User.findById(req.user).select("_id isAdmin");
    let order = await OrderModel.findById(_id);
    if (!order) {
      res.status(404);
      throw new Error(`Order with id ${_id} not found`);
    }
    if (order.paymentMethod === "paypal") {
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
    } else if (order.paymentMethod !== "paypal" && !user.isAdmin) {
      res.status(400);
      throw new Error("Not a Authorized User to Perform this Request");
    }
    order.isPaid = true;
    order.paidAt = Date.now();
    order = await order.save();
    res.status(200).send(order);
  })
);

module.exports = router;
