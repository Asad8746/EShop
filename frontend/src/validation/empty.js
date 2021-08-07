export const emptyValidator = (value, message) => {
  if (value.trim().length === 0) {
    return {
      valid: false,
      error: message ? message : "Field is not suppose to be empty",
    };
  }
  return { valid: true, error: "" };
};
