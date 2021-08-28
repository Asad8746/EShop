const router = require("express").Router();
const config = require("config");

router.get("/paypal", (req, res) => {
  res.status(200).send(config.get("paypalId"));
});

module.exports = router;
