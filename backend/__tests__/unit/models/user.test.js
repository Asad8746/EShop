const User = require("../../../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");
describe("User.genToken", () => {
  it("Must return a valid jwt token", () => {
    const user = new User();
    const token = user.genToken();
    const decoded = jwt.verify(token, config.get("secretKey"));
    expect(decoded.id).toBe(user._id.toString());
  });
});
