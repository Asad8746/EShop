const request = require("supertest");
let server;

describe("Auth Middleware", () => {
  beforeEach(() => {
    server = require("../../../index");
  });
  afterEach((done) => {
    server.close(() => {
      done();
    });
  });
  it("must return 401 if token is not defined", async () => {
    const response = await request(server).get("/orders/");
    expect(response.status).toBe(401);
  });
});
