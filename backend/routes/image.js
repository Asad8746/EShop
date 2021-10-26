const router = require("express").Router();
const asyncMiddleware = require("../middleware/asyncMiddleware");
const validObjectId = require("../middleware/validObjectId");
const Image = require("../models/Image");
router.get(
  "/:id",
  validObjectId,
  asyncMiddleware(async (req, res) => {
    const id = req.params.id;
    const image = await Image.findById(id);

    if (image) {
      res.header("Content-Type", image.contentType).send(image.data);
      return;
    } else {
      res
        .header("Content-Type", "image/png")
        .sendFile(process.cwd() + "/images/emptyDish.png");
    }
  })
);

module.exports = router;
