const mongoose = require("mongoose");
const request = require("supertest");
const UserModel = require("../../models/User");
const OrderModel = require("../../models/Order");
const fakeProducts = require("../../products");
const fixedTo2 = require("../../utils/fixedTo2");
afterAll(async () => {
  await mongoose.connection.close();
});
const items = fakeProducts.slice(0, 2).map((item) => {
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
describe("/orders", () => {
  let server;

  beforeEach(() => {
    server = require("../../index");
  });

  afterEach((done) => {
    server.close(() => {
      done();
    });
  });

  afterEach(async () => {
    await UserModel.deleteMany();
    await OrderModel.deleteMany();
  });

  describe("GET", () => {
    let user, token, order;
    const exec = (route) => {
      return request(server).get(route).set("authorization", `Bearer ${token}`);
    };
    beforeEach(async () => {
      user = new UserModel({
        name: "Asad khan",
        email: "asad@gmail.com",
        password: "123456",
      });

      token = user.genToken();
      await user.save();
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
    describe("/", () => {
      it("must return 401 (UnAuthorized) if user is not logged in", async () => {
        token = "";
        const response = await exec("/orders/");
        expect(response.status).toBe(401);
      });
      it("Must return 200 with user orders if user is a valid user", async () => {
        const response = await exec("/orders/");
        expect(response.body.length).toBe(1);
        expect(response.body[0]).toHaveProperty("paymentMethod");
        expect(response.body[0]).toHaveProperty("total_price");
        expect(response.body[0]).toHaveProperty("isPaid");
        expect(response.body[0]).toHaveProperty("isDelivered");
        expect(response.body[0]).toHaveProperty("_id");
        expect(response.body[0]).toHaveProperty("createdAt");
      });
    });
    describe("/:id", () => {
      it("must return 401 (UnAuthorized) if user is not logged in", async () => {
        token = "";
        const response = await exec(`/orders/${order._id}`);
        expect(response.status).toBe(401);
      });
      it("Must return 200 with specified id order  if user is logged in", async () => {
        const response = await exec(`/orders/${order._id}`);
        expect(response.body._id).toBe(order._id.toString());
      });
    });
  });
  describe("POST", () => {
    let user, token, order;
    const exec = () => {
      return request(server)
        .post("/orders/")
        .set("authorization", `Bearer ${token}`)
        .send(order);
    };
    beforeEach(async () => {
      order = {
        items,
        address: {
          address: "HNO 123 Earth",
          city: "Humanistan",
          postalCode: "12345",
          country: "Earth",
        },
        paymentMethod: "cod",
      };
      user = new UserModel({
        name: "Asad khan",
        password: "12345",
        email: "khan@gmail.com",
      });
      token = user.genToken();
      await user.save();
    });

    describe("/", () => {
      it("must return 401 if user is not logged in ", async () => {
        token = "";
        const response = await exec();
        expect(response.status).toBe(401);
      });
      it("must return 400 if an new order has 0 items", async () => {
        order.items = [];
        const response = await exec();
        expect(response.status).toBe(400);
        expect(response.body.message).toBeDefined();
      });
      it("must return 400 if an new order has no address defined", async () => {
        order.address = {};
        const response = await exec();
        expect(response.status).toBe(400);
        expect(response.body.message).toBeDefined();
      });
      it("must return 400 if an new order has no payment Method defined", async () => {
        order.paymentMethod = "";
        const response = await exec();
        expect(response.status).toBe(400);
        expect(response.body.message).toBeDefined();
      });
      it("must return 400 if an new order has payment Method defined but other than cod or paypal", async () => {
        order.paymentMethod = "Some other Gateway";
        const response = await exec();
        expect(response.status).toBe(400);
        expect(response.body.message).toBeDefined();
      });
      it("must return 201 and creates an Order", async () => {
        const response = await exec();
        const expectedItemsTotal = items.reduce(
          (prevRes, item) => item.qty * item.price + prevRes,
          0
        );
        const expectedTax = Number(fixedTo2(expectedItemsTotal * 0.1));
        const expectedShippingPrice = Number(
          fixedTo2(expectedItemsTotal >= 200 ? 0 : 100)
        );
        const expectedTotal = Number(
          fixedTo2(expectedItemsTotal + expectedTax + expectedShippingPrice)
        );
        expect(response.status).toBe(201);
        expect(response.body.user).toBe(user._id.toString());
        expect(response.body.total_price).toBe(expectedTotal);
        expect(response.body.delivery_price).toBe(expectedShippingPrice);
        expect(response.body.tax_price).toBe(expectedTax);
      });
    });
  });
});
