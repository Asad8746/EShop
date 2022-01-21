const router = require("express").Router();
const fileupload = require("express-fileupload");
const User = require("../models/User");
const Product = require("../models/Product");
const Image = require("../models/Image");
const Order = require("../models/Order");
const auth = require("../middleware/authMiddleware");
const asyncMiddleware = require("../middleware/asyncMiddleware");
const validObjectId = require("../middleware/validObjectId");
const deleteCache = require("../middleware/deleteCache");
const imageCheck = require("../middleware/imageCheck");
const admin = require("../middleware/adminMiddleware");
const limitHandler = require("../middleware/limitHandler");
const {
  validateAssignAdminRole,
  validateProduct,
  markOrder,
} = require("../validation/admin");
router.get(
  "/users",
  [auth, admin],
  asyncMiddleware(async (req, res) => {
    const users = await User.find().select("-password");
    res.status(200).send(users);
  })
);
router.patch(
  "/users/:id",
  [validObjectId, auth, admin],
  asyncMiddleware(async (req, res) => {
    const { error } = validateAssignAdminRole(req.body);
    if (error) {
      res.status(400);
      throw new Error(error.details[0].message);
    }
    const isAdmin = req.body.isAdmin;
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      res.status(404);
      throw new Error(`User Not found`);
    }
    user.isAdmin = isAdmin;
    await user.save();
    res.status(200).send(user);
    return;
  })
);

router.delete(
  "/users/:id",
  [validObjectId, auth, admin],
  asyncMiddleware(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      res.status(404);
      throw new Error("User not Found");
    }
    await user.delete();
    res.status(200).send(user);
  })
);

router.get(
  "/products",
  [auth, admin],
  asyncMiddleware(async (req, res) => {
    const products = await Product.find()
      .select("-reviews -rating -numReviews -description")
      .populate("user", "_id email");

    res.status(200).send(products);
  })
);
router.post(
  "/products",
  [
    auth,
    admin,
    fileupload({
      abortOnLimit: true,
      limits: { fileSize: 1024 * 1024 },
      limitHandler,
    }),
    imageCheck,
  ],
  asyncMiddleware(async (req, res) => {
    const { error } = validateProduct(req.body);
    if (error) {
      res.status(400);
      throw new Error(error.details[0].message);
    }
    const product = new Product({
      user: req.user,
      ...req.body,
    });
    const uploadedImage = new Image({
      belongsTo: product._id,
      data: req.image.data,
      contentType: req.image.mimetype,
    });
    product.image = uploadedImage._id;
    await uploadedImage.save();
    await product.save();
    res.status(201).send(product);
  })
);
router.patch(
  "/products/:id",
  [
    validObjectId,
    auth,
    admin,
    fileupload({
      abortOnLimit: true,
      limits: { fileSize: 1024 * 1024 },
      limitHandler,
    }),
  ],
  asyncMiddleware(async (req, res) => {
    const id = req.params.id;

    const product = await Product.findById(id).select(
      "name description brand category price stockCount image"
    );
    if (!product) {
      res.status(404);
      throw new Error(`Product with id ${id} not found`);
    }
    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.brand = req.body.brand || product.brand;
    product.category = req.body.category || product.category;
    product.price = req.body.price || product.price;
    product.stockCount = req.body.stockCount || product.stockCount;
    if (req.files && req.files.image) {
      await Image.findByIdAndDelete(product.image);
      const image = new Image({
        belongsTo: product._id,
        data: req.files.image.data,
        contentType: req.files.image.mimetype,
      });
      product.image = image._id;
      await image.save();
    }

    await product.save();
    res.status(201).send(product);
  })
);
router.delete(
  "/products/:id",
  [validObjectId, auth, admin],
  asyncMiddleware(async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      res.status(404);
      throw new Error(`Product with id ${id} not found`);
    }
    await product.remove();
    await Image.deleteMany({ belongsTo: product._id });
    res.status(200).send(product);
  })
);
router.get(
  "/orders",
  [auth, admin],
  asyncMiddleware(async (req, res) => {
    const orders = await Order.find()
      .select("-orderItems -shippingAddress -tax_price")
      .populate("user", "_id name");
    res.status(200).send(orders);
  })
);

router.patch(
  "/orders/:id",
  [validObjectId, auth, admin, deleteCache],
  asyncMiddleware(async (req, res) => {
    const { error } = markOrder(req.body);
    if (error) {
      res.status(400);
      throw new Error(error.details[0].message);
    }
    const order = await Order.findById(req.params.id).select(
      "_id isDelivered isPaid paymentMethod user"
    );
    if (!order) {
      res.status(404);
      throw new Error("Oops Order not found");
    }
    const { isDelivered, isPaid } = req.body;
    if (typeof isDelivered === "boolean") {
      order.isDelivered =
        typeof isDelivered === "boolean" ? isDelivered : order.isDelivered;
      order.deliveredAt = Date.now();
    } else if (typeof isPaid === "boolean" && order.paymentMethod === "cod") {
      order.isPaid = typeof isPaid === "boolean" ? isPaid : order.isPaid;
      order.paidAt = Date.now();
    }
    req.hKey = order.user;

    await order.save();
    res.status(200).send(order);
  })
);

module.exports = router;
