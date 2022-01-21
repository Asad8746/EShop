module.exports = (req, res, next) => {
  if (req.files && req.files.image) {
    const mimeType = req.files.image.mimetype.split("/");
    const exts = ["png", "jpg", "jpeg"];
    if (
      mimeType[0].toLowerCase() === "image" &&
      exts.includes(mimeType[1].toLowerCase())
    ) {
      req.image = req.files.image;
      next();
      return;
    }
  }
  res.status(400);
  throw new Error("Please upload a valid image");
};
