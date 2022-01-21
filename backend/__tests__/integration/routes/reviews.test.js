const mongoose = require("mongoose");
const request = require("supertest");
const Product = require("../../../models/Product");
const User = require("../../../models/User");
let server;

describe("reviews", () => {
  let review, product;
  afterAll(async () => {
    await mongoose.connection.close();
  });
  beforeEach(() => {
    server = require("../../../");
  });
  beforeEach(async () => {
    review = {
      rating: 4,
      comment: "comment",
    };
    product = new Product({
      user: mongoose.Types.ObjectId(),
      name: "Airpods Wireless Bluetooth Headphones",
      description:
        "Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working",
      brand: "Apple",
      image: mongoose.Types.ObjectId(),
      category: "Electronics",
      price: 89.99,
      stockCount: 10,
      rating: 4.5,
      numReviews: 1,
    });
    await product.save();
  });
  afterEach(async () => {
    server.close();
    await Product.deleteMany();
  });
  describe("GET /:id/reviews", () => {
    let product_id;
    beforeEach(() => {
      product_id = product.id;
    });
    const exec = () => {
      return request(server).get(`/products/${product_id}/reviews`);
    };
    it("must return 401 if product id is not valid", async () => {
      product_id = "1";
      const response = await exec();
      expect(response.status).toBe(400);
      expect(response.body.message).toContain("Invalid");
    });
    it("must return 404 if no product is found", async () => {
      product_id = mongoose.Types.ObjectId();
      const response = await exec();
      expect(response.status).toBe(404);
      expect(response.body.message).toContain(product_id.toString());
    });
    it("must return All Product reviews", async () => {
      review.user = mongoose.Types.ObjectId();
      product.reviews.push(review);
      await product.save();
      const response = await exec();
      expect(response.body.reviews[0]).toHaveProperty("_id");
      expect(response.body.reviews[0]).toHaveProperty("rating");
    });
  });

  describe("POST /:id/rate", () => {
    let user, token, product_id;
    const exec = () => {
      return request(server)
        .post(`/products/${product_id}/rate`)
        .set("authorization", `Bearer ${token}`)
        .send(review);
    };
    beforeEach(() => {
      user = new User();
      token = user.genToken();
      product_id = product.id;
    });
    it("Must return 200 with saved review if user is logged in ", async () => {
      const response = await exec();
      expect(response.body).toHaveProperty("comment", "comment");
      expect(response.body).toHaveProperty("rating", 4);
    });
    it("must return 400 if user already rated product", async () => {
      product.reviews.push({
        ...review,
        user: user.id,
      });
      await product.save();
      const response = await exec();
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message");
    });
    it("must return 400 if review does not validate our validator", async () => {
      delete review.rating;
      const response = await exec();
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message");
    });
    it("must return 404 if product with specified id  not found", async () => {
      product_id = mongoose.Types.ObjectId();
      const response = await exec();
      expect(response.status).toBe(404);
      expect(response.body.message).toContain(product_id.toString());
    });
    it("must return 400 if product id is inValid", async () => {
      product_id = "1";
      const response = await exec();
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty;
    });
  });
});
