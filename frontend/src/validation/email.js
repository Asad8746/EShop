export const emailValidator = function (value = "") {
  const emailRegex = /\S+@\S+\.\S+/;
  if (value.trim().length === 0) {
    return { valid: false, error: "Email is not Suppose to Empty" };
  } else {
    return emailRegex.test(value)
      ? { valid: true, error: "" }
      : { valid: false, error: "Invalid Email" };
  }
};
