const authMiddleware = require("../../../middleware/authMiddleware");
const User = require("../../../models/User");
describe("AuthMiddleware", () => {
  it("must populate request with user id if token is valid", () => {
    const user = new User();
    const token = user.genToken();
    const req = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const res = {};
    const next = jest.fn();
    authMiddleware(req, res, next);
    expect(req.user).toBe(user._id.toString());
  });
});
