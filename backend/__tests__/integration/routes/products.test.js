const request = require("supertest");
const User = require("../../../models/User");
const Product = require("../../../models/Product");
const mongoose = require("mongoose");
let server;

const products = [
  {
    name: "Airpods Wireless Bluetooth Headphones",
    image: "/images/airpods.jpg",
    description:
      "Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working",
    brand: "Apple",
    category: "Electronics",
    price: 89.99,
    stockCount: 10,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: "iPhone 11 Pro 256GB Memory",
    image: "/images/phone.jpg",
    description:
      "Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life",
    brand: "Apple",
    category: "Electronics",
    price: 599.99,
    stockCount: 7,
    rating: 4.0,
    numReviews: 8,
  },
];
afterAll(async () => {
  await mongoose.connection.close();
});

describe("/products", () => {
  let user;
  const insertProducts = async () => {
    user = new User();
    await Product.insertMany(
      products.map((item) => {
        return { ...item, user: user._id };
      })
    );
  };
  beforeEach(async () => {
    server = require("../../../index");
  });
  afterEach((done) => {
    Product.deleteMany().then(() => {
      server.close(() => {
        done();
      });
    });
  });
  describe("GET /", () => {
    it("must fetch products from database", async () => {
      await insertProducts();
      const response = await request(server).get("/products/");
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);
    });
  });
  describe("GET /:id", () => {
    it("must return 400 status code if id is not valid", async () => {
      const response = await request(server).get("/products/1");
      expect(response.status).toBe(400);
    });
    it("must return 404 if a product with given id is not found", async () => {
      const product = new Product();
      const response = await request(server).get(`/products/${product._id}`);
      expect(response.status).toBe(404);
    });
    it("must fetch product if id is valid", async () => {
      await insertProducts();
      const product = await Product.findOne({ user: user._id });
      const response = await request(server).get(`/products/${product._id}`);
      expect(response.status).toBe(200);
      expect(response.body.user).toBe(user._id.toString());
    });
  });
});
