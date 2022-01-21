const request = require("supertest");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../../../models/User");

let server;

afterAll(async () => {
  await mongoose.connection.close();
});
describe("/user", () => {
  beforeEach(() => {
    server = require("../../../index");
  });
  afterEach(async () => {
    server.close();
    await User.deleteMany();
  });
  describe("GET /me", () => {
    let token;
    const exec = () => {
      return request(server)
        .get("/user/me")
        .set("authorization", `Bearer ${token}`);
    };
    it("must return 401 if no authorization token is set", async () => {
      const response = await exec();
      expect(response.status).toBe(401);
    });
    it("must return 404 if authorization token is set but user not found", async () => {
      const user = new User();
      token = user.genToken();
      const response = await exec();
      expect(response.status).toBe(404);
    });
    it("must return user with 200 status code", async () => {
      const user = new User({
        name: "Asad khan",
        email: "1@gmail.com",
        password: await bcrypt.hash("12345", await bcrypt.genSalt(10)),
      });
      await user.save();
      token = user.genToken();
      const response = await exec();
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("name");
      expect(response.body).toHaveProperty("email");
      expect(response.body).toHaveProperty("isAdmin");
      expect(response.body.id).toBe(user._id.toString());
    });
  });
  describe("POST /register", () => {
    let fakeUser;
    beforeEach(() => {
      fakeUser = {
        name: "Asad khan",
        email: "1@gmail.com",
        password: "12345",
      };
    });
    const exec = () => {
      return request(server).post("/user/register").send(fakeUser);
    };
    it("must return 403 if name is not provided in the request body", async () => {
      fakeUser = {
        email: "1@gmail.com",
        password: "12345",
      };
      const response = await exec();

      expect(response.status).toBe(403);
      expect(response.body.message).toBe('"name" is required');
    });
    it("must return 400 if a user with given email is already registered", async () => {
      await new User(fakeUser).save();
      const response = await exec();
      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Email Already Registered");
    });
    it("must return 201 and register a new user if user is valid", async () => {
      const response = await exec();
      const user = await User.findOne({ email: fakeUser.email });
      expect(response.status).toBe(201);
      expect(response.body.id).toBe(user._id.toString());
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("email");
      expect(response.body).toHaveProperty("name");
      expect(response.body).toHaveProperty("isAdmin");
      expect(response.headers["authorization"]).not.toBeNull();
    });
  });
  describe("POST /login", () => {
    let fakeUser;
    beforeEach(() => {
      fakeUser = {
        email: "1@gmail.com",
        password: "123456",
      };
    });
    const exec = () => {
      return request(server).post("/user/login").send(fakeUser);
    };
    it("must return 403 if email is not provided in the request body", async () => {
      delete fakeUser.email;
      const response = await exec();
      expect(response.status).toBe(403);
      expect(response.body.message).toBe('"email" is required');
    });
    it("must return 401 if user with email is not found", async () => {
      const response = await exec();
      expect(response.status).toBe(401);
      expect(response.body.message.toLowerCase()).toBe(
        "invalid email or password"
      );
    });
    it("must return 401 if password is incorrect", async () => {
      const user = new User({
        name: "Asad khan",
        password: await bcrypt.hash("123456", await bcrypt.genSalt(10)),
        email: "1@gmail.com",
      });
      await user.save();
      fakeUser = {
        email: "1@gmail.com",
        password: "4567",
      };
      const response = await exec();
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message");
    });
    it("must return 200 if both email and password are correct", async () => {
      const user = new User({
        name: "Asad khan",
        password: await bcrypt.hash("123456", await bcrypt.genSalt(10)),
        email: "1@gmail.com",
      });
      await user.save();
      const response = await exec();
      expect(response.status).toBe(200);
      expect(response.headers["authorization"]).not.toBeNull();
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("email");
      expect(response.body).toHaveProperty("name");
      expect(response.body).toHaveProperty("isAdmin");
    });
  });
  describe("PATCH /me", () => {
    let user, token, user_body;
    const exec = () => {
      return request(server)
        .patch("/user/me")
        .set("authorization", `Bearer ${token}`)
        .send(user_body);
    };
    beforeEach(async () => {
      user = new User({
        name: "fake",
        email: "fake@gmail.com",
        password: await bcrypt.hash("fake.1", await bcrypt.genSalt(10)),
      });
      user_body = {
        name: "updated_fake",
        password: "123456",
      };
      token = user.genToken();
      await user.save();
    });

    it("must update user Profile if user logged in", async () => {
      const response = await exec();
      user = await User.findById(user.id);
      expect(response.body).toHaveProperty("name", user_body.name);
      const verify = await bcrypt.compare(user_body.password, user.password);
      expect(verify).toBe(true);
    });
    it("must update user name if user name is given in body", async () => {
      delete user_body.password;
      const response = await exec();
      expect(response.body).toHaveProperty("name", user_body.name);
    });
    it("must update user password if user password is given in body", async () => {
      delete user_body.name;
      await exec();
      user = await User.findById(user.id);
      const verify = await bcrypt.compare(user_body.password, user.password);
      expect(verify).toBe(true);
    });
    it("must return 404 User Profile not found", async () => {
      user = new User();
      token = user.genToken();
      const response = await exec();
      expect(response.status).toBe(404);
    });
  });
});
