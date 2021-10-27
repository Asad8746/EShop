const router = require("express").Router();
const OrderModel = require("../models/Order");
const asyncMiddleware = require("../middleware/asyncMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const deleteCache = require("../middleware/deleteCache");
const validateObjectId = require("../middleware/validObjectId");
const { validateOrderBody } = require("../validation/order");
const fixedTo2 = require("../utils/fixedTo2");

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
      .sort({ paidAt: -1 })
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
      return;
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
    const itemsTotal = req.body.items.reduce(
      (prevRes, item) => item.qty * item.price + prevRes,
      0
    );
    const tax = fixedTo2(itemsTotal * 0.1);
    const shippingPrice = fixedTo2(itemsTotal >= 200 ? 0 : 100);
    const total = fixedTo2(
      Number(itemsTotal) + Number(tax) + Number(shippingPrice)
    );
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
    const user = req.user;
    let order = await OrderModel.findOne({
      _id,
      user,
    });
    order.isPaid = true;
    order.paidAt = Date.now();
    if (order.paymentMethod === "paypal") {
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
    }
    order = await order.save();
    res.status(200).send(order);
  })
);

module.exports = router;
