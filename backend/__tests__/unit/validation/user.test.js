const {
  validateLoginBody,
  validateRegisterBody,
} = require("../../../validation/user");

describe("ValidateLoginBody", () => {
  let user;
  beforeEach(() => {
    user = {
      email: "1@gmail.com",
      password: "12345",
    };
  });

  it("must return error object with message if name is an empty string", () => {
    user.email = "";
    const { error } = validateLoginBody(user);
    expect(error.details[0].message).toBeDefined();
  });
  it("must return error object with message if email is an empty string", () => {
    user.email = "";
    const { error } = validateLoginBody(user);
    expect(error.details[0].message).toBeDefined();
  });
  it("must return error object with message if email is not a valid  email", () => {
    user.email = "1.com";
    const { error } = validateLoginBody(user);
    expect(error.details[0].message).toBeDefined();
  });
  it("must return error object with message if password is an empty string", () => {
    user.password = "";
    const { error } = validateLoginBody(user);
    expect(error.details[0].message).toBeDefined();
  });
  it("must return error object with message if password has length more than 255", () => {
    user.password = new Array(256).fill(1).join("");
    const { error } = validateLoginBody(user);
    expect(error.details[0].message).toBeDefined();
  });
});
describe("ValidateRegisterBody", () => {
  let user;
  beforeEach(() => {
    user = {
      name: "Asad khan",
      email: "1@gmail.com",
      password: "12345",
    };
  });
  it("must return error object with message if name is an empty string", () => {
    user.name = "";
    const { error } = validateLoginBody(user);
    expect(error.details[0].message).toBeDefined();
  });
  it("must return error object with message if name has length less than 2", () => {
    user.name = "1";
    const { error } = validateLoginBody(user);
    expect(error.details[0].message).toBeDefined();
  });
  it("must return error object with message if name has length more than 255", () => {
    user.name = new Array(256).fill(1).join("");

    const { error } = validateLoginBody(user);
    expect(error.details[0].message).toBeDefined();
  });
  it("must return error object with message if email is an empty string", () => {
    user.email = "";
    const { error } = validateLoginBody(user);
    expect(error.details[0].message).toBeDefined();
  });
  it("must return error object with message if email is not a valid  email", () => {
    user.email = "1.com";
    const { error } = validateLoginBody(user);
    expect(error.details[0].message).toBeDefined();
  });
  it("must return error object with message if password is an empty string", () => {
    user.password = "";
    const { error } = validateLoginBody(user);
    expect(error.details[0].message).toBeDefined();
  });
  it("must return error object with message if password has length more than 255", () => {
    user.password = new Array(256).fill(1).join("");
    const { error } = validateLoginBody(user);
    expect(error.details[0].message).toBeDefined();
  });
});
