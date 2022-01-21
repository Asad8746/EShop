const authMiddleware = require("../../../middleware/authMiddleware");
const User = require("../../../models/User");
describe("AuthMiddleware", () => {
  let request;
  let response;
  const next = jest.fn();
  let user;
  let token;
  beforeEach(() => {
    user = User();
    token = user.genToken();
    request = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    response = {
      status: jest.fn(),
    };
  });

  it("must populate request with user id if token is valid", () => {
    request.headers["authorization"] = `Bearer ${token}`;
    authMiddleware(request, response, next);
    expect(request.user).toBe(user._id.toString());
    expect(next).toHaveBeenCalled();
  });
  it("must call status function with 401 if user token is not valid", () => {
    request.headers["authorization"] = "";
    expect(() => authMiddleware(request, response, next)).toThrow();
    expect(response.status).toHaveBeenCalledWith(401);
  });
});
