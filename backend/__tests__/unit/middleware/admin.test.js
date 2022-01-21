const admin = require("../../../middleware/adminMiddleware");
describe("Admin middleware", () => {
  let request;
  let response;
  const next = jest.fn();
  beforeEach(() => {
    request = { isAdmin: true };
    response = { status: jest.fn() };
  });
  it("Must call next middleware if an User is an Admin", () => {
    admin(request, response, next);
    expect(next).toHaveBeenCalled();
  });
  it("Must return 401 if an User is not an Admin", () => {
    request.isAdmin = false;
    expect(() => admin(request, response, next)).toThrow();
    expect(response.status).toHaveBeenCalledWith(401);
  });
});
