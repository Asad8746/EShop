const request = require("supertest");
const mongoose = require("mongoose");
const User = require("../../../models/User");
const OrderModel = require("../../../models/Order");
const ProductModel = require("../../../models/Product");
const ImageModel = require("../../../models/Image");

const path = require("path");

const users = new Array(2).fill(1).map((item, index) => {
  return {
    id: mongoose.Types.ObjectId(),
    name: `fake${index}`,
    email: `fake-${index}@gmail.com`,
    password: "123456",
  };
});
const products = [
  {
    name: "Airpods Wireless Bluetooth Headphones",
    user: mongoose.Types.ObjectId(),
    description:
      "Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working",
    brand: "Apple",
    image: mongoose.Types.ObjectId(),
    category: "Electronics",
    price: 89.99,
    stockCount: 10,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: "iPhone 11 Pro 256GB Memory",
    image: mongoose.Types.ObjectId(),
    user: mongoose.Types.ObjectId(),
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
const items = products.slice(0, 2).map((item) => {
  const qty = 1;
  const price = qty * item.price;
  return {
    id: mongoose.Types.ObjectId().toString(),
    name: item.name,
    qty,
    image: item.image,
    stockCount: item.stockCount,
    price,
  };
});
afterAll(async () => {
  await mongoose.connection.close();
});
describe("/admin", () => {
  let server, user, token;
  beforeEach(async () => {
    server = require("../../../");
    user = new User({
      name: "Admin",
      email: "admin@gmail.com",
      password: "123456",
      isAdmin: true,
    });
    await user.save();
    token = user.genToken();
    await User.insertMany(users);
  });
  afterEach(async () => {
    server.close();
    await User.deleteMany();
    await OrderModel.deleteMany();
    await ProductModel.deleteMany();
    await ImageModel.deleteMany();
  });
  describe("GET /users", () => {
    const exec = () => {
      return request(server)
        .get("/admin/users")
        .set("authorization", `Bearer ${token}`);
    };
    it("must return all users if requested by an Admin user", async () => {
      const response = await exec();
      expect(response.body.length).toBe(3);
    });
    it("must return all 401 if requested user is not an Admin", async () => {
      user.isAdmin = false;
      await user.save();
      token = user.genToken();
      const response = await exec();
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message");
    });
    it("must return all 401 if requested user is not logged in", async () => {
      token = "";
      const response = await exec();
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message");
    });
  });
  describe("GET /orders", () => {
    let order;
    beforeEach(async () => {
      order = new OrderModel({
        user: user._id,
        orderItems: items,
        shippingAddress: "HNO 123 Market NY America",
        paymentMethod: "cod",
        tax_price: 20,
        delivery_price: 100,
        total_price: 10,
      });
      await order.save();
    });
    const exec = () => {
      return request(server)
        .get("/admin/orders")
        .set("authorization", `Bearer ${token}`);
    };
    it("must return all orders if requested by an Admin user", async () => {
      const response = await exec();
      expect(response.body.length).toBe(1);
      expect(response.body[0]._id).toBe(order.id.toString());
    });
    it("must return 401 if requested user is not an Admin", async () => {
      user.isAdmin = false;
      await user.save();
      token = user.genToken();
      const response = await exec();
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message");
    });
    it("must return 401 if requested user is not logged in", async () => {
      token = "";
      const response = await exec();
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message");
    });
  });
  describe("GET /products", () => {
    beforeEach(async () => {
      await ProductModel.insertMany(products);
    });
    const exec = () => {
      return request(server)
        .get("/admin/products")
        .set("authorization", `Bearer ${token}`);
    };
    it("must return all products if requested by an Admin user", async () => {
      const response = await exec();
      expect(response.body.length).toBe(2);
    });
    it("must return 401 if requested user is not an Admin", async () => {
      user.isAdmin = false;
      await user.save();
      token = user.genToken();
      const response = await exec();
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message");
    });
    it("must return 401 if requested user is not logged in", async () => {
      token = "";
      const response = await exec();
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message");
    });
  });
  describe("POST /products", () => {
    let imageFilePath, requestBody, product_id;
    beforeEach(async () => {
      requestBody = {
        description: "New Product Description",
        brand: "NewProduct",
        category: "AHan love it",
        price: 30,
        name: "MacBook Laptop",
        stockCount: 20,
      };
      imageFilePath = path.join(__dirname, "/image.jpg");
    });
    const exec = () => {
      return request(server)
        .post("/admin/products")
        .set("authorization", `Bearer ${token}`)
        .set("Content-Type", "multipart/form-data")
        .field("name", requestBody.name)
        .field("stockCount", requestBody.stockCount)
        .field("description", requestBody.description)
        .field("category", requestBody.category)
        .field("price", requestBody.price)
        .field("brand", requestBody.brand)
        .attach("image", imageFilePath);
    };
    it("must create New Product if user is an Admin", async () => {
      const response = await exec();
      const product = await ProductModel.findById(response.body._id);
      const image = await ImageModel.findById(response.body.image).select(
        "_id"
      );
      expect(product).not.toBeNull();
      expect(image).not.toBeNull();
    });
    it("must return if validation fails", async () => {
      requestBody.name = "";
      const response = await exec();
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message");
    });
    it("must abort request if image size is more than 1mb", async () => {
      imageFilePath = path.join(__dirname, "/max.jpg");
      const response = await exec();
      expect(response.status).toBe(413);
      expect(response.body).toHaveProperty("message");
    });
    it("must return 400 if image is not of type [jpg,png,jpeg]", async () => {
      imageFilePath = path.join(__dirname, "/check.txt");
      const response = await exec();
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message");
    });
    it("must return 401 if requested user is not an Admin", async () => {
      user.isAdmin = false;
      await user.save();
      token = user.genToken();
      const response = await exec();
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message");
    });
    it("must return 401 if requested user is not logged in", async () => {
      token = "";
      const response = await exec();
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message");
    });
  });
  describe("PATCH /users/:id", () => {
    let updatedUser, requestBody;
    beforeEach(async () => {
      requestBody = { isAdmin: true };
      updatedUser = new User({
        name: "future_admin",
        email: "future_admin@gmail.com",
        password: "123456",
      });
      await updatedUser.save();
    });
    const exec = () => {
      return request(server)
        .patch(`/admin/users/${updatedUser.id}`)
        .set("authorization", `Bearer ${token}`)
        .send(requestBody);
    };
    it("must Update User Authorization Level to Admin if updated by an Admin user", async () => {
      const response = await exec();
      expect(response.body._id).toBe(updatedUser.id.toString());
      expect(response.body.isAdmin).toBe(true);
    });
    it("must return 400 if isAdmin is not specified in request body", async () => {
      delete requestBody.isAdmin;
      const response = await exec();
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message");
    });
    it("must return 404 if specified id User not found", async () => {
      updatedUser._id = mongoose.Types.ObjectId();
      const response = await exec();
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message");
    });
    it("must return 401 if requested user is not an Admin", async () => {
      user.isAdmin = false;
      await user.save();
      token = user.genToken();
      const response = await exec();
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message");
    });
    it("must return 401 if requested user is not logged in", async () => {
      token = "";
      const response = await exec();
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message");
    });
  });
  describe("PATCH /orders/:id", () => {
    let order, requestBody, order_id;
    beforeEach(async () => {
      requestBody = { isPaid: true };
      order = new OrderModel({
        user: user._id,
        orderItems: items,
        shippingAddress: "HNO 123 Market NY America",
        paymentMethod: "cod",
        tax_price: 20,
        delivery_price: 100,
        total_price: 10,
      });
      order_id = order.id;
      await order.save();
    });
    const exec = () => {
      return request(server)
        .patch(`/admin/orders/${order_id}`)
        .set("authorization", `Bearer ${token}`)
        .send(requestBody);
    };
    it("must Update Order Paid Status if user is an Admin", async () => {
      const response = await exec();
      expect(response.body.isPaid).toBe(requestBody.isPaid);
    });
    it("must Update Order Delivered Status if user is an Admin", async () => {
      delete requestBody.isPaid;
      requestBody["isDelivered"] = true;
      const response = await exec();
      expect(response.body.isDelivered).toBe(requestBody.isDelivered);
    });
    it("must return 400 if both of them are defined", async () => {
      requestBody = { isPaid: true, isDelivered: true };
      const response = await exec();
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message");
    });
    it("must return 404 if specified id order not found", async () => {
      order_id = mongoose.Types.ObjectId();
      const response = await exec();
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message");
    });
    it("must return 401 if requested user is not an Admin", async () => {
      user.isAdmin = false;
      await user.save();
      token = user.genToken();
      const response = await exec();
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message");
    });
    it("must return 401 if requested user is not logged in", async () => {
      token = "";
      const response = await exec();
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message");
    });
  });
  describe("PATCH /products/:id", () => {
    let product, imageFilePath, requestBody, product_id;
    beforeEach(async () => {
      requestBody = {
        name: "MacBook Laptop",
        stockCount: 20,
      };
      imageFilePath = path.join(__dirname, "/image.jpg");
      product = new ProductModel({
        ...products[0],
        image: mongoose.Types.ObjectId(),
      });
      product_id = product.id;
      await product.save();
    });
    const exec = () => {
      return request(server)
        .patch(`/admin/products/${product_id}`)
        .set("authorization", `Bearer ${token}`)
        .set("Content-Type", "multipart/form-data")
        .field("name", requestBody.name)
        .field("stockCount", requestBody.stockCount)
        .attach("image", imageFilePath);
    };
    it("must Update Product Properties(name,description,stockCount,Image) if user is an Admin", async () => {
      const response = await exec();
      const updatedProduct = await ProductModel.findById(product.id);
      expect(response.body._id).toBe(product.id.toString());
      expect(response.body.name).toBe(updatedProduct.name);
      expect(response.body.stockCount).toBe(updatedProduct.stockCount);
      const image = await ImageModel.findById(response.body.image).select(
        "_id"
      );
      expect(image.id.toString()).toBe(updatedProduct.image.toString());
    });
    it("must abort request if image size is more than 1mb", async () => {
      imageFilePath = path.join(__dirname, "/max.jpg");
      const response = await exec();
      expect(response.status).toBe(413);
      expect(response.body).toHaveProperty("message");
    });
    it("must return 404 if specified id product not found", async () => {
      product_id = mongoose.Types.ObjectId();
      const response = await exec();
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message");
    });
    it("must return 401 if requested user is not an Admin", async () => {
      user.isAdmin = false;
      await user.save();
      token = user.genToken();
      const response = await exec();
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message");
    });
    it("must return 401 if requested user is not logged in", async () => {
      token = "";
      const response = await exec();
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message");
    });
  });
  describe("DELETE /users/:id", () => {
    let user, user_id;
    beforeEach(async () => {
      user = new User({
        name: "future_admin",
        email: "future_admin@gmail.com",
        password: "123456",
      });
      user_id = user.id;
      await user.save();
    });
    const exec = () => {
      return request(server)
        .delete(`/admin/users/${user_id}`)
        .set("authorization", `Bearer ${token}`);
    };
    it("must Delete User if requested by an Admin user", async () => {
      await exec();
      const check = await User.findById(user.id).select("_id");
      expect(check).toBeNull();
    });
    it("must return 400 if id is not valid", async () => {
      user_id = "1";
      const response = await exec();
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message");
    });
    it("must return 404 if user not found", async () => {
      user_id = mongoose.Types.ObjectId();
      const response = await exec();
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message");
    });
    it("must return 401 if requested user is not an Admin", async () => {
      user.isAdmin = false;
      await user.save();
      token = user.genToken();
      const response = await exec();
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message");
    });
    it("must return 401 if requested user is not logged in", async () => {
      token = "";
      const response = await exec();
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message");
    });
  });

  describe("PATCH /products/:id", () => {
    let product, product_id;
    beforeEach(async () => {
      product = new ProductModel({
        ...products[0],
      });
      product_id = product.id;
      await product.save();
    });
    const exec = () => {
      return request(server)
        .delete(`/admin/products/${product_id}`)
        .set("authorization", `Bearer ${token}`);
    };
    it("must Delete Product  if user is an Admin", async () => {
      const response = await exec();
      const check = await ProductModel.findById(product.id).select("_id");
      expect(check).toBeNull();
    });
    it("must return 404 if specified id product not found", async () => {
      product_id = mongoose.Types.ObjectId();
      const response = await exec();
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message");
    });
    it("must return 401 if requested user is not an Admin", async () => {
      user.isAdmin = false;
      await user.save();
      token = user.genToken();
      const response = await exec();
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message");
    });
    it("must return 401 if requested user is not logged in", async () => {
      token = "";
      const response = await exec();
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message");
    });
  });
});
