const express = require("express");
const bcrypt = require("bcryptjs");
const UserModel = require("../models/User");
const {
  validateLoginBody,
  validateRegisterBody,
} = require("../validation/user");
const asyncMiddleware = require("../middleware/asyncMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post(
  "/login",
  asyncMiddleware(async (req, res) => {
    const { value, error } = validateLoginBody(req.body);
    if (error) {
      res.status(403);
      throw new Error(error.details[0].message);
    }
    const { email, password } = value;
    const user = await UserModel.findOne({ email: email });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.header("authorization", user.genToken()).status(201).send({
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  })
);

router.post(
  "/register",
  asyncMiddleware(async (req, res) => {
    const { value, error } = validateRegisterBody(req.body);

    if (error) {
      res.status(403);
      throw new Error(error.details[0].message);
    }
    const { name, email, password } = value;

    let user = await UserModel.findOne({ email });
    if (user) {
      res.status(400);
      throw new Error("Email is already taken");
    }
    user = new UserModel({
      name,
      email,
      password: await bcrypt.hash(password, await bcrypt.genSalt(10)),
    });
    await user.save();
    res.header("authorization", user.genToken()).status(201).send({
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  })
);

router.get("/", authMiddleware, (req, res) => {
  res.status(200).send(req.user);
});

module.exports = router;
